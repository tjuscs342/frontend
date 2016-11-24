import { injectReducer } from 'SRC/reducer.js'

export default (store) => (
  {
    path: '/',
    // 异步加载组件
    getComponent(location, cb) {
      // 需要时才加载 打包时命名为main
      require.ensure([], (require) => {
        // Asyn Injection Of Reducers
        const reducer = require('./containers/baseReducer').default
        injectReducer(store, { key: 'base', reducer })
        cb(null, require('./containers/base').default)
      }, 'base')
    },
    childRoutes: [
      require('./routes/ask/routes.js').default(store),
      require('./routes/audit/routes.js').default(store),
      require('./routes/details/routes.js').default(store),
      require('./routes/me/routes.js').default(store),
      require('./routes/history/routes.js').default(store)
    ]
  })
