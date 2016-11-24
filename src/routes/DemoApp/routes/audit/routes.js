import { injectReducer } from 'SRC/reducer.js'
export default (store) => (
  {
    path: '/audit',
    // 异步加载组件
    getComponent(location, cb) {
      // 需要时才加载 打包时命名为main
      require.ensure([], (require) => {
        const reducer = require('./containers/auditReducer.js').default
        injectReducer(store, { key: 'audit', reducer })
        cb(null, require('./containers/audit').default)
      }, 'audit')
    }
  })
