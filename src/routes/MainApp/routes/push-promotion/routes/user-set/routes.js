// import { injectReducer } from 'SRC/reducer.js'

export default (store) => ( // eslint-disable-line no-unused-vars
  {
    path: 'user-set',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./containers/ProfileUserSet').default)
      }, 'PushPromotion')
    },
    childRoutes: [
      require('./routes/extract/routes.js').default(store),
      require('./routes/upload/routes.js').default(store)
    ]
  }
)
