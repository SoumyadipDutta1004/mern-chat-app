import mongoose from 'mongoose';

async function connectToDB(MONGODB_URI) {
  try {
    const db = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to MongoDB: ${db.connection.host}`);
  } 
  catch (err) {
    console.error('Error connecting to MongoDB: ', err.message);
  }
}

export default connectToDB;