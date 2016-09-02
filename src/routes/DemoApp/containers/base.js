import React, { Component } from 'react'
import MainNav from 'SRC/components/header/main-nav/MainNav'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CSSModules from 'react-css-modules'
import styles from './base.css'
import * as BaseAction from './baseAction'


const menuItems = [
  { key: 'ask', name: '请假申请', link: '/ask' },
  { key: 'page2', name: 'page2', link: '/page2' },
  { key: 'page3', name: 'page3', link: '/page3' },
  { key: 'page4', name: 'page4', link: '/page4' }
]

class Base extends Component {
  constructor(props) {
    super(props)
    this.setVisible = this.setVisible.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.clearModal = this.clearModal.bind(this)
    this.goToAsk = this.goToAsk.bind(this)
  }
  componentDidMount() {
    if (this.props.state.home) {
      this.goToAsk()
      this.context.router.push({
        pathname: '/ask'
      })
    }
  }
  setVisible() {
    this.props.actions.setVisible()
  }
  goToAsk() {
    this.props.actions.goToAsk()
  }
  login(userName, password) {
    if (userName.length !== 0 && password.length !== 0) {
      this.props.actions.login(userName, password)
    } else {
      this.props.actions.setVisible()
    }
  }
  logout() {
    this.props.actions.logout()
  }
  clearModal() {
    this.props.actions.clearModal()
  }
  render() {
    const mainMenu = this.props.location.pathname.split('/')[1] || 'ask'
    const height = this.props.params.reportType === 'diamond' ? 0 : 5.3
    const isShowLogin = this.props.state.isShowLogin
    const isLogining = this.props.state.isLogining
    const msg = this.props.state.msg
    const success = this.props.state.success
    const error = this.props.state.error
    const footer = 2
    return (
      <div className="container" style={{ height: `${window.innerHeight}px` }}>
        <div
          className="header"
          >
          <MainNav
            selectedKeys={[mainMenu]}
            menuItems={menuItems}
            setVisible={this.setVisible}
            isShowLogin={isShowLogin}
            isLogining={isLogining}
            login={this.login}
            logout={this.logout}
            clearModal={this.clearModal}
            success={success}
            error={error}
            msg={msg}
            />
        </div>

        <div className="body">
          {
            // this.props.children
          }
          abckd
        </div>
        <span className="footer">
          Powered by <a href="https://github.com/AllanJian" target="_blank">AllanJian</a>.
        </span>
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
