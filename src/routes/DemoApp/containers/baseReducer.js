import Immutable from 'immutable'
const initialState = Immutable.fromJS({
  isShowLogin: false,
  isLogining: false,
  msg: '',
  error: false,
  success: false
})

/* eslint-disable no-unused-vars, arrow-body-style */
const reducerMap = {
  'BASE@SET_VISIBLE': (state, action) => {
    return state.update('isShowLogin', (oldData) => Immutable.fromJS(!oldData))
  },
  'BASE@LOGIN_DONE': (state, action) => {
    return state.set('isLogining', Immutable.fromJS(false))
                .set('success', Immutable.fromJS(action.result.success || false))
                .set('error', Immutable.fromJS(action.result.error || false))
                .set('isShowLogin', Immutable.fromJS(false))
  },
  'BASE@LOGIN_WAITING': (state, action) => {
    return state.set('isLogining', Immutable.fromJS(true))
                .set('success', Immutable.fromJS(false))
                .set('error', Immutable.fromJS(false))
  },
  'BASE@LOGOUT': (state, action) => {
    return state.set('success', Immutable.fromJS(true))
  },
  'BASE@CLEAR_MODAL': (state, action) => {
    return state.set('success', Immutable.fromJS(false))
                .set('error', Immutable.fromJS(false))
  }
}


export default function (state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}
