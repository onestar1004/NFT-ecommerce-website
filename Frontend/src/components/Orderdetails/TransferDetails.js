import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

function TransferDetails() {
  const [loading, setloading] = useState(true);
  const [items, setItems] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://flipkart-grid-server.vercel.app/api/transfer_orders", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(async (res) => {
        console.log(res.data, "trasdn dta");
        setItems(res.data.orders);
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        toast.error(`${err.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT
        });
        history.push("/");
      });
  }, []);

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
                fontSize: "2rem"
              }}
            >
              No Items sold
            </div>
          )}

          {items.length > 0 &&
            items.map((item, index) => (
              <>
                <div
                  className="card-order text-center row"
                  key={item?.product_details?.product_id}
                  style={{
                    border: "1px solid #d1d1d199",
                    borderRadius: "12px !important",
                    margin: "45px 0"
                  }}
                >
                  <div
                    className="col-md-2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <img
                      className="card-order-img-top"
                      src={item?.product_details?.product_image}
                      alt={item?.product_details?.product_name}
                    />
                  </div>

                  <div className="card-caption p-1 col-md-5">
                    <StyledHeading6>
                      {item?.product_details?.product_brand}
                    </StyledHeading6>

                    <StyledHeading6>
                      {item?.product_details?.product_name}
                    </StyledHeading6>

                    <StyledHeading6>
                      Product Price: ₹ {item?.product_details?.product_price}
                    </StyledHeading6>

                    <StyledHeading6>
                      Warranty Duration:{" "}
                      {item?.product_details?.warranty_duration} days
                    </StyledHeading6>
                  </div>

                  {/* <div className="card-caption p-0 col-md-5">
                    <div>
                      <StyledText
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          fontWeight: 600,
                          fontSize: "1.1rem",
                        }}
                      >
                        NFT Details
                      </StyledText>
                      <StyledText>
                        NFT ID
                        <span
                          style={{
                            fontWeight: 500,
                            width: "50%",
                            textAlign: "left",
                          }}
                        >
                          {item.nft_details.tokenId}
                        </span>
                      </StyledText>

                      <StyledText>
                        Product Serial Number
                        <span
                          style={{
                            fontWeight: 500,
                            width: "50%",
                            textAlign: "left",
                          }}
                        >
                          {
                            item?.nft_details?.warrentyDetails
                              ?.ProductSerialNumber
                          }
                        </span>
                      </StyledText>

                      <StyledText>
                        Product Purchase Date
                        <span
                          style={{
                            fontWeight: 500,
                            width: "50%",
                            textAlign: "left",
                          }}
                        >
                          {" "}
                          {pd}
                        </span>
                      </StyledText>

                      <StyledText>
                        Warranty Expiry Date
                        <span
                          style={{
                            fontWeight: 500,
                            width: "50%",
                            textAlign: "left",
                          }}
                        >
                          {" "}
                          {ed}
                        </span>
                      </StyledText>
                    </div>
                  </div> */}
                </div>
              </>
            ))}
        </div>
      </div>
    );
  }
}

export default TransferDetails;

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
  margin: 0.6rem 0.5rem;
`;
