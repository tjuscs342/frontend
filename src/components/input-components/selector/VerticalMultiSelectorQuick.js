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
      selectedValuesMap: new Map(),
      originValues: [],
      activeValues: []
    }
    this.handleClear = this.handleClear.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentWillMount() {
    this.setState({
      valuesMap: new Map(this.props.values.map((el) => ([el.key, el]))),
      originValues: this.props.values,
      activeValues: this.props.values,
      selectedValuesMap: new Map(this.props.selectedValues.map(el => ([el.key, el])))
    })
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.values.length !== nextProps.values.length) {
      this.setState({
        valuesMap: new Map(nextProps.values.map((el) => ([el.key, el]))),
        originValues: nextProps.values,
        activeValues: nextProps.values
      })
    }
    const selectedValuesMap = this.state.selectedValuesMap
    selectedValuesMap.clear()
    nextProps.selectedValues.forEach(value => {
      selectedValuesMap.set(value.key, value)
    })
  }
  handleClear() {
    this.props.onSelect([])
  }
  handleSelect(valueKey) {
    const { valuesMap, selectedValuesMap } = this.state
    if (selectedValuesMap.has(valueKey)) {
      selectedValuesMap.delete(valueKey)
    } else {
      selectedValuesMap.set(valueKey, valuesMap.get(valueKey))
    }
    this.props.onSelect([...selectedValuesMap.values()])
  }
  handleSearch(searchKey) {
    const activeValues = this.state.originValues.filter(el => (
      el.name.indexOf(searchKey) >= 0
    ))
    this.setState({
      searchKey,
      activeValues
    })
  }
  render() {
    const { label, disableLabel, placeholder } = this.props
    const { selectedValuesMap, activeValues } = this.state
    const options = activeValues.slice(0, 30).map(el => (
      <Option key={el.key}>
        {`${el.name}`}
      </Option>
    ))
    return (
      <_row>
        {
          disableLabel ? null : <_col span={4} className="text-right" >{`${label}`}</_col>
        }
        <_col span={disableLabel ? 24 : 20}>
          <_select
            multiple
            showSearch
            style={{ width: '100%' }}
            placeholder={placeholder}
            value={[...selectedValuesMap.values()].map(x => x.key)}
            onSelect={this.handleSelect}
            onDeselect={this.handleSelect}
            onSearch={this.handleSearch}
            >
            {options}
          </_select>
        </_col>
      </_row>
    )
  }
}

VerticalMultiSelector.propTypes = {
  label: React.PropTypes.string,
  placeholder: React.PropTypes.string,
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
  placeholder: '输入文字搜索...',
  disableLabel: false,
  selectedValues: [],
  values: [],
  onSelect: (value) => (value)
}

export default VerticalMultiSelector
