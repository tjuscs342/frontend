const createRootRoutes = (store) => ({
  component: '',
  childRoutes: [
    // (require('SRC/routes/MainApp/routes.js').default)(store),
    (require('SRC/routes/DemoApp/routes.js').default)(store)
  ]
})

export default createRootRoutes
