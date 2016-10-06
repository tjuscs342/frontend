/* vim: set filetype=javascript.jsx */
import React, { PropTypes, Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Page2.css'
import * as page2Action from './Page2Action.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Page2 extends Component {
  render() {
    return (
      <div>
        page2
      </div>
    )
  }
}

function mapState(state) {
  return {
    state: state.page2.toJS()
  }
}
function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(page2Action, dispatch)
  }
}

export default connect(mapState, mapDispatch)(CSSModules(Page2, styles))
