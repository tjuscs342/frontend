// import { injectReducer } from 'SRC/reducer.js'

export default (store) => ( // eslint-disable-line no-unused-vars
  {
    path: 'properties/:propertyCategory',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./containers/ProfileProperties').default)
      }, 'ProfileProperties')
    }
  }
)
