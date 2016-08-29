import React, { Component } from 'react'
import MainNav from 'SRC/components/header/main-nav/MainNav'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CSSModules from 'react-css-modules'
import styles from './base.css'
import * as BaseAction from './baseAction'


const menuItems = [
  { key: 'home', name: '首页', link: '/home' },
  { key: 'user-profile', name: '用户画像', link: '/user-profile/user-set/extract/scenario' },
  { key: 'push-promotion', name: 'PUSH推广', link: '/push-promotion/user-set/extract/scenario' },
  { key: 'my-data-set', name: '我的用户集', link: '/my-data-set/user-profile' }
]

class Base extends Component {
  constructor(props) {
    super(props)
    this.setMsgBoard = this.setMsgBoard.bind(this)
    this.msgSubmit = this.msgSubmit.bind(this)
  }
  setMsgBoard() {
    this.props.actions.setMsgBoard()
  }
  msgSubmit(text) {
    if (text.length !== 0) {
      this.props.actions.msgSubmit(text)
    } else {
      this.props.actions.setMsgBoard()
    }
  }
  render() {
    const mainMenu = this.props.location.pathname.split('/')[1] || 'home'
    const height = this.props.params.reportType === 'diamond' ? 0 : 73
    const isShowMsgBoard = this.props.state.isShowMsgBoard
    const isSubmitLoading = this.props.state.isSubmitLoading
    const msg = this.props.state.msg
    const success = this.props.state.success
    const error = this.props.state.error
    const footer = 20
    return (
      <div style={{ height: `${window.innerHeight - footer}px`, minWidth: '1000px' }}>
        <MainNav
          style={{ height: `${height}px` }}
          selectedKeys={[mainMenu]}
          menuItems={menuItems}
          setMsgBoard={this.setMsgBoard}
          isShowMsgBoard={isShowMsgBoard}
          isSubmitLoading={isSubmitLoading}
          msgSubmit={this.msgSubmit}
          success={success}
          error={error}
          msg={msg}
          />
        <div style={{ height: `${window.innerHeight - footer - height}px` }}>
          {this.props.children}
        </div>
        <footer style={{ height: footer, width: '100%', textAlign: 'center', background: '#23292E', color: 'white' }}>
          Powered by 小米数据平台组. <a href="mailto:user-profile@xiaomi.com">user-profile@xiaomi.com</a>
        </footer>
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


function mapState(state) {
  return {
    state: state.base.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    persistentActions: bindActionCreators(BaseAction, dispatch),
    actions: bindActionCreators(BaseAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(CSSModules(Base, styles))
