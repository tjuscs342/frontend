import React, { Component } from 'react'

const _input = require('antd/lib/input')
const InputGroup = _input.Group
const _button = require('antd/lib/button')

import CSSModules from 'react-css-modules'
import styles from './style.css'

class SearchInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      focus: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFocusBlur = this.handleFocusBlur.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  handleInputChange(e) {
    this.setState({
      value: e.target.value
    })
  }
  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement
    })
  }
  handleSearch() {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.value)
    }
  }
  render() {
    const { style, placeholder } = this.props
    const { focus, value } = this.state
    return (
      <div style={style}>
        <div styleName="search">
          <div
            className="full"
            styleName="search-input"
            >
            <_input
              placeholder={placeholder}
              value={value}
              onChange={this.handleInputChange}
              onFocus={this.handleFocusBlur}
              onBlur={this.handleFocusBlur}
              onPressEnter={this.handleSearch}
              style={{ borderRadius: '3px', height: '100%', width: '100%' }}
              />
          </div>
          <div
            className={`inline full-height ${!!value.trim() ? 'btn-theme10' : ''}`}
            styleName="search-btn"
            onClick={this.handleSearch}
            >
            <i className="fa fa-search fs16 vertical-center" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    )
  }
}

SearchInput.propTypes = {
  style: React.PropTypes.object,
  placeholder: React.PropTypes.string,
  onSearch: React.PropTypes.func
}
SearchInput.defaultProps = {
  style: { width: '100%' },
  placeholder: '请输入...',
  onSearch: (value) => (value)
}

export default CSSModules(SearchInput, styles)
