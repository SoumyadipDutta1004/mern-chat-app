import bcrypt from 'bcrypt';

import UserModel from '../models/user.model.js';
import generateJWTToken from '../utils/generateToken.js';

async function signup(req, res) {
  const { fullName, email, password } = req.body;
  
  try {
    // check if all fields are provided
    if(!fullName || !email || !password){
      return res.status(400).json({ message: 'All fields are required '});
    }
    // check password length
    if(password.length < 6){
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    // check if user exists
    const user = await UserModel.findOne({ email });
    if(user){
      return res.status(400).json({ message: 'Email already exists' });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // create a new user and save to database
    const newUser = await UserModel.create({
      fullName: fullName,
      email: email,
      password: hashedPassword
    });

    if(newUser){
      // generate a jwt token
      generateJWTToken(newUser._id, newUser.email, res);
      

      return res.status(201).json({ 
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
        message: 'User created successfully' 
      });
    }
    else{
      return res.status(400).json({ message: 'Invalid user data' });
    }
  } 
  catch (err) {
    console.error(`Error in signup controller ${err.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function login(req, res) {
  res.send('login route');
}

function logout(req, res) {
  res.send('logout route');
}

export {
  signup,
  login,
  logout
};