import React, { useState } from "react";
import styled from "styled-components";
import OrderDetails from "./AdminUserOrders";

function AdminOrderContainer() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-12 col-lg-12">
          <OrderDetails />
        </div>
      </div>
    </div>
  );
}

export default AdminOrderContainer;
