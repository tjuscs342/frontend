// Reducer Path: userProfile.form.interestProperties

import Immutable from 'immutable'
import { formConfig } from 'SRC/configs/user-set-form-config'
import { getInitialEmptyStoreFromConfig, setFormStore, deleteFormStore } from 'SRC/configs/user-set-form-config-parser'

const interestPropertiesConfig = formConfig.interestProperties
const { initialFrom, emptyForm } = getInitialEmptyStoreFromConfig(interestPropertiesConfig)

const initialState = Immutable.Map().merge(initialFrom)

/* eslint-disable no-param-reassign, arrow-body-style, no-unused-vars*/
const reducerMap = {
  'PUSH_PROMOTION@FORM_CONFIG': (state, action) => {
    if (action.formCategory !== 'interestProperties') return state
    switch (action.formKey) {
      case 'interest':
        if (action.data.result) {
          state = state.update('formConfig', Immutable.Map(), (oldValue) => (
            oldValue.set(action.api, Immutable.fromJS(action.data.result))
                    .set('interestKeyMap', Immutable.Map(action.data.result.map(x => (
                      [x.key, x.name]
                    ))))
          ))
        }
        break
      default:
    }
    return state
  },
  'PUSH_PROMOTION@FORM_SET': (state, action) => {
    if (action.formCategory !== 'interestProperties') return state
    // Normal Setting
    const displayType = interestPropertiesConfig[action.formKey].displayType
    if (setFormStore[displayType]) {
      state = setFormStore[displayType](state, action, interestPropertiesConfig)
    }
    // customized Setting
    if (action.formKey === 'interest') {
      // const rowNameMap = state.get('formConfig').get('interestKeyMap')
      if (action.values[1].length === 0) {
        state = state.update(action.formKey, (oldDict) => (
          oldDict.delete(action.values[0])
        ))
      } else {
        action.values[1] = action.values[1].sort((a, b) => (
          a.key - b.key
        ))
        state = state.update(action.formKey, (oldDict) => (
          oldDict.set(action.values[0], Immutable.fromJS(action.values[1].map(x => (
            {
              key: x.key,
              name: x.name
            }
          ))))
        ))
      }
    }
    return state
  },
  'PUSH_PROMOTION@FORM_DELETE': (state, action) => {
    if (action.formCategory !== 'interestProperties') return state
    if (!action.formKey) { // Clear Whole Form
      return state.merge(emptyForm)
    }
    // Normal Delete
    const displayType = interestPropertiesConfig[action.formKey].displayType
    if (deleteFormStore[displayType]) {
      state = deleteFormStore[displayType](state, action, interestPropertiesConfig)
    }
    // customized Delete
    if (action.formKey === 'interest') {
      state = state.update(action.formKey, (oldDict) => (
        oldDict.delete(action.values)
      ))
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
