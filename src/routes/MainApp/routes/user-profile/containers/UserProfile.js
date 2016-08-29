import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'

import StepNav from 'SRC/components/header/step-nav/StepNav'

import styles from './UserProfile.css'

class UserProfile extends Component {
  render() {
    const subMenu = this.props.location.pathname.split('/')[2] || 'user-set'
    let currentStep
    switch (subMenu) {
      case 'user-set':
        currentStep = 0
        break
      case 'properties':
        currentStep = 1
        break
      default:
        currentStep = -1
    }
    const showHeader = subMenu !== 'report'
    return (
      <div style={{ height: '100%' }}>
        {
        // <div className="fix-top-row-wrapper" style={{ paddingTop: showHeader ? '144px' : 0 }}>
        //   {
        //     !showHeader ? null :
        //       <div className="fix-top-row bottom-border" style={{ height: '144px', display: showHeader ? 'block' : 'none' }}>
        //         <StepNav
        //           steps={['创建用户集', '选择属性', '生成用户画像']}
        //           currentStep={currentStep}
        //           style={{ padding: '0px', height: '144px', background: '#DCF0FF' }}
        //           />
        //       </div>
        //   }
        //   <div style={{ height: '100%' }}>{this.props.children}</div>
        // </div>
        }
        {this.props.children}
      </div>
    )
  }
}

export default CSSModules(UserProfile, styles)
