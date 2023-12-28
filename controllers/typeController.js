const { Type } = require('../models/models');

class TypeController {
  async create(req, res) {
    try {
      const { name } = req.body;
      //create a new type by name
      const type = await Type.create({ name });
      //return in
      return res.json(type);
    } catch (error) {
      res.status(404).json({ message: 'type create error' });
    }
  }
  async getAll(req, res) {
    try {
      //get all types from bd
      const types = await Type.findAll()
      //return types with the res
      return res.json(types)
    } catch (error) {
      res.status(404).json({ message: 'type gel all error' });
    }
  }
}

module.exports = new TypeController();
