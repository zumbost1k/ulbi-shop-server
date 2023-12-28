const Router = require('express');
const router = new Router();
const controller = require('../controllers/brandcontroller');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), controller.create);
router.get('/', controller.getAll);

module.exports = router;
