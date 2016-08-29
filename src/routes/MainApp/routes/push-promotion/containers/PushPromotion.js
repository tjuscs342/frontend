import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'

import StepNav from 'SRC/components/header/step-nav/StepNav'

import styles from './PushPromotion.css'

class PushPromotion extends Component {
  render() {
    return (
      <div style={{ height: '100%' }}>{this.props.children}</div>
    )
  }
}

export default CSSModules(PushPromotion, styles)
