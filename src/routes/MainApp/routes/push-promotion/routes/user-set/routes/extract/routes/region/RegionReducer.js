// Reducer Path: userProfile.form.regionProperties

import Immutable from 'immutable'
import { formConfig } from 'SRC/configs/user-set-form-config'
import { getInitialEmptyStoreFromConfig, setFormStore, deleteFormStore } from 'SRC/configs/user-set-form-config-parser'

const regionPropertiesConfig = formConfig.regionProperties
const { initialFrom, emptyForm } = getInitialEmptyStoreFromConfig(regionPropertiesConfig)

const initialState = Immutable.Map().merge(initialFrom)

/* eslint-disable no-param-reassign, arrow-body-style, no-unused-vars*/
const reducerMap = {
  'PUSH_PROMOTION@FORM_SET': (state, action) => {
    if (action.formCategory !== 'regionProperties') return state
    const displayType = regionPropertiesConfig[action.formKey].displayType
    // Normal Setting
    if (setFormStore[displayType]) {
      state = setFormStore[displayType](state, action, regionPropertiesConfig)
    }
    // customized Setting
    return state
  },
  'PUSH_PROMOTION@FORM_DELETE': (state, action) => {
    if (action.formCategory !== 'regionProperties') return state
    if (!action.formKey) { // Clear Whole Form
      return state.merge(emptyForm)
    }
    const displayType = regionPropertiesConfig[action.formKey].displayType
    // Normal Deletion
    if (deleteFormStore[displayType]) {
      state = deleteFormStore[displayType](state, action, regionPropertiesConfig)
    }
    // Customized Deletion
    return state
  },
  'PUSH_PROMOTION@FORM_RESET': (state, action) => {
    return state.merge(initialFrom)
  },
  'PUSH_PROMOTION@FORM_CLEAR': (state, action) => {
    return state.merge(emptyForm)
  }
}

export default function (state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}
