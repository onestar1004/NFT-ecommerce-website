import React from "react";
import Header from "../components/Header/Header";
import AllProducts from "../components/Products/All_Products";
import ModalMenu from "../components/Modal/ModalMenu";

const AllProduct = (props) => {
  return (
    <div className="main">
      <Header />
      <AllProducts />
      <ModalMenu />
    </div>
  );
};

export default AllProduct;
