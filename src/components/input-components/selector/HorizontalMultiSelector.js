import React, { Component } from 'react'

const _button = require('antd/lib/button')

import Wrapper from '../input-component-wrapper/Wrapper'
import CSSModules from 'react-css-modules'
import styles from './style.css'

class HorizontalMultiSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedItemsMap: new Map()
    }
    this.handleClear = this.handleClear.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }
  componentWillMount() {
    this.setState({
      selectedItemsMap: new Map(this.props.selectedValues.map((el) => ([el.key, el])))
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedItemsMap: new Map(nextProps.selectedValues.map((el) => ([el.key, el])))
    })
  }
  handleClear() {
    const { selectedItemsMap } = this.state
    const { values, allowSelectAll } = this.props
    // hack!!!!
    if (false && allowSelectAll && selectedItemsMap.size !== values.length) {
      selectedItemsMap.clear()
      values.forEach(el => {
        selectedItemsMap.set(el.key, el)
      })
    } else {
      selectedItemsMap.clear()
    }
    this.setState({
      selectedItemsMap
    })
    this.props.onSelect([...selectedItemsMap.values()])
  }
  handleSelect(value) {
    const { selectedItemsMap } = this.state
    if (this.props.multiple) { // Multi Selection
      if (selectedItemsMap.has(value.key)) {
        selectedItemsMap.delete(value.key)
      } else {
        selectedItemsMap.set(value.key, value)
      }
    } else { // Single Selection
      selectedItemsMap.clear()
      selectedItemsMap.set(value.key, value)
    }
    this.setState({
      selectedItemsMap
    })
    this.props.onSelect([...selectedItemsMap.values()])
  }
  // 用以获取按钮中文字的长度 字母数字算半个
  getLength(str) {
    return /[\w]/.test(str) ?
           str.length - str.match(/[\w]/ig).length / 2 :
           str.length
  }
  render() {
    const { label, icon, disableLabel, multiple, values, labelSize, description, limitation, updatePeriod } = this.props
    const { selectedItemsMap } = this.state
    // 获取当前这组数据中显示文字最长的长度
    let buttonSize = 0
    for (const item of values) {
      const itemLength = this.getLength(item.name)
      buttonSize = itemLength > buttonSize ? itemLength : buttonSize
    }
    return (
      <Wrapper
        disableLabel={disableLabel}
        label={label}
        icon={icon}
        labelSize={labelSize}
        description={description}
        updatePeriod={updatePeriod}
        limitation={limitation}
        >
        <div className="fix-left-column-wrapper" style={{ paddingLeft: multiple ? '80px' : 0 }}>
          <div className="fix-left-column" style={{ width: '80px' }}>
            {
              !multiple ? null :
                <_button
                  styleName={selectedItemsMap.size === 0 ? 'btn-active' : 'btn'}
                  onClick={this.handleClear}
                  >
                  {'全部'/* allowSelectAll ? '全选' : '未选' */}
                </_button>
            }
          </div>
          <div>
            {
              values.map((el) => (
                <_button
                  styleName={selectedItemsMap.has(el.key) ? 'btn-active' : 'btn'}
                  style={{ width: `${buttonSize + 1.7}em` }}
                  key={el.key}
                  onClick={this.handleSelect.bind(null, el)}
                  >
                  {`${el.name}`}
                </_button>
              ))
            }
          </div>
        </div>
      </Wrapper>
    )
  }
}

HorizontalMultiSelector.propTypes = {
  label: React.PropTypes.string,
  icon: React.PropTypes.string,
  labelSize: React.PropTypes.string,
  multiple: React.PropTypes.bool,
  allowSelectAll: React.PropTypes.bool,
  disableLabel: React.PropTypes.bool,
  selectedValues: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  })),
  values: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  })),
  description: React.PropTypes.string,
  updatePeriod: React.PropTypes.string,
  limitation: React.PropTypes.string,
  onSelect: React.PropTypes.func
}
HorizontalMultiSelector.defaultProps = {
  label: '',
  labelSize: 'normal',
  multiple: true,
  allowSelectAll: false,
  disableLabel: false,
  selectedValues: [],
  values: [],
  onSelect: (value) => (value)
}

export default CSSModules(HorizontalMultiSelector, styles)
