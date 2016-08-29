import { combineReducers } from 'redux'

import pushPromotion from '../routes/push-promotion/containers/MyPushPromotionReducer'
import userProfile from '../routes/user-profile/containers/MyUserProfileReducer'

export default combineReducers({
  userProfile,
  pushPromotion
})
