import React, { Component } from 'react'

import CSSModules from 'react-css-modules'
import styles from './style.css'

class AbstractSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedItemsMap: new Map()
    }
    this.handleClear = this.handleClear.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSelectAll = this.handleSelectAll.bind(this)
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
    selectedItemsMap.clear()
    this.setState({
      selectedItemsMap
    })
    this.props.onSelect([])
  }
  handleSelectAll() {
    const { selectedItemsMap } = this.state
    const { values, allowSelectAll } = this.props
    if (allowSelectAll && selectedItemsMap.size !== values.length) {
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
  render() {
    return (<div>AbstractSelector</div>)
  }
}

AbstractSelector.propTypes = {
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
  onSelect: React.PropTypes.func
}
AbstractSelector.defaultProps = {
  label: '',
  labelSize: 'normal',
  multiple: true,
  allowSelectAll: false,
  disableLabel: false,
  selectedValues: [],
  values: [],
  onSelect: (value) => (value)
}

export default CSSModules(AbstractSelector, styles)
