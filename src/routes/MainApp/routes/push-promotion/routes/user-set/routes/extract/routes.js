// import { injectReducer } from 'SRC/reducer.js'

export default (store) => ( // eslint-disable-line no-unused-vars
  {
    path: 'extract',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./containers/ExtractUserSet').default)
      }, 'PushPromotion')
    },
    childRoutes: [
      {
        path: 'scenario',
        getComponent(location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/scenario/Scenario').default)
          }, 'PushPromotion')
        }
      }, {
        path: 'basic',
        getComponent(location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/basic/Basic').default)
          }, 'PushPromotion')
        }
      }, {
        path: 'region',
        getComponent(location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/region/Region').default)
          }, 'PushPromotion')
        }
      }, {
        path: 'bound',
        getComponent(location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/bound/Bound').default)
          }, 'PushPromotion')
        }
      }, {
        path: 'device',
        getComponent(location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/device/Device').default)
          }, 'PushPromotion')
        }
      }, {
        path: 'interest',
        getComponent(location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/interest/Interest').default)
          }, 'PushPromotion')
        }
      }, {
        path: 'purchase',
        getComponent(location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/purchase/Purchase').default)
          }, 'PushPromotion')
        }
      }, {
        path: 'keyword',
        getComponent(location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/keyword/Keyword').default)
          }, 'PushPromotion')
        }
      }
    ]
  }
)
