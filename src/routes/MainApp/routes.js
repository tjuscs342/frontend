import { injectReducer } from 'SRC/reducer.js'

export default (store) => (
  {
    path: '/demo',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        // Asyn Injection Of Reducers
        const reducer = require('./containers/baseReducer').default
        injectReducer(store, { key: 'base', reducer })
        cb(null, require('./containers/base').default)
      }, 'main')
    },
    childRoutes: [
      require('./routes/home/routes.js').default
      // require('./routes/user-profile/routes.js').default(store),
      // require('./routes/my-data-set/routes.js').default(store),
      // require('./routes/push-promotion/routes.js').default(store)
    ]
  })
