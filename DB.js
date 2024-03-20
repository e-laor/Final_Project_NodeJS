// Developers:  Eden Laor - 208939629, Yarin Yahav - 


const mongoose = require('mongoose');

// MongoDB connection URI
const uri = 'mongodb+srv://Eden:zCxId3WMmcExfBpV@cluster0.21yxdtj.mongodb.net/Cluster?retryWrites=true&w=majority';

const connectDB = async () =>
{
  try
  {
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error)
  {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectDB;

