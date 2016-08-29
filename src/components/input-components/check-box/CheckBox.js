import React, { Component } from 'react'

import CSSModules from 'react-css-modules'
import styles from './style.css'

class CheckBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillMount() {
    this.setState({ checked: this.props.checked })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ checked: nextProps.checked })
  }
  handleChange(event) {
    this.setState({ checked: event.target.checked })
    this.props.onChange(event.target.checked)
  }
  render() {
    const { children, style } = this.props
    const { checked } = this.state
    return (
      <label style={style}>
        <span styleName={checked ? 'checkbox-outer-active' : 'checkbox-outer'}>
          <span styleName="checkbox-inner" />
          <input type="checkbox" checked={checked} onChange={this.handleChange} styleName="checkbox-input" />
        </span>
        <span className="fc-blue" styleName="checkbox-label">{children}</span>
      </label>
    )
  }
}

CheckBox.propTypes = {
  checked: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.string
  ]),
  style: React.PropTypes.object
}
CheckBox.defaultProps = {
  checked: false,
  onChange: (v) => (v),
  style: {}
}

export default CSSModules(CheckBox, styles)
