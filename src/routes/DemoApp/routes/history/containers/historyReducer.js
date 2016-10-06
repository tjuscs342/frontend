import Immutable from 'immutable'
const initialState = Immutable.fromJS({
  table: [],
  loading: false
})

/* eslint-disable no-unused-vars, arrow-body-style */
const reducerMap = {
  'HISTORY@LOAD_TABLE': (state, action) => {
    return state.set('table', Immutable.fromJS(action.value))
  },
  'HISTORY@LOADING': (state, action) => {
    return state.set('loading', Immutable.fromJS(true))
  },
  'HISTORY@LOADING_OVER': (state, action) => {
    return state.set('loading', Immutable.fromJS(false))
  }
}


export default function (state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}
