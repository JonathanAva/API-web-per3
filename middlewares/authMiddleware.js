const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Asegura que el token esté en formato Bearer
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.roles;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.userRole !== 1) { 
    return res.status(403).send({ message: 'Require Admin Role!' });
  }
  next();
};

module.exports = {
  verifyToken,
  isAdmin,
};
