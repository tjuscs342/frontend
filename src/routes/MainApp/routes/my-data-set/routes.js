import { injectReducer } from 'SRC/reducer.js'

export default (store) => (
  {
    path: 'my-data-set',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        // Asyn Injection Of Reducers
        const reducer = require('./containers/MyDataSetReducer').default
        injectReducer(store, { key: 'myDataSet', reducer })
        cb(null, require('./containers/MyDataSet').default)
      }, 'MyDataSet')
    },
    childRoutes: [
      require('./routes/user-profile/routes.js').default(store),
      require('./routes/push-promotion/routes.js').default(store)
    ]
  }
)
