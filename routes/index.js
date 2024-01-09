const Router = require('express');
const router = new Router();
const deviceRouter = require('./deviceRouter');
const userRouter = require('./userRouter');
const typeRouter = require('./typeRouter');
const brandRouter = require('./brandRouter');
const basketDeviceRouter = require('./basketDeviceRouter');

router.use('/user', userRouter);
router.use('/basket', basketDeviceRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);

module.exports = router;
