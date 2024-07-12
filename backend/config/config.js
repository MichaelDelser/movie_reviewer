const mongoose = require('mongoose');

const connectDB = async () => {
    const dbURI =  process.env.MONGODB_URI; //("mongodb+srv://reviewServer:XZ6LIP3WEyR4OeFV@moviereviewer.7hbib0b.mongodb.net/?retryWrites=true&w=majority&appName=movieReviewer");
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
