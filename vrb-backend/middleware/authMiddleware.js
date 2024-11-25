const jwt = require('jsonwebtoken');

// Middleware to protect routes
const protect = (req, res, next) => {
     const token = req.header('Authorization')?.split(' ')[1]; // Get the token from the Authorization header

     if (!token) {
          return res.status(401).json({ message: 'No token, authorization denied' });
     }

     try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = decoded;  // Attach user info to the request object
          next();
     } catch (err) {
          console.error(err);
          res.status(401).json({ message: 'Token is not valid' });
     }
};

module.exports = protect;
