import React, { Component } from 'react'

const _row = require('antd/lib/row')
const _col = require('antd/lib/col')
const _select = require('antd/lib/select')
const Option = _select.Option

import Wrapper from '../input-component-wrapper/Wrapper'

class VerticalSingleSelector extends Component {
  constructor(props) {
    super(props)
    this.handleClear = this.handleClear.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleClear() {
    this.props.onSelect([])
  }
  handleSelect(valueKey) {
    this.props.onSelect(this.props.options.filter(x => x.key === valueKey))
  }
  render() {
    const { label, icon, disableLabel, placeholder, value, options } = this.props
    return (
      <Wrapper disableLabel={disableLabel} label={label} icon={icon}>
        <_select
          style={{ width: '100%' }}
          placeholder={placeholder}
          value={value[0] ? value[0].key : undefined}
          onSelect={this.handleSelect}
          >
          {options.map(x => (
            <Option key={x.key}>{`${x.name}`}</Option>
          ))}
        </_select>
      </Wrapper>
    )
  }
}

VerticalSingleSelector.propTypes = {
  label: React.PropTypes.string,
  disableLabel: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
  value: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  })),
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  })),
  onSelect: React.PropTypes.func
}
VerticalSingleSelector.defaultProps = {
  label: '',
  disableLabel: false,
  placeholder: '请选择',
  value: [],
  options: [],
  onSelect: (value) => (value)
}

export default VerticalSingleSelector
