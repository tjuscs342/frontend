export default (store) => (
  {
    path: 'user-profile',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./containers/MyUserProfile').default)
      }, 'MyDataSet')
    }
  }
)
