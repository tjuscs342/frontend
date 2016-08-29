import React, { Component } from 'react'

// const _row = require('antd/lib/row')
// const _col = require('antd/lib/col')
const _select = require('antd/lib/select')
const Option = _select.Option
const OptGroup = _select.OptGroup

import Wrapper from '../input-component-wrapper/Wrapper'

class CascadingSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      baseMap: new Map(),
      originValueMaps: [],
      selectedValues: [],
      currentOptions: []
    }
    this.createOriginValueMaps = this.createOriginValueMaps.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.createBaseMap = this.createBaseMap.bind(this)
    this.createCurrentOptions = this.createCurrentOptions.bind(this)
  }
  componentWillMount() {
    const baseMap = this.createBaseMap(this.props.valuePool)
    const selectedValues = this.props.selectedValues.map(values => (
      values.map(x => `${x.key}$$${x.name}`)
    ))
    const currentOptions = this.createCurrentOptions(baseMap, selectedValues)
    const originValueMaps = this.createOriginValueMaps(this.props.valuePool, [], 0)
    // console.log('initialized')
    this.setState({
      baseMap,
      selectedValues,
      currentOptions,
      originValueMaps
    })
  }
  componentWillReceiveProps(nextProps) {
    const selectedValues = nextProps.selectedValues.map(values => (
      values.map(x => `${x.key}$$${x.name}`)
    ))
    if (this.props.valuePool !== nextProps.valuePool ||
        JSON.stringify(this.state.selectedValues) !== JSON.stringify(selectedValues)) {
      // console.log('updated')
      let { baseMap, originValueMaps } = this.state
      if (this.props.valuePool !== nextProps.valuePool) {
        baseMap = this.createBaseMap(nextProps.valuePool)
        originValueMaps = this.createOriginValueMaps(nextProps.valuePool, [], 0)
      }
      const currentOptions = this.createCurrentOptions(baseMap, selectedValues)
      this.setState({
        baseMap,
        originValueMaps,
        selectedValues,
        currentOptions
      })
    }
  }
  createBaseMap(raw) {
    if (!raw) return null
    const map = new Map()
    Object.keys(raw).forEach(key => {
      map.set(`${key}$$${raw[key].name}`, this.createBaseMap(raw[key].children))
    })
    return map
  }
  createCurrentOptions(baseMap, selectedValues) {
    const currentOptions = selectedValues.map(() => [])
    selectedValues.forEach((values, index) => {
      if (index === 0) {
        currentOptions[index] = [baseMap]
      } else {
        selectedValues[index - 1].forEach(parentKey => {
          currentOptions[index - 1].forEach(parentMaps => {
            if (parentMaps && parentMaps.has(parentKey)) {
              currentOptions[index].push(parentMaps.get(parentKey))
            }
          })
        })
      }
    })
    return currentOptions
  }
  // eslint-disable no-param-reassign
  createOriginValueMaps(raw, originValueMaps, level) {
    if (!raw) return originValueMaps
    // eslint-disable-next-line no-param-reassign
    if (!originValueMaps[level]) originValueMaps[level] = new Map()
    const keyMap = originValueMaps[level]
    Object.keys(raw).forEach(key => {
      const { name, children, ...other } = raw[key]
      keyMap.set(`${key}$$${name}`, {
        key,
        name,
        ...other
      })
      if (children) {
        this.createOriginValueMaps(children, originValueMaps, level + 1)
      }
    })
    return originValueMaps
  }
  handleSelect(level, value) {
    // console.log(this.state.selectedValues)
    // console.log(level, value)
    const selectedValues = this.state.selectedValues.map((x, i) => {
      if (i < level) return x
      else if (i === level) return Array.isArray(value) ? value : [value]
      // console.log(this.state.currentOptions)
      return []
    })
    const currentOptions = this.createCurrentOptions(this.state.baseMap, selectedValues)
    this.setState({
      selectedValues,
      currentOptions
    })
    const { originValueMaps } = this.state
    this.props.onSelect(selectedValues.map((values, index) => (
      values.map(key => originValueMaps[index].get(key))
    )))
  }
  render() {
    const { label, labelSize, icon, disableLabel, selectorLabels, disableSelectorLabel, placeholders, selectorType } = this.props
    const { selectedValues, currentOptions } = this.state
    const selectors = []
    placeholders.forEach((values, index) => {
      const selector = (
        <_select
          multiple={selectorType[index] === 'multi'}
          style={{ width: '100%' }}
          placeholder={placeholders[index]}
          value={selectedValues[index]}
          onChange={this.handleSelect.bind(this, index)}
          >
          {
            (() => {
              if (currentOptions[index].length === 0) {
                return null
              }
              // Only One Option Group
              if (index === 0 || selectorType[index - 1] !== 'multi') {
                if (!currentOptions[index][0]) return null
                return [...currentOptions[index][0].keys()].map(xy => {
                  const [key, name] = xy.split('$$')
                  return <Option key={key} value={xy}>{name}</Option>
                })
              }
              // Multiple Option Group
              return currentOptions[index].map((map, i) => {
                // eslint-disable-next-line no-shadow
                const label = selectedValues[index - 1][i].split('$$')[1]
                return (
                  <OptGroup label={label} key={label}>
                    {
                      !map ? null :
                      [...map.keys()].map(xy => {
                        const [key, name] = xy.split('$$')
                        return <Option key={key} value={xy}>{name}</Option>
                      })
                    }
                  </OptGroup>
                )
              })
            })()
          }
        </_select>
      )
      const width = `${parseInt(100 / selectedValues.length) - 3}%`
      if (!disableSelectorLabel && selectorLabels[index]) {
        selectors.push((
          <div style={{ width, display: 'inline-block' }} key={`${index}Label`}>
            <div className="fix-left-column-wrapper" style={{ paddingLeft: '90px' }}>
              <div
                className="fix-left-column h25 fs14"
                style={{ width: '90px', textAlign: index === 0 ? 'left' : 'center' }}
                >
                {selectorLabels[index]}
              </div>
              <div>{selector}</div>
            </div>
          </div>
        ))
      } else {
        selectors.push(
          <div style={{ width, display: 'inline-block', marginRight: '2%' }} key={`${index}Label`}>
            {selector}
          </div>
        )
      }
    })
    return (
      <Wrapper disableLabel={disableLabel} label={label} icon={icon} labelSize={labelSize}>
        {selectors}
      </Wrapper>
    )
  }
}

CascadingSelector.propTypes = {
  label: React.PropTypes.string,
  icon: React.PropTypes.string,
  labelSize: React.PropTypes.string,
  disableLabel: React.PropTypes.bool,
  selectorType: React.PropTypes.arrayOf(React.PropTypes.string),
  placeholders: React.PropTypes.arrayOf(React.PropTypes.string),
  selectorLabels: React.PropTypes.arrayOf(React.PropTypes.string),
  disableSelectorLabel: React.PropTypes.bool,
  selectedValues: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(React.PropTypes.shape({
      key: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired
    }))
  ),
  valuePool: React.PropTypes.object,
  onSelect: React.PropTypes.func
}
CascadingSelector.defaultProps = {
  label: '',
  labelSize: 'normal',
  disableLabel: false,
  selectorLabels: [],
  disableSelectorLabel: false,
  placeholders: [],
  selectedValues: [],
  values: {},
  onSelect: (value) => (value)
}

export default CascadingSelector
