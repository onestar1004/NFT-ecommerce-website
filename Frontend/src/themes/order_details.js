import React from "react";
import Header from "../components/Header/Header";
import OrderContainer from "../components/Orderdetails/OrderContainer";
import ModalMenu from "../components/Modal/ModalMenu";

const Order_details = (props) => {
  return (
    <div className="main">
      <Header />
      <OrderContainer />
      <ModalMenu />
    </div>
  );
};

export default Order_details;
