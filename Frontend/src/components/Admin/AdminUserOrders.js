import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import contractABI from "../../abi.json";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { ContractAddress } from "../../core/constant";

function AdminUserOrderDetails() {
  const [loading, setloading] = useState(true);
  const [items, setItems] = useState([]);
  const [itemsToShow, setItemToShow] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://flipkart-grid-server.vercel.app/admin/brand_products", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(async (res) => {
        var data = res.data.orders;

        const web3 = createAlchemyWeb3(process.env.REACT_APP_ALCHEMY_ID);

        const Contract = new web3.eth.Contract(
          JSON.parse(contractABI.result),
          ContractAddress
        );

        for (let order of data) {
          const tokenId = await Contract.methods
            .getTokenIdFromSerialNo(order.product_serial_number)
            .call();

          const product = await Contract.methods.getProductInfo(tokenId).call();

          let expiry_date = new Date(
            product?.ProductExpiryDate * 1000
          ).toLocaleString();

          let purchase_date = new Date(
            product?.ProductPurchaseDate * 1000
          ).toLocaleString();

          order.expiry_date = expiry_date;

          order.purchase_date = purchase_date;

          order.nftid = tokenId;

          order.isInWarranty = product?.ProductExpiryDate * 1000 > Date.now();
        }
        console.log(data, "sds");
        setItems(data);
        setItemToShow(data);

        // console.log(data);

        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        toast.error(`${err.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        history.push("/");
      });
  }, []);

  const handleFilter = (val) => {
    setFilterValue(val);
    const filteredRows = items.filter((row) => {
      return row.product_serial_number.includes(val) || row.nftid.includes(val);
    });
    setItemToShow(filteredRows);
  };

  if (loading) {
    return (
      <div style={{ height: "80vh" }}>
        <center>
          <div className="fa-3x mt-5 pt-5">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
        </center>
      </div>
    );
  } else {
    return (
      <div className="row" style={{ marginTop: "150px" }}>
        <div className="col-12">
          {items.length === 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
              }}
            >
              No Items ordered of your brand
            </div>
          )}
          {items.length > 0 && (
            <div className="row" style={{ justifyContent: "center" }}>
              <div className="col-12 col-md-5">
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Product Serial No or NFT Id "
                    onChange={(e) => handleFilter(e.target.value)}
                    value={filterValue}
                    style={{
                      borderRadius: "12px !important",
                      border: "1.2px solid rgba(25, 31, 35, 0.6)",
                      boxShadow: "none",
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          {items.length > 0 &&
            itemsToShow.map((item, index) => (
              <>
                <div
                  className="card-order text-center row"
                  key={item?.product_data?.product_id}
                  style={{
                    border: "1px solid #d1d1d199",
                    borderRadius: "15px !important",
                    margin: "40px 0",
                  }}
                >
                  <div
                    className="col-md-2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      className="card-order-img-top"
                      src={item?.product_data?.product_image}
                      alt={item?.product_data?.product_name}
                    />
                  </div>

                  <div className="card-caption p-1 col-md-5">
                    <StyledHeading6>
                      {item?.product_data?.product_brand}
                    </StyledHeading6>
                    <StyledHeading6>
                      {item?.product_data?.product_name}
                    </StyledHeading6>
                    <StyledHeading6>
                      Product Price: ₹ {item?.product_data?.product_price}
                    </StyledHeading6>
                    <StyledHeading6>
                      Warranty Duration: {item?.product_data?.warranty_duration}{" "}
                      days
                    </StyledHeading6>

                    <StyledText
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                      }}
                    >
                      User Details
                    </StyledText>
                    <StyledHeading6>Name: {item.user_data.name}</StyledHeading6>
                    <StyledHeading6>
                      Email: {item.user_data.email}
                    </StyledHeading6>
                    <StyledHeading6>
                      Phone Number: {item.user_data.phone_number}
                    </StyledHeading6>
                  </div>

                  <div className="card-caption p-0 col-md-5">
                    <StyledText
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                      }}
                    >
                      NFT Details
                    </StyledText>
                    <StyledHeading6>NFT_ID: {item?.nftid} </StyledHeading6>
                    <StyledHeading6>
                      Product Serial Number: {item?.product_serial_number}
                    </StyledHeading6>

                    <StyledHeading6>
                      Product Purchase Date: {item.purchase_date}
                    </StyledHeading6>

                    <StyledHeading6>
                      Warranty Expiry Date: {item.expiry_date}
                    </StyledHeading6>

                    <StyledHeading6>
                      Owner Address: {item.user_data.wallet_address}
                    </StyledHeading6>

                    <StyledHeading6>
                      Is In Warranty: {item.isInWarranty ? "Yes" : "No"}
                    </StyledHeading6>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    );
  }
}

export default AdminUserOrderDetails;

const StyledHeading6 = styled.h6`
  opacity: 0.6;
  font-weight: 400;
  color: black;
  text-align: left;
  display: -webkit-box;
  margin: 0.8rem 0.5rem;
`;

const StyledText = styled.div`
  opacity: 0.6;
  font-weight: 400;
  color: black;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  margin: 1.2rem 0.5rem;
  text-align: left;
`;
