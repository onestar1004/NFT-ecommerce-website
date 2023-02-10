const mongoose = require("mongoose");
const order_model = require("../models/orders.js");
const product_model = require("../models/product");
const user_model = require("../models/user");
const constants = require("../core/constants");
const { customAlphabet } = require("nanoid");

exports.add_product = async (req, res) => {
  try {
    const user_id = req.user._id;

    if (user_id != process.env.ADMIN_USER_ID) {
      return res.status(400).json({
        message: "You are not authorised to view this page!!"
      });
    }
    let product_data = req.body.product_data;

    await Promise.all(
      product_data.map((eachproduct) => {
        let product_id = customAlphabet("1234567890abcdef", 10)();
        eachproduct.product_id = product_id;
      })
    );

    await product_model.insertMany(product_data);

    res.status(200).json({
      message: "Product Added Successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};

exports.get_brand_products = async (req, res) => {
  try {
    let user_id = req.user._id;

    if (user_id != process.env.ADMIN_USER_ID) {
      return res.status(400).json({
        message: "You are not authorised to view this page!!"
      });
    }

    if (!user_id) {
      return res.status(400).json({
        message: "User Id is required"
      });
    }

    let all_orders = await order_model.aggregate([
      [
        {
          $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "product_id",
            as: "product_data"
          }
        },
        {
          $unwind: {
            path: "$product_data"
          }
        },
        {
          $match: {
            "product_data.product_brand": "Samsung"
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "owner_id",
            foreignField: "_id",
            as: "user_data"
          }
        },
        {
          $unwind: {
            path: "$user_data"
          }
        },
        {
          $unset: [
            "product_id",
            "address",
            "user_data.password",
            "user_data.orders",
            "user_data.transfers",
            "user_data.blockchain",
            "product_data.__v",
            "user_data.__v"
          ]
        }
      ]
    ]);

    res.status(200).json({
      message: "Samsung brand details fetched successfully",
      orders: all_orders,
      total_orders: all_orders.length
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};
