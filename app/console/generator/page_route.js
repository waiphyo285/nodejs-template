
/* start generator page */
const routes = require('./generator')
router
    .get('/routings', checkAuth, routes.list)
    .get('/routing/:id?', checkAuth, routes.entry)
    .post('/routing', routes.create)
    .put('/routing/:id?', routes.update)
/* end generator page */
