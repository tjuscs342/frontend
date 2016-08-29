import React, { Component } from 'react'

import CSSModules from 'react-css-modules'
import styles from './style.css'

class StepNav extends Component {
  render() {
    const { steps, currentStep } = this.props
    const stepsArray = []
    steps.forEach((step, index) => {
      stepsArray.push((
        <div key={`label${index}`} styleName={index <= currentStep ? 'step-active' : 'step'}>
          <div styleName="label">{index + 1}</div>
          <div styleName="title">{step}</div>
        </div>
      ))
      if (index !== steps.length - 1) {
        stepsArray.push((
          <div key={`line${index}`} styleName={index < currentStep ? 'line-active' : 'line'}>
            <span styleName="dot" />
            <span styleName="dot" />
            <span styleName="dot" />
          </div>
        ))
      }
    })
    return (
      <div style={this.props.style}>
        <div className="vertical-center text-center">
          {stepsArray}
        </div>
      </div>
    )
  }
}

StepNav.propTypes = {
  currentStep: React.PropTypes.number,
  steps: React.PropTypes.arrayOf(React.PropTypes.string),
  style: React.PropTypes.object
}

StepNav.defaultProps = {
  steps: [],
  currentStep: -1,
  style: {}
}

export default CSSModules(StepNav, styles)
