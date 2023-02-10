const express = require("express");
const app = express();
const product = require("../controllers/product.js");
const user = require("../controllers/user.js");
const verify = require("../middlewares/verify");
const sendmsg = require("../controllers/sendmsg");
const order = require("../controllers/orders");

// user routes
app.route("/register").post(user.register);

app.route("/login").post(user.login);

app.route("/user").get(verify.verify, user.get_user);

app.route("/valid_user").get(verify.valid_user);

//send message (14.50 credits left so dont use this api unless required)
app.route("/sendmsg").post(verify.verify, sendmsg.sendmsg);

// product routes
app.route("/all_products").get(product.get_all_products);

app.route("/all_category").get(product.get_all_categories);

app.route("/category_products").get(product.each_category_products);

app.route("/product").get(product.each_product);

//orders
app.route("/order").post(verify.verify, order.new_order);

app.route("/user_orders").get(verify.verify, order.user_my_orders);

app.route("/transfer_orders").get(verify.verify, order.user_my_transfers);

app.route("/sale").post(verify.verify, order.put_on_sale);

app.route("/sale_products").get(order.all_sale_orders);

app.route("/buy_sale_product").post(verify.verify, order.buy_sale_product);

module.exports = app;
