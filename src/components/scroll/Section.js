import React, { Component } from 'react'

import { encodeName } from './utils'

class Section extends Component {
  render() {
    const { name, style } = this.props
    return (
      <section id={encodeName(name)} style={style} className="height-transition">
        {this.props.children}
      </section>
    )
  }
}

Section.propTypes = {
  name: React.PropTypes.string,
  style: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ])
}

Section.defaultProps = {
  style: {}
}

export default Section
