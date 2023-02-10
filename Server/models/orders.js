const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const order = new Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "users"
  },
  product_id: {
    type: String
  },
  product_serial_number: {
    type: String
  },
  address: {
    line1: {
      type: String
    },
    state: {
      type: String
    },
    city: {
      type: String
    },
    pincode: {
      type: Number
    }
  },
  transferred: {
    type: Boolean
  },
  created_at:{
    type:Date
  }
});

module.exports = mongoose.model("orders", order);
