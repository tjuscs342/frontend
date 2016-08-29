// import { injectReducer } from 'SRC/reducer.js'

export default (store) => ( // eslint-disable-line no-unused-vars
  {
    path: 'extract',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./containers/ExtractUserSet').default)
      }, 'UserProfile')
    },
    childRoutes: [
      {
        path: 'scenario',
        getComponent(location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/scenario/Scenario').default)
          }, 'UserProfile')
        }
      }, {
        path: 'basic',
        getComponent(location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/basic/Basic').default)
          }, 'UserProfile')
        }
      }, {
        path: 'region',
        getComponent(location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/region/Region').default)
          }, 'UserProfile')
        }
      }, {
        path: 'bound',
        getComponent(location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/bound/Bound').default)
          }, 'UserProfile')
        }
      }, {
        path: 'device',
        getComponent(location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/device/Device').default)
          }, 'UserProfile')
        }
      }, {
        path: 'interest',
        getComponent(location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/interest/Interest').default)
          }, 'UserProfile')
        }
      }, {
        path: 'purchase',
        getComponent(location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/purchase/Purchase').default)
          }, 'UserProfile')
        }
      }, {
        path: 'keyword',
        getComponent(location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/keyword/Keyword').default)
          }, 'UserProfile')
        }
      }
    ]
  }
)
