import React from "react";

import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Work from "../components/Work/Work";
import ModalMenu from "../components/Modal/ModalMenu";
import Faq from "../components/Faq/Faq";

const Home = () => {
  return (
    <div className="main">
      <Header />
      <Hero />
      <Work />
      <Faq />
      <ModalMenu />
    </div>
  );
};

export default Home;
