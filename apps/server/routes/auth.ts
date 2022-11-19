/*
 * AUTH ROUTES:
 * host + /api/auth
 */
//namespace AuthRoutes {
  const { Router } = require('express');
  const { check } = require('express-validator')
  const router = Router();

  const { createUser, loginUser, revalidateToken } = require('../controllers/auth')
  const { validateFields } = require('../middlewares/field-validator');
  const { validateJWT } = require('../middlewares/jwt-validator');

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

  module.exports = router;
//}