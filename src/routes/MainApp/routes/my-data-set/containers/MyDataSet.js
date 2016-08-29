import React, { Component } from 'react'
import CSSModules from 'react-css-modules'

import SubNav from 'SRC/components/header/sub-nav/SubNav'

import styles from './MyDataSet.css'

const menuItems = [
  {
    key: 'user-profile',
    name: '我的画像',
    link: '/my-data-set/user-profile'
  }, {
    key: 'push-promotion',
    name: '我的推广',
    link: '/my-data-set/push-promotion'
  }
]

class MyDataSet extends Component {
  render() {
    const subMenu = this.props.location.pathname.split('/')[2]||'user-profile'
    return (
      <div className="full-height">
        <div className="fix-top-row-wrapper" style={{ paddingTop: '45px' }}>
          <div className="fix-top-row" style={{ height: '45px' }}>
            <SubNav menuItems={menuItems} selectedKeys={[subMenu]} style={{ padding: '0 3%' }} />
          </div>
          <div className="full-height">{this.props.children}</div>
        </div>
      </div>
    )
  }
}

export default CSSModules(MyDataSet, styles)
