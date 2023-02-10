import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// importing all the themes
import Home from "../themes/home";
import Dashboard from "../themes/dashboard";
import Signup from "../themes/signup";
import Userprofile from "../themes/user_profile";
import Category from "../themes/category";
import Products from "../themes/all_products";
import ProductDetails from "../themes/productdetails";
import Payment from "../themes/payment";
import Orderdetails from "../themes/order_details";
import SaleProducts from "../themes/sale_products.js";
import AdminProduct from "../themes/admin_product.js";
import Adminorders from "../themes/admin_user_orders.js";
import Error from "../themes/error";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrivateRoute = (privateRouteProps) => {
  const { isAuthenticated, component: Component, path } = privateRouteProps;

  return (
    <Route
      path={path}
      render={(props) => {
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signup",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

const Routes = () => {
  const [validuser, setvaliduser] = useState(false);
  const [adminuser, setadminuser] = useState(false);
  const [loading, setloading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://flipkart-grid-server.vercel.app/api/valid_user", {
        params: {
          token: token,
        },
      })
      .then((res) => {
        console.log(res.data)
        setadminuser(res.data.isadmin);
        setvaliduser(true);
        setloading(false);
      })
      .catch((err) => {
        // console.log(err);
        setloading(false);
        setvaliduser(false);
      });
  },[token]);

  if (loading) {
    return (
      <div style={{ height: "80vh" }}>
        <center>
          <div className="fa-3x mt-5 pt-5">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
        </center>
      </div>
    );
  } else {
    return (
      <div>
        <ToastContainer />
        <Router>
          <Switch>
            <Route exact path="/" component={Dashboard} />

            <Route exact path="/signup" component={Signup} />

            <PrivateRoute
              path="/payment/:productid"
              component={Payment}
              isAuthenticated={validuser}
            />
            <Route path="/home" component={Home} />

            <PrivateRoute
              path="/profile"
              component={Userprofile}
              isAuthenticated={validuser}
            />

            <Route path="/category/:category" component={Category} />

            <Route path="/allproducts" component={Products} />

            <Route
              exact
              path="/product/:productid"
              component={ProductDetails}
            />

            <PrivateRoute
              exact
              path="/orders"
              component={Orderdetails}
              isAuthenticated={validuser}
            />

            <Route exact path="/sale" component={SaleProducts} />

            <PrivateRoute
              exact
              path="/admin_product"
              component={AdminProduct}
              isAuthenticated={adminuser}
            />

            <PrivateRoute
              exact
              path="/admin_user_orders"
              component={Adminorders}
              isAuthenticated={adminuser}
            />

            <Route exact path="*" component={Error} />
          </Switch>
        </Router>
      </div>
    );
  }
};
export default Routes;
