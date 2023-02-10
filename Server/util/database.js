const mongoose = require("mongoose");

const mongo_uri = process.env.MONGO_URI;

const mongoconnectdb = (callback) => {
  mongoose
    .connect(mongo_uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connected with the MongoDB Atlas Database");
    })
    .catch((error) => {
      console.log(error, "Not Connected with the Database ");
    });
};

module.exports = mongoconnectdb;
