const { v4 } = require('uuid');
const path = require('path');
const { Device, DeviceInfo } = require('../models/models');

class DeviceController {
  async create(req, res) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        info,
        img: fileName,
      });
      if (info) {
        info = JSON.parse(info);
        info.forEach((i) => {
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          });
        });
      }

      return res.json(device);
    } catch (error) {
      res.status(404).json({ message: 'create device error' });
    }
  }
  async getAll(req, res) {
    try {
      let { brandId, typeId, limit, page } = req.query;
      page = page || 1;
      limit = limit || 3;
      let offset = page * limit - limit;
      let devices;
      if (!brandId && !typeId) {
        devices = await Device.findAndCountAll({ limit, offset });
      }
      if (brandId && !typeId) {
        devices = await Device.findAndCountAll({
          where: { brandId },
          limit,
          offset,
        });
      }
      if (!brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { typeId },
          limit,
          offset,
        });
      }
      if (brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { typeId, brandId },
          limit,
          offset,
        });
      }
      return res.json(devices);
    } catch (error) {
      return res.status(404).json({ message: 'get all devices error' });
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: 'info' }],
      });
      return res.json(device);
    } catch (error) {
      return res.status(404).json({ message: 'undefined id' });
    }
  }
}

module.exports = new DeviceController();
