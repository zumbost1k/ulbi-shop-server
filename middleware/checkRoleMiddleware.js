const jwt = require('jsonwebtoken');

module.exports = (role) => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1]; //Bearer fasfasfsdg
      if (!token) {
        res.status(401).json({ message: 'user nonauthorized' });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        res.status(403).json({ message: 'no access to method' });
      }
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'user nonauthorized' });
    }
  };
};
