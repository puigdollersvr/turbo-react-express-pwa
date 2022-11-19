/*
 * TODO ROUTES:
 * host + /api/todos
 */
namespace TodosRoutes {
    const { Router } = require('express');
    const { check } = require('express-validator');
    const router = Router();
    const { validateJWT } = require('../middlewares/jwt-validator');
    const { validateFields } = require('../middlewares/field-validator');
    const { isDate } = require('../helpers/isDate');
    const { getTodos, getTodo, createTodo, updateTodo, removeTodo } = require('../controllers/todos')

    router.use( validateJWT );
    
    router.post(
        '/', [
            check('title', 'The title is required').not().isEmpty(),
            check('start', 'Start date: Incorrect format').custom(isDate),
            validateFields
        ], createTodo
    );
    router.get(
        '/', getTodos
    );
    router.get(
        '/:id', getTodo
    );
    router.put(
        '/:id', updateTodo
    );
    router.delete(
        '/:id', removeTodo
    );
    
    module.exports = router;
}
