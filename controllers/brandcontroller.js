const { Brand } = require('../models/models');
class BrandController {
  async create(req, res) {
    try {
      const { name } = req.body;
      //create a new brand by name
      const brand = await Brand.create({ name });
      //return in
      return res.json(brand);
    } catch (error) {
      res.status(404).json({ message: 'create brand error' });
    }
  }
  async getAll(req, res) {
    try {
      //get all brand from bd
      const brands = await Brand.findAll();
      //return brands with the res
      return res.json(brands);
    } catch (error) {
      res.status(404).json({ message: 'get all brends error' });
    }
  }
}

module.exports = new BrandController();
