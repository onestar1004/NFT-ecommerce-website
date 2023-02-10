import React, { Component } from "react";

import Header from "../components/Header/Header";
import ModalMenu from "../components/Modal/ModalMenu";
import Signup from "../components/Signup/Signup";

class SignupTheme extends Component {
  render() {
    return (
      <div className="main main-bg">
        <Header />
        <Signup />
        <ModalMenu />
      </div>
    );
  }
}

export default SignupTheme;
