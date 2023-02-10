const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema({
  product_id: {
    type: String,
    unique: true
  },
  product_name: {
    type: String
  },
  product_serial_number: {
    type: String
  },
  category: {
    type: String
  },
  warranty_duration: {
    type: String
  },
  product_price: {
    type: String
  },
  product_brand: {
    type: String
  },
  product_image: {
    type: String
  },
  product_quantity: {
    type: Number
  }
});

module.exports = mongoose.model("products", product);
