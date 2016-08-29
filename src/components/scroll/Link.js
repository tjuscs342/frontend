import React, { Component } from 'react'

import { scrollTo } from './utils'

class Link extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    scrollTo(this.props.to, this.props.wrapper)
  }
  render() {
    return (
      <label onClick={this.handleClick} style={this.props.style}>
        {this.props.children}
      </label>
    )
  }
}

Link.propTypes = {
  wrapper: React.PropTypes.string,
  style: React.PropTypes.object,
  to: React.PropTypes.string,
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ])
}

Link.defaultProps = {
  style: {
    display: 'inline-block',
    width: '100%',
    height: '100%'
  }
}

export default Link
