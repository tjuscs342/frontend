/* vim: set filetype=javascript.jsx */
import React, { PropTypes, Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Home.css'

class Home extends Component {
  render() {
    return (
      <div>
        Home page
      </div>
    )
  }
}

export default CSSModules(Home, styles)
