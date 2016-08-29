import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import App from './app'
import configureStore from './store/configureStore'

const store = configureStore(hashHistory)
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('container')
)
