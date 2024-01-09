const Router = require('express');
const router = new Router();
const controller = require('../controllers/basketDeviceController');

router.post('/', controller.create);
router.get('/', controller.getAll);

module.exports = router;
