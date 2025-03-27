import bcrypt from 'bcrypt';

import UserModel from '../models/user.model.js';
import generateJWTToken from '../utils/generateToken.js';
import cloudinary from '../utils/cloudinary.js';

async function signup(req, res) {
  const { fullName, email, password } = req.body;

  try {
    // check if all fields are provided
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required ' });
    }
    // check password length
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    // check if user exists
    const user = await UserModel.findOne({ email });
    if (user) {
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

    if (newUser) {
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
    else {
      return res.status(400).json({ message: 'Invalid user data' });
    }
  }
  catch (err) {
    console.error(`Error in signup controller ${err.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    // check if user exists
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // generate a jwt token
    generateJWTToken(user._id, user.email, res);

    return res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      message: 'Logged in successfully'
    });
  }
  catch (err) {
    console.error(`Error in login controller ${err.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function logout(req, res) {
  try {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out successfully' });
  } 
  catch (err) {
    console.error(`Error in logout controller ${err.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateProfile(req, res) {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if(!profilePic) {
      return res.status(400).json({ message: 'Profile picture is required' });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await UserModel.findByIdAndUpdate(userId, {
      profilePic: uploadResponse.secure_url
    }, { new: true });

    res.status(200).send(updatedUser);
  } 
  catch (err) {
    console.error(`Error in updateProfile controller ${err.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function checkAuth(req, res) {
  try {
    return res.status(200).json(req.user);
  } 
  catch (err) {
    console.error(`Error in checkAuth controller ${err.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
}


export {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth
};