import React, { Component } from "react";
import Header from "../components/Header/Header";
import ModalMenu from "../components/Modal/ModalMenu";
import AdminProduct from "../components/Admin/AdminProduct";

class SignupTheme extends Component {
  render() {
    return (
      <div className="main main-bg">
        <Header />
        <AdminProduct />
        <ModalMenu />
      </div>
    );
  }
}

export default SignupTheme;
