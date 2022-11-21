/*
 * TODO ROUTES:
 * host + /api/todos
 */

import express from'express';
import { check } from 'express-validator';
const router = express.Router();

import  { validateJWT } from '../middlewares/jwt-validator';
import { validateFields } from '../middlewares/field-validator';
import { isDate } from '../helpers/isDate';
import { getTodos, getTodo, createTodo, updateTodo, removeTodo } from '../controllers/todos';

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

export default router;
    

