// Reducer Path: userProfile.form.keywords

import Immutable from 'immutable'
import { formConfig } from 'SRC/configs/user-set-form-config'
import { getInitialEmptyStoreFromConfig, setFormStore, deleteFormStore } from 'SRC/configs/user-set-form-config-parser'

const keywordsConfig = formConfig.keywords
const { initialFrom, emptyForm } = getInitialEmptyStoreFromConfig(keywordsConfig)

const initialState = Immutable.Map().merge(initialFrom)

/* eslint-disable no-param-reassign, arrow-body-style, no-unused-vars*/
const reducerMap = {
  'USER_PROFILE@FORM_SET': (state, action) => {
    if (action.formCategory !== 'keywords') return state
    const displayType = keywordsConfig[action.formKey].displayType
    // Normal Setting
    if (setFormStore[displayType]) {
      state = setFormStore[displayType](state, action, keywordsConfig, emptyForm)
    }
    // customized Setting
    return state
  },
  'USER_PROFILE@FORM_DELETE': (state, action) => {
    if (action.formCategory !== 'keywords') return state
    if (!action.formKey) { // Clear Whole Form
      return state.merge(emptyForm)
    }
    const displayType = keywordsConfig[action.formKey].displayType
    // Normal Deletion
    if (deleteFormStore[displayType]) {
      state = deleteFormStore[displayType](state, action, keywordsConfig, emptyForm)
    }
    // Customized Deletion
    return state
  },
  'USER_PROFILE@FORM_RESET': (state, action) => {
    return state.merge(initialFrom)
  },
  'USER_PROFILE@FORM_CLEAR': (state, action) => {
    return state.merge(emptyForm)
  }
}

export default function (state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}
