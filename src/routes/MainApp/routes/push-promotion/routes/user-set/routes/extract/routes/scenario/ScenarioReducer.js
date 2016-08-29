// Reducer Path: userProfile.form.scenarios

import Immutable from 'immutable'
import { formConfig } from 'SRC/configs/user-set-form-config'
import { getInitialEmptyStoreFromConfig, setFormStore, deleteFormStore } from 'SRC/configs/user-set-form-config-parser'
import { transformBusinessRawData } from './ScenarioService'

const scenariosConfig = formConfig.scenarios
const { initialFrom, emptyForm } = getInitialEmptyStoreFromConfig(scenariosConfig)

const initialState = Immutable.Map().merge(initialFrom)

/* eslint-disable no-param-reassign, arrow-body-style, no-unused-vars*/
const reducerMap = {
  'PUSH_PROMOTION@FORM_CONFIG': (state, action) => {
    if (action.formCategory !== 'scenarios') return state
    switch (action.formKey) {
      case 'filters':
        if (action.data.result) {
          const cascadingSelectorConfig = transformBusinessRawData(action.data.result)
          state = state.update('formConfig', (oldDict) => (
            oldDict.set('cascadingSelectorConfig', cascadingSelectorConfig) // Caution!!!!
          ))
        }
        break
      default:
    }
    return state
  },
  'PUSH_PROMOTION@FORM_SET': (state, action) => {
    if (action.formCategory !== 'scenarios') return state
    const displayType = scenariosConfig[action.formKey].displayType
    // Normal Setting
    if (setFormStore[displayType]) {
      state = setFormStore[displayType](state, action, scenariosConfig, emptyForm)
    }
    // customized Setting
    if (action.formKey === 'filters' && action.values.type === 'CHAIN_SELECTOR_UPDATE') {
      const subAction = action.values.action
      state = state.update(action.formKey, (oldStateArray) => (
        oldStateArray.update(subAction.formCategory, (oldState) => {
          switch (subAction.formKey) {
            case 'businessProfile':
            case 'dateRange':
            case 'numberRange':
            case 'keywords':
              return oldState.set(subAction.formKey, Immutable.fromJS(subAction.values))
            default:
              return oldState
          }
        })
      ))
    }
    return state
  },
  'PUSH_PROMOTION@FORM_DELETE': (state, action) => {
    if (action.formCategory !== 'scenarios') return state
    if (!action.formKey) { // Clear Whole Form
      return state.merge(emptyForm)
    }
    const displayType = scenariosConfig[action.formKey].displayType
    // Normal Deletion
    if (deleteFormStore[displayType]) {
      state = deleteFormStore[displayType](state, action, scenariosConfig, emptyForm)
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
