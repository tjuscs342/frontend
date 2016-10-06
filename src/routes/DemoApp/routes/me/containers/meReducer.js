import Immutable from 'immutable'
const initialState = Immutable.fromJS({
  userInfo: {}
})

/* eslint-disable no-unused-vars, arrow-body-style */
const reducerMap = {
  'ME@LOAD_USER_INFO': (state, action) => {
    return state.set('userInfo', Immutable.fromJS(action.value.data))
  }
}


export default function (state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}
