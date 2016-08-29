export default (store) => (
  {
    path: 'push-promotion',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./containers/MyPushPromotion').default)
      }, 'MyDataSet')
    }
  }
)
