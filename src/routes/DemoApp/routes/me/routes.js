import { injectReducer } from 'SRC/reducer.js'
export default (store) => (
  {
    path: '/me',
    // 异步加载组件
    getComponent(location, cb) {
      // 需要时才加载 打包时命名为main
      require.ensure([], (require) => {
        const reducer = require('./containers/meReducer.js').default
        injectReducer(store, { key: 'me', reducer })
        cb(null, require('./containers/me').default)
      }, 'me')
    }
  })
