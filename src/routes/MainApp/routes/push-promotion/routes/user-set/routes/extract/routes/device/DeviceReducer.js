// Reducer Path: userProfile.form.deviceProperties

import Immutable from 'immutable'
import { formConfig } from 'SRC/configs/user-set-form-config'
import { getInitialEmptyStoreFromConfig, setFormStore, deleteFormStore } from 'SRC/configs/user-set-form-config-parser'
import { getReadableNumber } from 'SRC/utils/utils'

const devicePropertiesConfig = formConfig.deviceProperties
const { initialFrom, emptyForm } = getInitialEmptyStoreFromConfig(devicePropertiesConfig)

const initialState = Immutable.Map().merge(initialFrom)

/* eslint-disable no-param-reassign, arrow-body-style, no-unused-vars*/
const reducerMap = {
  'PUSH_PROMOTION@FORM_CONFIG': (state, action) => {
    if (action.formCategory !== 'deviceProperties') return state
    state = state.update('formConfig', Immutable.Map(), (oldValue) => (
      oldValue.set(action.api, Immutable.fromJS(
        action.data.result.map(x => {
          x.name = `${x.name}(${getReadableNumber(x.count)}人)`
          return x
        }))
      )
    ))
    return state
  },
  'PUSH_PROMOTION@FORM_SET': (state, action) => {
    if (action.formCategory !== 'deviceProperties') return state
    // Normal Setting
    const displayType = devicePropertiesConfig[action.formKey].displayType
    if (setFormStore[displayType]) {
      state = setFormStore[displayType](state, action, devicePropertiesConfig)
    }
    // customized Setting
    if (action.formKey === 'systemVersionDetail') {
      state = state.update(action.formKey, (oldArray) => (
        oldArray.set(action.values[0], Immutable.fromJS(action.values[1]))
      ))
    }
    return state
  },
  'PUSH_PROMOTION@FORM_DELETE': (state, action) => {
    if (action.formCategory !== 'deviceProperties') return state
    // Clear Whole Form
    if (!action.formKey) {
      return state.merge(emptyForm)
    }
    // Normal Delete
    const displayType = devicePropertiesConfig[action.formKey].displayType
    if (deleteFormStore[displayType]) {
      state = deleteFormStore[displayType](state, action, devicePropertiesConfig)
    }
    // customized Delete
    if (action.formKey === 'systemVersionDetail') {
      state = state.set(action.formKey, emptyForm.get('systemVersionDetail'))
      // state = state.update(action.formKey, (oldArray) => (
      //   oldArray.filter(x => x.get('key') !== action.values.key)
      // ))
    }
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
