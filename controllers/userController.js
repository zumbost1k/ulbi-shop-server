const ApiError = require('../error/apiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models/models');
const { validationResult } = require('express-validator');

const generateJWT = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

class UserController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      //if errors not empty return error
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Registration error' });
      }
      const { email, password, role } = req.body;

      const candidat = await User.findOne({ where: { email } });

      if (candidat) {
        return res.status(400).json({ message: 'this email already in used' });
      }
      const hashPassword = await bcrypt.hash(password, 7);
      const user = await User.create({ email, role, password: hashPassword });
      const basket = await Basket.create({ userId: user.id });
      const userJwt = generateJWT(user.id, user.email, user.role);
      return res.json({ userJwt });
    } catch (error) {
      return res.status(404).json({ message: 'registration error' });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'invalid email' });
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return res.status(404).json({ message: 'invalid password' });
      }
      const token = generateJWT(user.id, email, user.role);
      res.json({ token });
    } catch (error) {
      return res.status(404).json({ message: 'login error' });
    }
  }
  async check(req, res, next) {
    const token = generateJWT(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = new UserController();
