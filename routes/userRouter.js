const Router = require('express');
const router = new Router();
const controller = require('../controllers/userController');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

router.post(
  '/registration',
  [
    check('email', 'name must be longer').notEmpty(),
    check('password', 'password must be longer').isLength({ min: 4, max: 10 }),
  ],
  controller.registration
);
router.post('/login', controller.login);
router.get('/auth', authMiddleware, controller.check);

module.exports = router;
