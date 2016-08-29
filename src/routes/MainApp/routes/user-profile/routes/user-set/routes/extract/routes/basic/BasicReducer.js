// Reducer Path: userProfile.form.basicProperties

import Immutable from 'immutable'
import { formConfig } from 'SRC/configs/user-set-form-config'
const basicPropertiesConfig = formConfig.basicProperties
import { getInitialEmptyStoreFromConfig, setFormStore, deleteFormStore } from 'SRC/configs/user-set-form-config-parser'

const { initialFrom, emptyForm } = getInitialEmptyStoreFromConfig(basicPropertiesConfig)

const initialState = Immutable.Map().merge(initialFrom)

/* eslint-disable arrow-body-style, no-unused-vars*/
const reducerMap = {
  'USER_PROFILE@FORM_SET': (state, action) => {
    if (action.formCategory !== 'basicProperties') return state
    const displayType = basicPropertiesConfig[action.formKey].displayType
    return setFormStore[displayType](state, action, basicPropertiesConfig)
  },
  'USER_PROFILE@FORM_DELETE': (state, action) => {
    if (action.formCategory !== 'basicProperties') return state
    if (!action.formKey) { // Clear Whole Form
      return state.merge(emptyForm)
    }
    const displayType = basicPropertiesConfig[action.formKey].displayType
    return deleteFormStore[displayType](state, action, basicPropertiesConfig)
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
