import React from "react";
import Header from "../components/Header/Header";
import Categories from "../components/Categories/Categories";
import ModalMenu from "../components/Modal/ModalMenu";
import LargeBanners from "../components/Banners/LargeBanners";
import CategorySlider from "../components/Category/CategorySlider";
// import Reference from "./reference";

const Dashboard = () => {
  return (
    <div className="main">
      <Header />
      <LargeBanners />
      <CategorySlider category={"Electronics"} />
      <Categories />
      <CategorySlider category={"Watches"} />
      {/* <Reference /> */}
      <CategorySlider category={"Fitness"} />
      <CategorySlider category={"Mobiles"} />

      <ModalMenu />
    </div>
  );
};

export default Dashboard;
