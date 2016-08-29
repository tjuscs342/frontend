export default (store) => (
  {
    path: 'report/:reportType',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./containers/ProfileReport').default)
      }, 'ProfileReport')
    }
  }
)
