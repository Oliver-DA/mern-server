const mongoose = require("mongoose");

require("dotenv").config({ path: 'variables.env'});

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_TEST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("Database connected")

    } catch(err) {
        console.log(err);
        process.exit(1)
    }

}

module.exports = connectDB;