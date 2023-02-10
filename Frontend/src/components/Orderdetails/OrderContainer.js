import React, { useState } from "react";
import styled from "styled-components";
import OrdersDetails from "./OrderDetails";
import TransferDetails from "./TransferDetails";

function OrderContainer() {
  const [isOrdersPage, setOrdersPage] = useState(true);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-2 col-lg-2">
          <TabsContainer
            className="nav flex-column nav-pills"
            aria-orientation="vertical"
          >
            <TabsBtn
              className={`nav-link ${isOrdersPage ? "active" : ""} loginBtn`}
              onClick={(e) => setOrdersPage(true)}
            >
              {/* <FiLogIn style={{ fontSize: "1.5rem", marginRight: "15px" }} /> */}
              My Orders
            </TabsBtn>
            <TabsBtn
              className={`nav-link ${!isOrdersPage ? "active" : ""}`}
              onClick={(e) => setOrdersPage(false)}
            >
              {/* <IoCreateOutline
            style={{ fontSize: "1.5rem", marginRight: "15px" }}
          /> */}
              Sold Items
            </TabsBtn>
          </TabsContainer>
        </div>
        <div className="col-12 col-md-10 col-lg-10">
          {isOrdersPage ? <OrdersDetails /> : <TransferDetails />}
        </div>
      </div>
    </div>
  );
}

export default OrderContainer;

const TabsContainer = styled.div`
  align-items: center;
  cursor: pointer;
  .active {
    background-color: #7971ea !important;
  }
  .loginBtn {
    margin-bottom: 20px;
  }
  padding-top: 190px;
  @media (max-width: 767px) {
    position: relative;
    width: 100%;
    padding-top: 100px;
  }
`;

const TabsBtn = styled.div`
  width: 200px;
  text-align: center;
  font-weight: 500;
  border: 1px solid #7971ea;
  color: #7971ea;
`;
