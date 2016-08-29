import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'

import styles from './style.css'

const menuItems = [
  {
    key: 'extract',
    name: '在线提取用户集',
    link: '/push-promotion/user-set/extract/scenario'
  }, {
    key: 'upload',
    name: '上传用户集',
    link: '/push-promotion/user-set/upload'
  }
]

class ProfileUserSet extends Component {
  render() {
    const subMenu = this.props.location.pathname.split('/')[3] || 'extract'
    return (
      <div className="fix-top-row-wrapper" style={{ paddingTop: '70px' }}>
        <div className="fix-top-row bottom-border" style={{ height: '70px' }}>
          <div>
            <ul styleName="menu">
              {
                menuItems.map(menuItem => (
                  <li key={menuItem.key} styleName={subMenu === menuItem.key ? 'menu-item-selected' : 'menu-item'}>
                    <Link to={menuItem.link}>{menuItem.name}</Link>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <div style={{ height: '100%' }}>{this.props.children}</div>
      </div>
    )
  }
}

export default CSSModules(ProfileUserSet, styles)
