const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied' });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
        next();
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = auth;
