// Reducer Path: userProfile.form.basicProperties

import Immutable from 'immutable'
import { combineReducers } from 'redux'

import basicProperties from '../routes/basic/BasicReducer'
import boundProperties from '../routes/bound/BoundReducer'
import deviceProperties from '../routes/device/DeviceReducer'
import interestProperties from '../routes/interest/InterestReducer'
import purchaseProperties from '../routes/purchase/PurchaseReducer'
import regionProperties from '../routes/region/RegionReducer'
import keywords from '../routes/keyword/KeywordReducer'
import scenarios from '../routes/scenario/ScenarioReducer'

const initialState = Immutable.fromJS({
  name: '',
  count: null,
  submitStatus: null,
  userSetId: null,
  userSetSize: 0,
  lastUpdate: new Date().getTime()
})

/* eslint-disable arrow-body-style, no-unused-vars, no-param-reassign*/
const reducerMap = {
  'PUSH_PROMOTION@FORM_SET': (state, action) => {
    state = state.set('lastUpdate', action.timestamp)
    if (action.formCategory !== 'extractUserSet') return state
    return state.set(action.formKey, Immutable.fromJS(action.values))
  },
  'PUSH_PROMOTION@FORM_DELETE': (state, action) => {
    return state.set('lastUpdate', action.timestamp)
  },
  'PUSH_PROMOTION@PRE_SUBMIT': (state, action) => {
    return state.set('count', action.data.result)
  },
  'PUSH_PROMOTION@USER_SET_SIZE_LOADING': (state, action) => {
    return state.set('userSetSize', null)
  },
  'PUSH_PROMOTION@USER_SET_SIZE': (state, action) => {
    if (action.data.status === 'succ') {
      state = state.set('userSetSize', action.data.result)
    }
    return state
  },
  'PUSH_PROMOTION@CLEAR_SUBMIT': (state, action) => {
    return state.set('count', null)
                .set('submitStatus', null)
                .set('userSetId', null)
  },
  'PUSH_PROMOTION@SUBMIT': (state, action) => {
    return state.set('submitStatus', action.status)
                .set('userSetId', action.id)
  },
  'PUSH_PROMOTION@FORM_RESET': (state, action) => {
    state = state.set('lastUpdate', action.timestamp)
    return state.merge(initialState)
  },
  'PUSH_PROMOTION@FORM_CLEAR': (state, action) => {
    state = state.set('lastUpdate', action.timestamp)
    return state.merge(initialState)
  }
}

const general = (state = initialState, action) => {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}

export default combineReducers({
  general,
  scenarios,
  basicProperties,
  regionProperties,
  boundProperties,
  deviceProperties,
  interestProperties,
  purchaseProperties,
  keywords
})
