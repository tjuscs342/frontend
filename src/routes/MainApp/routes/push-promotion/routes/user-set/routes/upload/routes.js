import { injectReducer } from 'SRC/reducer.js'

export default (store) => (
  {
    path: 'upload',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./containers/UploadUserSet').default)
      }, 'UserProfile')
    }
  }
)
