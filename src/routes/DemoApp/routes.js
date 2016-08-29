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
      }, 'main')
    },
    childRoutes: [
      require('./routes/home/routes.js').default(store),
      require('./routes/page2/routes.js').default(store),
      require('./routes/page3/routes.js').default(store),
      require('./routes/page4/routes.js').default(store)
    ]
  })
