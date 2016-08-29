import React, { Component } from 'react'
import moment from 'moment'

// const _row = require('antd/lib/row')
// const _col = require('antd/lib/col')
const _datePicker = require('antd/lib/date-picker')

import Wrapper from '../input-component-wrapper/Wrapper'

class DoubleDatePicker extends Component {
  constructor(props) {
    super(props)
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
  }
  handleStartDateChange(value, dateString) {
    this.props.onChange([dateString, this.props.values[1]])
  }
  handleEndDateChange(value, dateString) {
    this.props.onChange([this.props.values[0], dateString])
  }
  render() {
    const { label, icon, disableLabel, values } = this.props
    return (
      <Wrapper disableLabel={disableLabel} label={label} icon={icon} width={icon ? '110px' : null}>
        <_datePicker
          value={values[0]}
          onChange={this.handleStartDateChange}
          style={{ marginRight: '20px' }}
          />
        <_datePicker
          value={values[1]}
          onChange={this.handleEndDateChange}
          />
      </Wrapper>
    )
  }
}

DoubleDatePicker.propTypes = {
  label: React.PropTypes.string,
  disableLabel: React.PropTypes.bool,
  values: React.PropTypes.arrayOf(React.PropTypes.string),
  onChange: React.PropTypes.func
}
DoubleDatePicker.defaultProps = {
  label: '',
  disableLabel: false,
  values: [
    moment().subtract(1, 'month').format('YYYY-MM-DD'),
    moment().subtract(0, 'day').format('YYYY-MM-DD')
  ],
  onChange: (value) => (value)
}

export default DoubleDatePicker
