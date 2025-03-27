import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

async function protectedRoute(req, res, next) {
  try {
    const token = req.cookies.token;
    if(!token) {
      return res.status(401).json({ message: 'Unauthorized - No Token Provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded) {
      return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
    }

    const user = await UserModel.findById(decoded.userId).select('-password');
    if(!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } 
  catch (err) {
    console.error(`Error in protectedRoute middleware ${err.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default protectedRoute;