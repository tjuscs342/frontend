import { injectReducer } from 'SRC/reducer.js'
export default (store) => (
  {
    path: '/page2',
    // 异步加载组件
    getComponent(location, cb) {
      // 需要时才加载 打包时命名为main
      require.ensure([], (require) => {
        const reducer = require('./containers/Page2Reducer.js').default
        injectReducer(store, { key: 'page2', reducer })
        cb(null, require('./containers/Page2').default)
      }, 'page2')
    }
  })
