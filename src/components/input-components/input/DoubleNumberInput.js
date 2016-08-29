import React, { Component } from 'react'

// const _row = require('antd/lib/row')
// const _col = require('antd/lib/col')
const _input = require('antd/lib/input')

import Wrapper from '../input-component-wrapper/Wrapper'

class DoubleNumberInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      values: [null, null]
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillMount() {
    this.setState({ values: this.props.values })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ values: nextProps.values })
  }
  handleSubmit(index, event) {
    this.handleInput(index, event)
    // console.log(this.state.values)
    this.props.onChange(this.state.values)
  }
  handleInput(index, event) {
    const values = this.state.values
    const number = parseInt(event.target.value)
    values[index] = isNaN(number) ? null : number
    this.setState({ values })
  }
  render() {
    const { label, labelSize, icon, disableLabel, values, placeholders } = this.props
    return (
      <Wrapper disableLabel={disableLabel} label={label} icon={icon} labelSize={labelSize}>
        <_input
          style={{ display: 'inline-block', width: '183px', marginRight: '20px' }}
          type="number"
          value={values[0]}
          onChange={this.handleInput.bind(null, 0)}
          onPressEnter={this.handleSubmit.bind(null, 0)}
          onBlur={this.handleSubmit.bind(null, 0)}
          placeholder={placeholders[0]}
          />
        <_input
          style={{ display: 'inline-block', width: '183px' }}
          type="number"
          value={values[1]}
          onChange={this.handleInput.bind(null, 1)}
          onPressEnter={this.handleSubmit.bind(null, 1)}
          onBlur={this.handleSubmit.bind(null, 1)}
          placeholder={placeholders[1]}
          />
      </Wrapper>
    )
  }
}

DoubleNumberInput.propTypes = {
  label: React.PropTypes.string,
  icon: React.PropTypes.string,
  labelSize: React.PropTypes.string,
  disableLabel: React.PropTypes.bool,
  values: React.PropTypes.arrayOf(React.PropTypes.number),
  placeholders: React.PropTypes.arrayOf(React.PropTypes.string),
  onChange: React.PropTypes.func
}
DoubleNumberInput.defaultProps = {
  label: '',
  labelSize: 'normal',
  disableLabel: false,
  values: [null, null],
  placeholders: ['请输入数字', '请输入数字'],
  onChange: (value) => (value)
}

export default DoubleNumberInput
