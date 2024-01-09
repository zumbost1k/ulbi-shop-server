const { BasketDevice, Basket, Device } = require('../models/models');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
class BasketDeviceController {
  async create(req, res) {
    try {
      let { deviceId } = req.body;

      const token = req.headers.authorization.split(' ')[1]; //Bearer fasfasfsdg
      if (!token) {
        return res.status(401).json({ message: 'user nonauthorized' });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      const currentUserBasket = await Basket.findOne({
        where: { userId: decoded.id },
      });
      if (!currentUserBasket) {
        return res.status(401).json({ message: 'user nonauthorized' });
      }
      const candidatDevice = await BasketDevice.findOne({
        where: { basketId: currentUserBasket.id, deviceId },
      });
      if (candidatDevice) {
        return res
          .status(401)
          .json({ message: 'this device already in basket' });
      }
      const newBasketDevice = await BasketDevice.create({
        deviceId,
        basketId: currentUserBasket.id,
      });

      return res.json(newBasketDevice);
    } catch (error) {
      return res.status(404).json({ message: 'create bascket device error' });
    }
  }
  async getAll(req, res) {
    try {
      //get user token from header
      const token = req.headers.authorization.split(' ')[1]; //Bearer fasfasfsdg
      if (!token) {
        return res.status(401).json({ message: 'user nonauthorized' });
      }
      //decode it
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      //find a busket id with userId from decoded variable
      const currentUserBasket = await Basket.findOne({
        where: { userId: decoded.id },
      });
      //find all devices from BasketDevice with currentUserBasket.id
      const devicesInBusket = await BasketDevice.findAll({
        where: { basketId: currentUserBasket.id },
      });
      //take only an id from devicesInBusket
      const deviceIds = devicesInBusket.map((item) => item.deviceId);
      //find all devices in device by id in device table
      const devices = await Device.findAll({
        where: {
          id: {
            [Op.in]: deviceIds,
          },
        },
      });
      //return it to user
      return res.json(devices);
    } catch (error) {
      return res
        .status(404)
        .json({ message: 'get all devices from basket error' });
    }
  }
}

module.exports = new BasketDeviceController();
