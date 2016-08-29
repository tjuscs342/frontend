import Immutable from 'immutable'
const initialState = Immutable.fromJS({
  isShowMsgBoard: false,
  isSubmitLoading: false,
  msg: '',
  error: false,
  success: false
})

/* eslint-disable no-unused-vars, arrow-body-style */
const reducerMap = {
  'BASE@SET_MSG_BOARD': (state, action) => {
    return state.update('isShowMsgBoard', (oldData) => Immutable.fromJS(!oldData))
  },
  'BASE@MSG_SUBMIT_DONE': (state, action) => {
    return state.set('isSubmitLoading', Immutable.fromJS(false))
                .set('success', Immutable.fromJS(action.result.success || false))
                .set('error', Immutable.fromJS(action.result.error || false))
                .set('isShowMsgBoard', Immutable.fromJS(false))
  },
  'BASE@MSG_SUBMIT_WAITING': (state, action) => {
    return state.set('isSubmitLoading', Immutable.fromJS(true))
                .set('success', Immutable.fromJS(false))
                .set('error', Immutable.fromJS(false))
  }
}


export default function (state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}
