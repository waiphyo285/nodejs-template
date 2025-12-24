
/* start generator api */
const routes = require('./generator')
router
    .get('/routings', routes.find)
    .get('/routing', routes.findBy)
    .get('/routing/:id', routes.findById)
    .post('/routing', routes.create)
    .put('/routing/:id', routes.update)
    .delete('/routing/:id', routes.drop)
/* end generator api */
