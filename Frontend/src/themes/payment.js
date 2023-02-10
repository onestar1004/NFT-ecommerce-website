import React from "react";

import Header from "../components/Header/Header";
import Payment from "../components/Payment/PaymentCard";
import ModalMenu from "../components/Modal/ModalMenu";

const AllProduct = (props) => {
  return (
    <div className="main  main-bg">
      <Header />
      <Payment productid={props.match.params.productid} />

      <ModalMenu />
    </div>
  );
};

export default AllProduct;
