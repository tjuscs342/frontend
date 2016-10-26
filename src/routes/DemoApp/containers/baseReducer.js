import Immutable from 'immutable'
import getUser from 'SRC/utils/getUser.js'
const initialState = Immutable.fromJS({
  isShowLogin: getUser().name === '',
  isLogining: false,
  msg: '',
  error: false,
  success: false,
  home: location.href.split('/').length < 6,
  isMenuShow: false,
  userName: getUser().name
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
                .set('msg', Immutable.fromJS(action.value.errorMsg || ''))
                .set('userName', Immutable.fromJS(action.result.userName || ''))
  },
  'BASE@LOGIN_WAITING': (state, action) => {
    return state.set('isLogining', Immutable.fromJS(true))
                .set('success', Immutable.fromJS(false))
                .set('error', Immutable.fromJS(false))
  },
  'BASE@LOGOUT': (state, action) => {
    return state.set('success', Immutable.fromJS(true))
                .set('home', Immutable.fromJS(true))
                .set('userName', Immutable.fromJS(''))
  },
  'BASE@CLEAR_MODAL': (state, action) => {
    return state.set('success', Immutable.fromJS(false))
                .set('error', Immutable.fromJS(false))
                .set('msg', Immutable.fromJS(''))
  },
  'BASE@GO_TO_ASK': (state, action) => {
    return state.set('home', Immutable.fromJS(false))
  },
  'BASE@SET_MENU_SHOW': (state, action) => {
    return state.set('isMenuShow', Immutable.fromJS(action.value))
  }
}


export default function (state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}
