import React, { Component } from 'react'

// const _row = require('antd/lib/row')
// const _col = require('antd/lib/col')
const _button = require('antd/lib/button')
const ButtonGroup = _button.Group

import CSSModules from 'react-css-modules'
import styles from './ChainRelationSelector.css'

class ChainRealtionSelector extends Component {
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
    this.setState({
      selectedItemsMap: new Map()
    })
    this.props.onSelect([])
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
    const { label, values } = this.props
    const { selectedItemsMap } = this.state
    return (
      <div className="fix-left-column-wrapper" styleName="container">
        <div className="fix-left-column text-center" style={{ width: '50px' }}>{`${label}`}</div>
        <ButtonGroup styleName="btn-group">
          {
            values.map((el) => (
              <div
                className="btn-theme1 fs12"
                styleName={selectedItemsMap.has(el.key) ? 'btn-active' : 'btn '}
                key={el.key}
                onClick={this.handleSelect.bind(null, el)}
                >
                {`${el.name}`}
              </div>
            ))
          }
        </ButtonGroup>
      </div>
    )
  }
}

ChainRealtionSelector.propTypes = {
  label: React.PropTypes.string,
  multiple: React.PropTypes.bool,
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
ChainRealtionSelector.defaultProps = {
  label: '',
  multiple: true,
  disableLabel: false,
  selectedValues: [],
  values: [],
  onSelect: (value) => (value)
}

export default CSSModules(ChainRealtionSelector, styles)
