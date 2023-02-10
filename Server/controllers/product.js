const product_model = require("../models/product.js");

exports.get_all_products = async (req, res) => {
  try {
    var product_data = await product_model.find({});

    if (product_data.length > 0) {
      res.status(200).json({
        message: "All Product details fetched Successfully",
        products: product_data,
        total_products: product_data.length
      });
    } else {
      res.status(400).json({
        message: "No Products Found"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};

exports.get_all_categories = async (req, res) => {
  try {
    var categories = await product_model.distinct("category", {});

    res.status(200).json({
      message: "All Product categories fetched Successfully",
      all_category: categories,
      total: categories.length
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};

exports.each_category_products = async (req, res) => {
  try {
    var category = req.query.category;

    var products = await product_model.find({ category: category });

    if (products.length > 0) {
      res.status(200).json({
        message: "Products of particular category fetched sucessfully",
        products: products,
        total_products: products.length
      });
    } else {
      res.status(400).json({
        message: "Category Not found"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};

exports.each_product = async (req, res) => {
  try {
    var productid = req.query.productid;

    var product = await product_model.findOne({ product_id: productid });

    if (product) {
      res.status(200).json({
        message: "Product details fetched Successfully",
        product: product
      });
    } else {
      res.status(400).json({
        message: "Product Not Found"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};
