const express = require("express");
const app = express();
const admin = require("../controllers/admin");
const verify = require("../middlewares/verify");

// user routes

app.route("/add_product").post(verify.verify, admin.add_product);

app.route("/brand_products").get(verify.verify, admin.get_brand_products);

module.exports = app;
