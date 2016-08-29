import { combineReducers } from 'redux'
import Immutable from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'

import userSet from '../routes/user-set/containers/ProfileUserSetReducer'

const initialState = Immutable.fromJS({
  pathname: ''
})

const reducerMap = {
  [LOCATION_CHANGE]: (state, action) => (state.set('pathname', action.payload.pathname))
}

const pushPromotionGeneral = (state = initialState, action) => {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}

export default combineReducers({
  pushPromotionGeneral,
  userSet
})
