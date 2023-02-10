import React from "react";
import Header from "../components/Header/Header";
import AdminOrderContainer from "../components/Admin/AdminOrderContainer";
import ModalMenu from "../components/Modal/ModalMenu";

const Admin_Order_details = (props) => {
  return (
    <div className="main">
      <Header />
      <AdminOrderContainer />
      <ModalMenu />
    </div>
  );
};

export default Admin_Order_details;
