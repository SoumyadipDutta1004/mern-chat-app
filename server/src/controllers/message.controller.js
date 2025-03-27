import UserModel from '../models/user.model.js';
import MessageModel from '../models/message.model.js';
import cloudinary from '../utils/cloudinary.js';

async function getUsersForSidebar(req, res) {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await UserModel.find({ _id: { $ne: loggedInUserId } }).select('-password');
    res.status(200).json({ filteredUsers });
  }
  catch (err) {
    console.error(`Error in getUsersForSidebar controller ${err.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
}
async function getMessages(req, res) {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await MessageModel.find({
      $or: [
        { sender: myId, receiver: userToChatId },
        { sender: userToChatId, receiver: myId }
      ]
    });
    res.status(200).json(messages);
  }
  catch (err) {
    console.error(`Error in getMessages controller ${err.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
}
async function sendMessage(req, res) {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    
    let imageUrl;
    if(image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = MessageModel.create({
      sender: senderId,
      receiver: receiverId,
      text: text,
      image: imageUrl
    });

    // todo: realtime functionality goes here
    
    res.status(200).json(newMessage);
  }
  catch (err) {
    console.error(`Error in sendMessage controller ${err.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export {
  getUsersForSidebar,
  getMessages,
  sendMessage
};