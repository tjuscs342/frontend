import React, { Component } from 'react'

const _input = require('antd/lib/input')
import Wrapper from '../input-component-wrapper/Wrapper'

import CSSModules from 'react-css-modules'
import styles from './style.css'

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillMount() {
    this.setState({ value: this.props.value })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value })
    if (!nextProps.validator(nextProps.value)) {
      try {
        this.refs.nameInput.refs.input.focus()
      } catch (e) {
        console.err('Due to the change of antd implementation, "this.refs.nameInput.refs.input.focus()" is not working right now. Please check "SRC/components/input/Input.js"')
      }
    }
  }
  handleSubmit(event) {
    const newInputValue = event.target.value.trim()
    if (newInputValue !== this.props.value) {
      this.props.onInput(newInputValue)
    }
  }
  handleInput(event) {
    this.setState({ value: event.target.value })
  }
  render() {
    const { label, icon, disableLabel, placeholder, required, style, validator } = this.props
    const isValid = validator(this.state.value)
    return (
      <div style={style}>
        <div style={{ paddingRight: '35px', position: 'relative' }}>
          <Wrapper disableLabel={disableLabel} label={label} icon={icon} width="130px">
            <_input
              styleName={isValid ? '' : 'invalid-input'}
              ref="nameInput"
              placeholder={placeholder}
              value={this.state.value}
              onChange={this.handleInput}
              onPressEnter={this.handleSubmit}
              onBlur={this.handleSubmit}
              />
          </Wrapper>
          {
            isValid ? null : <div styleName="promt">请输入用户集名称</div>
          }
          {
            required ? <div style={{ position: 'absolute', top: 0, right: 0 }}>*必填</div> : null
          }
        </div>
      </div>
    )
  }
}

Input.propTypes = {
  label: React.PropTypes.string,
  icon: React.PropTypes.string,
  disableLabel: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string,
  onInput: React.PropTypes.func,
  required: React.PropTypes.bool,
  style: React.PropTypes.object,
  validator: React.PropTypes.func
}
Input.defaultProps = {
  label: '',
  disableLabel: false,
  placeholder: 'Please Input...',
  // selectedValues: [],
  value: '',
  required: false,
  onInput: (value) => (value),
  style: {},
  validator: () => (true)
}

export default CSSModules(Input, styles)
