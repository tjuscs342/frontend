import React, { Component } from 'react'
import { Link } from 'react-router'

import CSSModules from 'react-css-modules'
import styles from './SubNav.css'

class SubNav extends Component {
  render() {
    const activeItem = this.props.selectedKeys[0]
    return (
      <div className="full" style={this.props.style}>
        <ul styleName="subHeader" className="full">
          {this.props.menuItems.map(menuItem => (
            <li key={menuItem.key} className="full-height" styleName={activeItem === menuItem.key ? 'menu-item-selected' : 'menu-item'}>
              <Link className="full inline fs16 fc-light" to={menuItem.link}><span>{menuItem.name}</span></Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

// <_menu styleName="subHeader" selectedKeys={[`.$${activeItem}`]} mode="horizontal" style={{ border: 0 }}>
//   {this.props.menuItems.map(menuItem => (
//     <MenuItem key={menuItem.key} styleName={activeItem === menuItem.key ? 'menu-item-selected' : 'menu-item'}>
//       <Link to={menuItem.link}>{menuItem.name}</Link>
//     </MenuItem>
//   ))}
// </_menu>

SubNav.propTypes = {
  menuItems: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired
  })),
  selectedKeys: React.PropTypes.arrayOf(React.PropTypes.string),
  style: React.PropTypes.object
}

SubNav.defaultProps = {
  menuItems: [],
  selectedKeys: [],
  style: {}
}

export default CSSModules(SubNav, styles)
