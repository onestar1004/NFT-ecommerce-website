const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  profile_image: {
    type: String,
  },
  wallet_address: {
    type: String,
  },
  blockchain: {
    type: String,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: "orders",
    },
  ],
  transfers: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: "orders",
    },
  ],
});

module.exports = mongoose.model("users", user);
