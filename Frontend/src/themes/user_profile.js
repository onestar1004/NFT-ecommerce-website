import React from "react";
import Header from "../components/Header/Header";
import Userprofile from "../components/UserProfile/UserProfile";
import ModalMenu from "../components/Modal/ModalMenu";

const Home = () => {
  return (
    <div className="main main-bg">
      <Header />
      <Userprofile />
      <ModalMenu />
    </div>
  );
};

export default Home;
