const mongoose = require('mongoose')

const connectToDB = async () => {
    mongoose.set('strictQuery', false);
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB: ${conn.connection.host}`);   
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToDB