// Reducer Path: userProfile.upload

import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  name: '',
  path: '',
  file: null,
  progressBar: {
    progress: 0,
    status: 'active',
    isHide: true
  },
  activeTag: {
    upload: true,
    hdfsPath: false
  }
})

const progressStatusMap = new Map([
  ['uploading', 'active'],
  ['done', 'success'],
  ['error', 'exception']
])

/* eslint-disable arrow-body-style, no-unused-vars*/
const reducerMap = {
  'USER_PROFILE@UPLOAD@FORM_SET': (state, action) => {
    if (action.formCategory !== 'uploadUserSet') return state
    return state.set(action.formKey, Immutable.fromJS(action.values))
  },
  'USER_PROFILE@UPLOAD@UPDATE_PROGRESS': (state, action) => {
    return state.set('progressBar', Immutable.fromJS({
      progress: action.progress,
      status: action.status === 100 ? 'success' : progressStatusMap.get(action.status),
      isHide: action.isHide
    }))
  },
  'USER_PROFILE@UPLOAD@CHANGE_TAG': (state, action) => {
    return state.set('activeTag', Immutable.fromJS({
      upload: action.tagName === 'upload',
      hdfsPath: action.tagName === 'hdfsPath'
    }))
  }
}

export default function (state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}
