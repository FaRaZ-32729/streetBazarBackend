const mongoose = require("mongoose");
require("dotenv").config();



const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MONGO-DB Connected Successfully");
    } catch (error) {
        console.log("error while connection with mongoDB", error.message);
    }
}

module.exports = dbConnection;