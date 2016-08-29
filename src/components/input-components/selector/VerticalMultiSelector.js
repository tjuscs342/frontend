import React, { Component } from 'react'

const _row = require('antd/lib/row')
const _col = require('antd/lib/col')
const _select = require('antd/lib/select')
const Option = _select.Option

class VerticalMultiSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      valuesMap: new Map(),
      options: []
    }
    this.handleClear = this.handleClear.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }
  componentWillMount() {
    this.setState({
      valuesMap: new Map(this.props.values.map((el) => ([el.key, el]))),
      options: this.props.values.map((el) => (
        <Option key={el.key}>
          {`${el.name}`}
        </Option>
      ))
    })
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.values.length !== nextProps.values.length) {
      this.setState({
        valuesMap: new Map(nextProps.values.map((el) => ([el.key, el]))),
        options: nextProps.values.map((el) => (
          <Option key={el.key}>
            {`${el.name}`}
          </Option>
        ))
      })
    }
  }
  handleClear() {
    this.props.onSelect([])
  }
  handleSelect(values) {
    const { valuesMap } = this.state
    this.props.onSelect(values.map(x => {
      if (valuesMap.has(x)) {
        return valuesMap.get(x)
      }
      return {
        key: x,
        name: x
      }
    }))
  }
  render() {
    const { label, disableLabel, selectedValues } = this.props
    return (
      <_row>
        {
          disableLabel ? null : <_col span={4} className="text-right" >{`${label}`}</_col>
        }
        <_col span={disableLabel ? 24 : 20}>
          <_select
            multiple
            tags
            style={{ width: '100%' }}
            placeholder="Please select"
            value={[...selectedValues.map(x => x.key)]}
            onChange={this.handleSelect}
            style={{ width: '100%' }}
            >
            {this.state.options}
          </_select>
        </_col>
      </_row>
    )
  }
}

VerticalMultiSelector.propTypes = {
  label: React.PropTypes.string,
  disableLabel: React.PropTypes.bool,
  selectedValues: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  })),
  values: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  })),
  onSelect: React.PropTypes.func
}
VerticalMultiSelector.defaultProps = {
  label: '',
  disableLabel: false,
  selectedValues: [],
  values: [],
  onSelect: (value) => (value)
}

export default VerticalMultiSelector
