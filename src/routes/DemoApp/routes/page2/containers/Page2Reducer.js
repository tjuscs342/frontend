import Immutable from 'immutable'
const initialState = Immutable.fromJS({
  table: []
})

/* eslint-disable no-unused-vars, arrow-body-style */
const reducerMap = {

}


export default function (state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}
