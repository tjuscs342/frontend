import React, { Component } from 'react'

const _row = require('antd/lib/row')
const _col = require('antd/lib/col')
import HorizontalMultiSelector from './HorizontalMultiSelector'

class MatrixMultiSelector extends Component {
  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleSelect(rowKey, value) {
    this.props.onSelect([rowKey, value])
  }
  render() {
    const { columnHeader, disableHeader, rows, rowKeys, values, selectedValues, style } = this.props
    return (
      <div style={style}>
        {
          // Column Header
          disableHeader ? null : (
            <_row className="bottom-border" style={{ paddingBottom: '10px', marginBottom: '10px' }}>
              {
                columnHeader.map((x, index) => (
                  index === columnHeader.length -1 ?
                    <_col className="fs14 text-left" span={4} key={x}>{x}</_col> :
                    <_col className="fs14 text-center" span={4} key={x}>{x}</_col>
                ))
              }
            </_row>
          )
        }
        {
          // Column Body
          rowKeys.map((rowKey, index) => (
            <_row key={rowKey}>
              {
                rows[index].map((text, colNum) => {
                  if (text !== '__selector__') {
                    return <_col style={{ height: '29px', lineHeight: '29px' }} className="fs12 text-center" span={4} key={colNum}>{text}</_col>
                  }
                  return (
                    <_col span={16} key={colNum}>
                      <HorizontalMultiSelector
                        disableLabel
                        values={values}
                        selectedValues={selectedValues[rowKey]}
                        onSelect={this.handleSelect.bind(this, rowKey)}
                        />
                    </_col>
                  )
                })
              }
            </_row>
          ))
        }
      </div>
    )
  }
}

MatrixMultiSelector.propTypes = {
  columnHeader: React.PropTypes.arrayOf(React.PropTypes.string),
  disableHeader: React.PropTypes.bool,
  columnNum: React.PropTypes.number,
  rowKeys: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired,
  rows: React.PropTypes.arrayOf(React.PropTypes.array),
  values: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  })),
  selectedValues: (props, propName, componentName) => {
    for (const key of Object.keys(props[propName])) {
      const errorMsg = new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Validation failed. props.${propName}.${key} should be an array of object with shape- {key: String, name, String}`
      )
      if (!Array.isArray(props[propName][key])) {
        return errorMsg
      }
      for (const x of props[propName][key]) {
        if ((typeof(x.key) !== 'string') || (typeof(x.name) !== 'string')) {
          return errorMsg
        }
      }
    }
    return undefined
  },
  onSelect: React.PropTypes.func,
  style: React.PropTypes.object
}
MatrixMultiSelector.defaultProps = {
  disableHeader: false,
  columnNum: 2,
  rows: [],
  selectedValues: {},
  values: [],
  onSelect: (value) => (value),
  style: {}
}

export default MatrixMultiSelector
