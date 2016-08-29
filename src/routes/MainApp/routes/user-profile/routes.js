import { injectReducer } from 'SRC/reducer.js'

export default (store) => (
  {
    path: 'user-profile',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        // Asyn Injection Of Reducers
        const reducer = require('./containers/UserProfileReducer').default
        injectReducer(store, { key: 'userProfile', reducer })
        cb(null, require('./containers/UserProfile').default)
      }, 'UserProfile')
    },
    childRoutes: [
      require('./routes/user-set/routes.js').default(store),
      require('./routes/properties/routes.js').default(store),
      require('./routes/report/routes.js').default(store)
    ]
  }
)
