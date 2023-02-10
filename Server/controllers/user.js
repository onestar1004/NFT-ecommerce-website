const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcryptjs");
// var config = require("../config");
const jwt = require("jsonwebtoken");
const user_model = require("../models/user");

const saltRounds = 10;

exports.register = async (req, res) => {
  try {
    let { name, email, password, profile_image, wallet_address, phone } =
      req.body;

    if (!name) {
      return res.status(400).json({
        message: "Please enter the Name"
      });
    } else if (!email) {
      return res.status(400).json({
        message: "Please enter the Email"
      });
    } else if (!password) {
      return res.status(400).json({
        message: "Please enter the Password"
      });
    } else if (!wallet_address) {
      return res.status(400).json({
        message: "Please enter the Wallet Address"
      });
    } else if (!phone) {
      return res.status(400).json({
        message: "Please enter a Phone Number"
      });
    }

    profile_image = req.body.profile_image || "";

    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    const usermodel = new user_model({
      name: name,
      email: email,
      phone_number: phone,
      password: hashedPassword,
      profile_image: profile_image,
      wallet_address: wallet_address,
      blockchain: "ROPSTEN TESTNET"
    });

    const user = await user_model.findOne({ email });
    console.log(user);
    if (user) {
      if (user.email === email) {
        return res.status(400).json({
          message:
            "Email Already Exists! Please register with a different email"
        });
      }
    }

    const userWithWallet = await user_model.findOne({ wallet_address });
    if (userWithWallet) {
      if (userWithWallet.wallet_address === wallet_address) {
        return res.status(400).json({
          message:
            "Wallet Address Already Exists! Please register with a different wallet address"
        });
      }
    }

    const token = jwt.sign(
      {
        _id: usermodel._id,
        name: name,
        email: email,
        wallet_address: wallet_address,
        blockchain: "ROPSTEN TESTNET"
      },
      `${process.env.JWT_SECRET}`,
      { expiresIn: "30d" }
    );

    const decoded_values = jwt.decode(token, `${process.env.JWT_SECRET}`);

    await usermodel.save();

    return res.status(200).json({
      message: "User Registration Successful",
      token,
      decoded_values
    });
  } catch (error) {
    res.status(500).json({
      message: `Some Error Occurred`,
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({
        message: `Please Enter the Email`
      });
    }
    const password = req.body.password;
    if (!password) {
      return res.status(400).json({
        message: `Please Enter the Password`
      });
    }

    const data = await user_model.find({ email: email });

    if (data.length == 0) {
      return res.status(400).json({
        message: `${email} not found, Please Register`
      });
    }
    const correct_password = await bcrypt.compare(password, data[0].password);

    if (correct_password) {
      const token = jwt.sign(
        {
          _id: data[0]._id,
          name: data[0].name,
          email: data[0].email,
          wallet_address: data[0].wallet_address,
          blockchain: data[0].blockchain
        },
        `${process.env.JWT_SECRET}`,
        { expiresIn: "30d" }
      );

      if (`${process.env.JWT_SECRET}` === "undefined") {
        return res.status(500).json({
          message: "Jwt Secret is undefined"
        });
      }
      const decoded_values = jwt.decode(token, `${process.env.JWT_SECRET}`);

      return res.status(200).json({
        message: "Login Successful",
        token,
        decoded_values
      });
    } else {
      return res.status(400).json({
        message: `Invalid Password, Please try again`
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Some Error Occured`,
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};

exports.get_user = async (req, res) => {
  try {
    const id = req.user._id;

    const data = await user_model.findById(id);

    const isadmin = req.user._id === process.env.ADMIN_USER_ID ? true : false;

    if (data.length == 0) {
      return res.status(400).json({
        message: `User not registered not found, Please Register`
      });
    } else {
      return res.status(200).json({
        message: "User details fetched Successfully",
        user: data,
        isadmin: isadmin
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Some Error Occured`,
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};
