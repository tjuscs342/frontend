import { injectReducer } from 'SRC/reducer.js'

export default (store) => (
  {
    path: 'push-promotion',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        // Asyn Injection Of Reducers
        const reducer = require('./containers/PushPromotionReducer').default
        injectReducer(store, { key: 'pushPromotion', reducer })
        cb(null, require('./containers/PushPromotion').default)
      }, 'PushPromotion')
    },
    childRoutes: [
      require('./routes/user-set/routes.js').default(store)
    ]
  }
)
