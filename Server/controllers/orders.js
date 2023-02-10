const mongoose = require("mongoose");
const order_model = require("../models/orders.js");
const product_model = require("../models/product");
const user_model = require("../models/user");
const constants = require("../core/constants");

exports.new_order = async (req, res) => {
  try {
    let address_line1 = req.body.address;
    let state = req.body.state;
    let city = req.body.city;
    let pincode = req.body.pincode;
    let user_id = req.user._id;
    let product_id = req.body.product_id;
    let product_serial_number = req.body.product_serial_number;

    if (!user_id) {
      return res.status(400).json({
        message: "User Id is required"
      });
    } else if (!address_line1) {
      return res.status(400).json({
        message: "Address is required"
      });
    } else if (!state) {
      return res.status(400).json({
        message: "State is required"
      });
    } else if (!city) {
      return res.status(400).json({
        message: "City is required"
      });
    } else if (!pincode) {
      return res.status(400).json({
        message: "Pincode is required"
      });
    } else if (!product_id) {
      return res.status(400).json({
        message: "Product ID is required"
      });
    } else if (!product_serial_number) {
      return res.status(400).json({
        message: "Product Serial Number is required"
      });
    }

    const user_data = await user_model.findOne({ _id: user_id });

    let order = new order_model({
      owner_id: user_id,
      product_id: product_id,
      product_serial_number: product_serial_number,
      address: {
        line1: address_line1,
        state: state,
        city: city,
        pincode: pincode
      },
      transferred: false,
      created_at: new Date()
    });

    await order.save();

    user_data.orders.push(order._id);

    await user_data.save();

    res.status(200).json({
      message: "Order Placed Successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};

exports.user_my_orders = async (req, res) => {
  try {
    let user_id = req.user._id;

    let wallet_address = req.user.wallet_address;

    if (!user_id) {
      return res.status(400).json({
        message: "User Id is required"
      });
    }

    let all_orders = await user_model.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(user_id)
        }
      },
      {
        $unset: [
          "email",
          "password",
          "wallet_address",
          "profile_image",
          "blockchain",
          "__v",
          "transfers"
        ]
      },
      {
        $lookup: {
          from: "orders",
          localField: "orders",
          foreignField: "_id",
          as: "orders_details"
        }
      },
      {
        $unwind: {
          path: "$orders_details"
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "orders_details.product_id",
          foreignField: "product_id",
          as: "product_details"
        }
      },
      {
        $unwind: {
          path: "$product_details"
        }
      },
      {
        $unset: "orders"
      }
    ]);

    res.status(200).json({
      message: "User's my orders details fetched successfully",
      orders: all_orders,
      total_orders: all_orders.length,
      wallet_address: wallet_address
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};

exports.user_my_transfers = async (req, res) => {
  try {
    let user_id = req.user._id;

    let wallet_address = req.user.wallet_address;

    if (!user_id) {
      return res.status(400).json({
        message: "User Id is required"
      });
    }

    let all_transfers = await user_model.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(user_id)
        }
      },
      {
        $unset: [
          "email",
          "password",
          "wallet_address",
          "profile_image",
          "blockchain",
          "__v",
          "orders"
        ]
      },
      {
        $lookup: {
          from: "orders",
          localField: "transfers",
          foreignField: "_id",
          as: "transfer_details"
        }
      },
      {
        $unwind: {
          path: "$transfer_details"
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "transfer_details.product_id",
          foreignField: "product_id",
          as: "product_details"
        }
      },
      {
        $unwind: {
          path: "$product_details"
        }
      },
      {
        $unset: "transfer"
      }
    ]);

    res.status(200).json({
      message: "User's transfer order details fetched successfully",
      orders: all_transfers,
      total_orders: all_transfers.length,
      wallet_address: wallet_address
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};

exports.put_on_sale = async (req, res) => {
  try {
    let product_serial_number = req.body.product_serial_number;

    if (!product_serial_number) {
      return res.status(400).json({
        message: "Product Serial Number is required"
      });
    }

    const order_data = await order_model.findOne({
      product_serial_number: product_serial_number
    });

    order_data.transferred = true;

    order_data.save();

    res.status(200).json({
      message: "Order Put On Sale Successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};

exports.all_sale_orders = async (req, res) => {
  try {
    let all_sale_orders = await order_model.aggregate([
      {
        $match: {
          transferred: true
        }
      },
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
        $lookup: {
          from: "users",
          localField: "owner_id",
          foreignField: "_id",
          as: "owner_details"
        }
      },
      {
        $unwind: {
          path: "$owner_details"
        }
      }
    ]);

    res.status(200).json({
      message: "User's transfer order details fetched successfully",
      orders: all_sale_orders,
      total_orders: all_sale_orders.length
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};

exports.buy_sale_product = async (req, res) => {
  try {
    let user_id = req.user._id;

    let address_line1 = req.body.address;
    let state = req.body.state;
    let city = req.body.city;
    let pincode = req.body.pincode;
    let product_serial_number = req.body.product_serial_number;

    if (!user_id) {
      return res.status(400).json({
        message: "User Id is required"
      });
    } else if (!address_line1) {
      return res.status(400).json({
        message: "Address is required"
      });
    } else if (!state) {
      return res.status(400).json({
        message: "State is required"
      });
    } else if (!city) {
      return res.status(400).json({
        message: "City is required"
      });
    } else if (!pincode) {
      return res.status(400).json({
        message: "Pincode is required"
      });
    } else if (!product_serial_number) {
      return res.status(400).json({
        message: "Product Serial Number is required"
      });
    }

    let new_user_data = await user_model.findById(user_id);

    let order_data = await order_model.findOne({
      product_serial_number: product_serial_number
    });

    let prev_owner = order_data.owner_id;

    if (order_data.owner_id.equals(req.user._id)) {
      return res.status(400).json({
        message: "You only sold the product, You cannot buy it once again"
      });
    }

    let prev_owner_user = await user_model.findById(prev_owner);

    order_data.owner_id = req.user._id;

    order_data.address.line1 = address_line1;

    order_data.address.state = state;

    order_data.address.city = city;

    order_data.address.pincode = pincode;

    order_data.transferred = false;

    await order_data.save();

    if (!new_user_data.orders.includes(order_data._id)) {
      new_user_data.orders.push(order_data._id);
      prev_owner_user.orders.remove(order_data._id);
      prev_owner_user.transfers.push(order_data._id);
      await new_user_data.save();
      await prev_owner_user.save();
    } else {
      return res.status(400).json({
        message: "You only sold the product, You cannot buy it once again"
      });
    }

    res.status(200).json({
      message: "Bought a sale product Successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};
