import { combineReducers } from 'redux'

import extract from '../routes/extract/containers/ExtractUserSetReducer'
import upload from '../routes/upload/containers/UploadUserSetReducer'

export default combineReducers({
  extract,
  upload
})
