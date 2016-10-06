import { injectReducer } from 'SRC/reducer.js'
export default (store) => (
  {
    path: '/history',
    // 异步加载组件
    getComponent(location, cb) {
      // 需要时才加载 打包时命名为main
      require.ensure([], (require) => {
        const reducer = require('./containers/historyReducer.js').default
        injectReducer(store, { key: 'history', reducer })
        cb(null, require('./containers/history').default)
      }, 'history')
    }
  })
