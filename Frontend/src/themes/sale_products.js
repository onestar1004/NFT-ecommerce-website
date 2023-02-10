import React from "react";
import Header from "../components/Header/Header";
import SaleProducts from "../components/SaleProducts/SaleProducts";
import ModalMenu from "../components/Modal/ModalMenu";

const SaleProduct = (props) => {
  return (
    <div className="main">
      <Header />
      <SaleProducts />

      <ModalMenu />
    </div>
  );
};

export default SaleProduct;
