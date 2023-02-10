import React from "react";
import styled from "styled-components";

function OrderCardHeader({ item, walletAddress }) {
  console.log(item, "sds");

  const ed = new Date(
    item?.nft_details.warrentyDetails?.ProductExpiryDate * 1000
  ).toLocaleString();

  const pd = new Date(
    item?.nft_details.warrentyDetails?.ProductPurchaseDate * 1000
  ).toLocaleString();

  return (
    <>
      <div className="card-order text-center row">
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
            src={item?.product_details?.product_image}
            alt={item?.product_details?.product_name}
          />
        </div>

        <div className="card-caption p-1 col-md-5">
          <StyledHeading6>
            {item?.product_details?.product_brand}
          </StyledHeading6>

          <StyledHeading6>{item?.product_details?.product_name}</StyledHeading6>

          <StyledHeading6>
            Product Price: ₹ {item?.product_details?.product_price}
          </StyledHeading6>

          <StyledHeading6>
            Warranty Duration: {item?.product_details?.warranty_duration} days
          </StyledHeading6>
        </div>

        <div className="card-caption p-0 col-md-5">
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
                style={{ fontWeight: 500, width: "50%", textAlign: "left" }}
              >
                {item.nft_details.tokenId}
              </span>
            </StyledText>

            <StyledText>
              Product Serial Number
              <span
                style={{ fontWeight: 500, width: "50%", textAlign: "left" }}
              >
                {item?.nft_details?.warrentyDetails?.ProductSerialNumber}
              </span>
            </StyledText>

            <StyledText>
              Product Purchase Date
              <span
                style={{ fontWeight: 500, width: "50%", textAlign: "left" }}
              >
                {" "}
                {pd}
              </span>
            </StyledText>

            <StyledText>
              Warranty Expiry Date
              <span
                style={{ fontWeight: 500, width: "50%", textAlign: "left" }}
              >
                {" "}
                {ed}
              </span>
            </StyledText>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderCardHeader;

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
  text-align: left;
`;
