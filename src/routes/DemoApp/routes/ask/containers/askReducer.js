import Immutable from 'immutable'
const initialState = Immutable.fromJS({
  isSubmitLoading: false,
  isShowingModal: false,
  msg: ''
})

/* eslint-disable no-unused-vars, arrow-body-style */
const reducerMap = {
  'ASK@SUBMIT_LOADING': (state, action) => {
    return state.set('isSubmitLoading', Immutable.fromJS(true))
  },
  'ASK@SUBMIT_DONE': (state, action) => {
    return state.set('isSubmitLoading', Immutable.fromJS(false))
                .set('isShowingModal', Immutable.fromJS(true))
                .set('msg', Immutable.fromJS(action.value.status === 'success' ? 'success' : action.value.errorMsg))
  },
  'ASK@HIDDEN_MODAL': (state, action) => {
    return state.set('isShowingModal', Immutable.fromJS(false))
  }
}


export default function (state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}
