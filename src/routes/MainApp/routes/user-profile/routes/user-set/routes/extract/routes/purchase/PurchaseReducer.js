// Reducer Path: userProfile.form.purchaseProperties

import Immutable from 'immutable'
import { formConfig } from 'SRC/configs/user-set-form-config'
import { getInitialEmptyStoreFromConfig, setFormStore, deleteFormStore } from 'SRC/configs/user-set-form-config-parser'

const purchasePropertiesConfig = formConfig.purchaseProperties
const { initialFrom, emptyForm } = getInitialEmptyStoreFromConfig(purchasePropertiesConfig)

const initialState = Immutable.Map().merge(initialFrom)

/* eslint-disable no-param-reassign, arrow-body-style, no-unused-vars*/
const reducerMap = {
  'USER_PROFILE@FORM_CONFIG': (state, action) => {
    if (action.formCategory !== 'purchaseProperties') return state
    switch (action.formKey) {
      case 'purchaseAbility':
        if (action.data.result) {
          state = state.update('formConfig', Immutable.Map(), (oldValue) => (
            oldValue.set(action.api, Immutable.fromJS(action.data.result))
                    .set('purchaseAbilityKeyMap', Immutable.Map(action.data.result.map(x => (
                      [x.key, x.name]
                    ))))
          ))
        }
        break
      default:
    }
    return state
  },
  'USER_PROFILE@FORM_SET': (state, action) => {
    if (action.formCategory !== 'purchaseProperties') return state
    const displayType = purchasePropertiesConfig[action.formKey].displayType
    if (setFormStore[displayType]) {
      state = setFormStore[displayType](state, action, purchasePropertiesConfig)
    }
    // customized Setting
    if (action.formKey === 'purchaseAbility') {
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
  'USER_PROFILE@FORM_DELETE': (state, action) => {
    if (action.formCategory !== 'purchaseProperties') return state
    if (!action.formKey) { // Clear Whole Form
      return state.merge(emptyForm)
    }
    const displayType = purchasePropertiesConfig[action.formKey].displayType
    if (deleteFormStore[displayType]) {
      state = deleteFormStore[displayType](state, action, purchasePropertiesConfig)
    }
    // customized Delete
    if (action.formKey === 'purchaseAbility') {
      state = state.update(action.formKey, (oldDict) => (
        oldDict.delete(action.values)
      ))
    }
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
