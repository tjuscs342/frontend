/* vim: set filetype=javascript.jsx */
import React, { PropTypes, Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './details.css'

class details extends Component {
  render() {
    return (
      <div>
        假期详细
      </div>
    )
  }
}

export default CSSModules(details, styles)
