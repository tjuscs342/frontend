export default () => (
  {
    path: '/home',
    // 异步加载组件
    getComponent(location, cb) {
      // 需要时才加载 打包时命名为main
      require.ensure([], (require) => {
        cb(null, require('./containers/Home').default)
      }, 'home')
    }
  })
