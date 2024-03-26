// Developers:  Eden Laor - 208939629, Yarin Yahav - 207952516
// DB.js

const mongoose = require('mongoose');

// MongoDB connection URI
const uri = 'mongodb+srv://Eden:zCxId3WMmcExfBpV@cluster0.21yxdtj.mongodb.net/Cluster?retryWrites=true&w=majority';

const connectDB = async () =>
{
  try
  {
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) // any error that occured while attempting to connect to the database
  {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectDB;

