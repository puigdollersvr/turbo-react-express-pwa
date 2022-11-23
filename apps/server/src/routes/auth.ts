/*
 * AUTH ROUTES:
 * host + /api/auth
 */
import express from'express';
import { check } from 'express-validator';
const router = express.Router();

import { createUser, loginUser, revalidateToken } from '../controllers/auth';
import { validateFields } from '../middlewares/field-validator';
import { validateJWT } from '../middlewares/jwt-validator';

router.post(
  '/',
  [ //middlewares
    check('email', 'Mail is required and must be valid').isEmail(),
    check('password', 'Password is required and must have at least 6 chars').isLength({min:6}),
    validateFields
  ], 
  loginUser
);

router.post(
  '/new', [ //middlewares
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Mail is required and must be valid').isEmail(),
    check('password', 'Password is required and must have at least 6 chars').isLength({min:6}),
    validateFields
  ], 
  createUser
);

router.get(
  '/revalidate', validateJWT, revalidateToken
);

export default router;