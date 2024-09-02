const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');


const authenticate = (req, res, next) => {
  const token = req.cookies['jwt'];
  console.log(token)
  

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;