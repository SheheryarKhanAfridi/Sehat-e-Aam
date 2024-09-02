const jwt = require('jsonwebtoken');

const authenticator = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Assuming the JWT contains the user's ID
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { authenticator };