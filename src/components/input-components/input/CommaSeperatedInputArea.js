import React, { Component } from 'react'

const _row = require('antd/lib/row')
const _col = require('antd/lib/col')
const _input = require('antd/lib/input')

import Wrapper from '../input-component-wrapper/Wrapper'

class CommaSeperatedInputArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillMount() {
    this.setState({ value: this.props.values.join(', ') })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.values.join(', ') })
  }
  handleSubmit(event) {
    this.props.onInput(
      event.target.value.split(/,/).map(x => x.trim()).filter(x => x !== '')
    )
  }
  handleInput(event) {
    this.setState({ value: event.target.value })
  }
  render() {
    const { label, icon, disableLabel, placeholder } = this.props
    return (
      <Wrapper disableLabel={disableLabel} label={label} icon={icon} width={icon ? '130px' : null}>
        <_input
          type="textarea"
          placeholder={placeholder}
          autosize={{ minRows: 2, maxRows: 4 }}
          value={this.state.value}
          onChange={this.handleInput}
          onPressEnter={this.handleSubmit}
          onBlur={this.handleSubmit}
          />
      </Wrapper>
    )
  }
}

CommaSeperatedInputArea.propTypes = {
  label: React.PropTypes.string,
  disableLabel: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
  // selectedValues: React.PropTypes.arrayOf(React.PropTypes.shape({
  //   key: React.PropTypes.string.isRequired,
  //   name: React.PropTypes.string.isRequired
  // })),
  values: React.PropTypes.arrayOf(React.PropTypes.string),
  onInput: React.PropTypes.func
}
CommaSeperatedInputArea.defaultProps = {
  label: '',
  disableLabel: false,
  placeholder: '请用半角逗号隔开...',
  // selectedValues: [],
  values: [],
  onInput: (value) => (value)
}

export default CommaSeperatedInputArea
