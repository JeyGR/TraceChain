import mongoose from 'mongoose';

const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("DB Connection already exists");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connectDb;
