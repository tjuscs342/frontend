/* vim: set filetype=javascript.jsx */
import React, { PropTypes, Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Page2.css'

class Page2 extends Component {
  render() {
    return (
      <div>
        page2
      </div>
    )
  }
}

export default CSSModules(Page2, styles)
