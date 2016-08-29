export default () => (
  {
    path: '/page3',
    // 异步加载组件
    getComponent(location, cb) {
      // 需要时才加载 打包时命名为main
      require.ensure([], (require) => {
        cb(null, require('./containers/Page3').default)
      }, 'page3')
    }
  })
