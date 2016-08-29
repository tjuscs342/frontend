import React, { Component } from 'react'

import { Link } from 'react-router'

const _menu = require('antd/lib/menu')
const MenuItem = _menu.Item

import CSSModules from 'react-css-modules'
import styles from './UserSetSelectorMainNav.css'

class UserSetSelectorMainNav extends Component {
  render() {
    const { menuItems, selectedMenu, style } = this.props
    return (
      <div style={style}>
        <_menu style={style} styleName="menu" selectedKeys={[selectedMenu]} mode="horizontal">
          {menuItems.map(menuItem => (
            <MenuItem key={menuItem.key} styleName={selectedMenu === menuItem.key ? 'menu-item-selected' : 'menu-item'}>
              <Link to={menuItem.link}>{menuItem.name}</Link>
            </MenuItem>
          ))}
        </_menu>
      </div>
    )
  }
}

UserSetSelectorMainNav.propTypes = {
  menuItems: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    link: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.shape({
        pathname: React.PropTypes.string.isRequired,
        query: React.PropTypes.object
      })
    ])
  })),
  selectedMenu: React.PropTypes.string,
  style: React.PropTypes.object
}

UserSetSelectorMainNav.defaultProps = {
  menuItems: [],
  selectedMenu: '',
  style: {}
}

export default CSSModules(UserSetSelectorMainNav, styles)
