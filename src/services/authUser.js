const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET


const authenticateUser = (req, res, next) => {
  // Extract the token from the session
  const token = req.session.token;
  if (!token) {
    return res.status(401).send('Not authenticated, login required');
  }
  // Verify the token
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }
    // Token is valid, proceed to the next middleware
    req.user = decoded;
    next();
  });
};

function adminMiddleware(req, res, next) {
  if (req.session.role !== "admin") {
    return res.status(403).json({ message: 'Access denied. Admin role required.' });
  }
  next();
}

/**
 //Assign role to user by admin
 const User = require('./models/user');

   async function setRole(userId, role) {
     const user = await User.findById(userId);
     user.role = role;
     await user.save();
   }
*/



module.exports = {
    authenticateUser,
    adminMiddleware,
}
