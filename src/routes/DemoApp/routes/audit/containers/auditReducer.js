import Immutable from 'immutable'
const initialState = Immutable.fromJS({
  table: []
})

/* eslint-disable no-unused-vars, arrow-body-style */
const reducerMap = {
  'AUDIT@LOAD_TABLE': (state, action) => {
    return state.set('table', Immutable.fromJS(action.value))
  },
  'AUDIT@INIT': (state, action) => {
    return state.set('table', Immutable.fromJS([]))
  }
}


export default function (state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}
