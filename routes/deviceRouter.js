const Router = require('express');
const router = new Router();
const controller = require('../controllers/deviceController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);

module.exports = router;
