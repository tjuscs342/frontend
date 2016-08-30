import React, { Component } from 'react'
import { Link } from 'react-router'

import getUser from 'SRC/utils/getUser'

import CSSModules from 'react-css-modules'
import styles from './MainNav.css'

const _row = require('antd/lib/row')
const _col = require('antd/lib/col')
const _menu = require('antd/lib/menu')
const Modal = require('antd/lib/modal')
const Button = require('antd/lib/button')
const Input = require('antd/lib/input')
const MenuItem = _menu.Item

class MainNav extends Component {
  constructor(props) {
    super(props)
    this.success = this.success.bind(this)
    this.error = this.error.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.success && nextProps.success) {
      setTimeout(() => this.success(), 500)
    }
    if (!this.props.error && nextProps.error) {
      setTimeout(() => this.error(), 500)
    }
  }
  success() {
    Modal.success({
      title: getUser().name !== '' ? '登陆成功' : '您已登出'
    })
    this.props.clearModal()
  }

  error() {
    Modal.error({
      title: '错误',
      content:
        <div>
          <p>由于网络或其他原因该留言未能提交，请稍后再试。</p>
        </div>
    })
    this.props.clearModal()
  }
  render() {
    const setVisible = this.props.setVisible
    const isShowLogin = this.props.isShowLogin
    const isLogining = this.props.isLogining
    const activeItem = this.props.selectedKeys[0]
    const login = this.props.login
    const logout = this.props.logout
    const userName = getUser().name
    return (
      <_row style={this.props.style} styleName="main-nav" type="flex" align="bottom">
        <_col span={3} styleName="main-nav-header">
          <div styleName="logo" className="divCenterMiddle">
            Logo
          </div>

        </_col>
        <_col span={3} styleName="main-nav-header">
          <div styleName="productName" style={{ fontSize: '18px' }} className="divCenterMiddle">
            Product Name
          </div>
        </_col>
        <_col span={14} styleName="main-nav-header">
          <div className="divCenterBottom">
            <_menu selectedKeys={[`.$${activeItem}`]} mode="horizontal" styleName="main-nav-menu">
              {this.props.menuItems.map(menuItem => (
                <MenuItem key={menuItem.key} styleName={activeItem === menuItem.key ? 'menu-item-selected' : 'menu-item'}>
                  <Link to={menuItem.link}>{menuItem.name}</Link>
                </MenuItem>
              ))}
            </_menu>
          </div>
        </_col>
        <_col span={4} styleName="main-nav-header">
          <div className="divCenterBottom">
            {
              userName === '' ?
                <div className="pointer" styleName="logout-btn" onClick={setVisible} style={{ marginBottom: '10px' }}>login</div>
              :
                <div>
                  <span>{userName}</span>
                  <span
                    className="pointer"
                    style={{ display: 'inline-block', marginLeft: '15px' }}
                    onClick={logout}
                    >
                    <i className="fa fa-sign-out" style={{ color: '#2E99EC' }} ></i>
                  </span>
                </div>
            }
          </div>
        </_col>
        <Modal
          title="Login"
          visible={isShowLogin}
          onOk={setVisible}
          onCancel={setVisible}
          footer={[
            <Button key="back" type="ghost" size="large" onClick={setVisible}>
              cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              size="large"
              loading={isLogining}
              onClick={() =>
                login(document.getElementById('userName').value, document.getElementById('password').value)
              }
              >
              login
            </Button>
          ]}
          >
          <div style={{ width: '350px', margin: '0 auto' }}>
            <Input
              addonBefore="username:"
              id="userName"
              style={{ width: '100%' }}
              />
            <br />
            <Input
              addonBefore="password:"
              id="password"
              type="password"
              style={{ width: '100%' }}
              />
          </div>
        </Modal>
      </_row>
    )
  }
}

MainNav.propTypes = {
  menuItems: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired
  })),
  selectedKeys: React.PropTypes.arrayOf(React.PropTypes.string),
  style: React.PropTypes.object,
  setVisible: React.PropTypes.func,
  isLogining: React.PropTypes.bool,
  isShowLogin: React.PropTypes.bool,
  msg: React.PropTypes.string,
  login: React.PropTypes.func.isRequired,
  success: React.PropTypes.bool,
  error: React.PropTypes.bool,
  logout: React.PropTypes.func,
  clearModal: React.PropTypes.func
}

MainNav.defaultProps = {
  menuItems: [],
  selectedKeys: [],
  style: {}
}
export default CSSModules(MainNav, styles)
