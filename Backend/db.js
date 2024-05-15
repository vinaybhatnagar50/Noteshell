const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://vinaybhatnagar5901:vinay5901@cluster0.m4z3ffn.mongodb.net/iNotebook";
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

 module.exports= connectToMongo;