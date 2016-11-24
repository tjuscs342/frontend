import React, { Component } from 'react'
import MainNav from 'SRC/components/header/main-nav/MainNav'
import LeftMenu from 'SRC/components/menu/leftMenu.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CSSModules from 'react-css-modules'
import styles from './base.css'
import * as BaseAction from './baseAction'
import classnames from 'classnames'

class Base extends Component {
  constructor(props) {
    super(props)
    this.setVisible = this.setVisible.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.clearModal = this.clearModal.bind(this)
    this.goToAsk = this.goToAsk.bind(this)
    this.setMenuShow = this.setMenuShow.bind(this)
    this.getChildContext()
  }
  getInitialState() {
    return {
      current: '1'
    }
  }
  getChildContext() {
    return {
      userName: this.props.state.userName,
      bossName: this.props.state.bossName
    }
  }
  // 登陆框显示/隐藏
  setVisible() {
    this.props.actions.setVisible()
  }
  // 左边菜单显示/隐藏
  setMenuShow(value) {
    this.props.actions.setMenuShow(value)
  }
  // 首页跳转到请假页面
  goToAsk() {
    this.props.actions.goToAsk()
  }
  // 登陆
  login(userName, password) {
    this.props.actions.login(userName, password)
  }
  // 登出
  logout() {
    this.props.actions.logout()
  }
  // 清空对话框状态
  clearModal() {
    this.props.actions.clearModal()
  }
  render() {
    const mainMenu = this.props.location.pathname.split('/')[1] || ''
    const isShowLogin = this.props.state.isShowLogin
    const isLogining = this.props.state.isLogining
    const msg = this.props.state.msg
    const success = this.props.state.success
    const error = this.props.state.error

    return (
      <div style={{ height: `${window.innerHeight}px`, overflow: 'hidden', backgroundColor: '#fefefe' }}>
        <div
          style={{
            display: 'inline-flex',
            height: '100%',
            position: 'relative'
          }}
          className={
            classnames({
              'menu-show': this.props.state.isMenuShow,
              'menu-hide': !this.props.state.isMenuShow
            })
          }
          >
          <div style={{ width: `${window.innerWidth * 0.7}px`, height: '100%', display: 'inline-block', backgroundColor: '#666' }}>
            <LeftMenu
              config=""
              logout={this.logout}
              setMenuShow={this.setMenuShow}
              />
          </div>
          <div style={{ display: 'inline-block', width: `${window.innerWidth}px`, height: '100%' }}>
            <div
              className="header"
              >
              <MainNav
                selectedKeys={[mainMenu]}
                setVisible={this.setVisible}
                isShowLogin={isShowLogin}
                isLogining={isLogining}
                login={this.login}
                logout={this.logout}
                clearModal={this.clearModal}
                success={success}
                error={error}
                msg={msg}
                setMenuShow={this.setMenuShow}
                userName={this.props.state.userName}
                />
            </div>
            <div className="body" onClick={() => this.setMenuShow(false)}>
              {
                this.props.children
              }
            </div>
            <div className="footer">
              <div className="divCenterMiddle">Powered by <a href="https://github.com/tjuscs342" target="_blank">tjuscs342</a>.</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Base.propTypes = {
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string
  }),
  params: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]),
  actions: React.PropTypes.object,
  state: React.PropTypes.object
}
Base.contextTypes = {
  router: React.PropTypes.object
}
Base.childContextTypes = {
  userName: React.PropTypes.string,
  bossName: React.PropTypes.string
}

function mapState(state) {
  return {
    state: state.base.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(BaseAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(CSSModules(Base, styles))
