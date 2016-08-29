import React, { Component } from 'react'
import MainNav from 'SRC/components/header/main-nav/MainNav'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CSSModules from 'react-css-modules'
import styles from './base.css'
import * as BaseAction from './baseAction'


const menuItems = [
  { key: 'home', name: 'Home', link: '/home' },
  { key: 'page2', name: 'page2', link: '/page2' },
  { key: 'page3', name: 'page3', link: '/page3' },
  { key: 'page4', name: 'page4', link: '/page4' }
]

class Base extends Component {
  constructor(props) {
    super(props)
    this.setVisible = this.setVisible.bind(this)
    this.login = this.login.bind(this)
  }
  setVisible() {
    this.props.actions.setVisible()
  }
  login(userName, password) {
    if (userName.length !== 0 && password.length !== 0) {
      this.props.actions.login(userName, password)
    } else {
      this.props.actions.setVisible()
    }
  }
  render() {
    const mainMenu = this.props.location.pathname.split('/')[1] || 'home'
    const height = this.props.params.reportType === 'diamond' ? 0 : 73
    const isShowLogin = this.props.state.isShowLogin
    const isLogining = this.props.state.isLogining
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
          setVisible={this.setVisible}
          isShowLogin={isShowLogin}
          isLogining={isLogining}
          login={this.login}
          success={success}
          error={error}
          msg={msg}
          />
        <div style={{ height: `${window.innerHeight - footer - height}px` }}>
          {this.props.children}
        </div>
        <footer style={{ height: footer, width: '100%', textAlign: 'center', background: '#23292E', color: 'white' }}>
          Powered by <a href="https://github.com/AllanJian" target="_blank">AllanJian</a>.
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
