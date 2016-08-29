import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import 'SRC/assets/style/antd.hcss'
import 'SRC/assets/style/font-awesome.hcss'
import 'SRC/assets/style/style.hcss'

import createRootRoutes from 'SRC/routes.js'

export default class App extends Component {
  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <Router
          routes={createRootRoutes(store)} history={history}
          onUpdate={() => { window.scrollTo(0, 0) }}
          />
      </Provider>
    )
  }
}

App.propTypes = {
  store: React.PropTypes.object,
  history: React.PropTypes.object
}
