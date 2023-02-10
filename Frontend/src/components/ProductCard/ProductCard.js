import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import contractABI from "../../abi.json";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { ContractAddress } from "../../core/constant";
import { AiOutlineShoppingCart } from "react-icons/ai";

function ProductCard({ item, sale = false, serialNo, nftOwnerAddress }) {
  const [tId, setTId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const web3 = createAlchemyWeb3(
        process.env.REACT_APP_ALCHEMY_ID
      );

      const Contract = new web3.eth.Contract(
        JSON.parse(contractABI.result),
        ContractAddress
      );
      console.log(serialNo);
      const tokenId = await Contract.methods
        .getTokenIdFromSerialNo(serialNo)
        .call();
      console.log(tokenId, "tid");
      setTId(tokenId);
    };

    if (sale) {
      fetchData();
    }
  }, []);

  return (
    <Link
      key={`cd_${item.product_id}`}
      className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 item"
      style={{ pointerEvents: sale && !tId ? "none" : "auto" }}
      to={
        sale
          ? {
              pathname: `/product/${item.product_id}`,
              state: {
                sale: true,
                tokenId: tId,
                serialNo: serialNo,
                nftOwnerAddress: nftOwnerAddress
              }
            }
          : `/product/${item.product_id}`
      }
    >
      <div className="card hover text-center">
        <div
          className="image-over"
          style={{
            minHeight: "200px",
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img className="card-img-top" src={item.product_image} alt="" />
        </div>
        {/* Card Caption */}
        <div className="card-caption p-0">
          {/* Card Body */}
          <div className="card-body">
            <div>
              <h6
                className="mb-2"
                style={{
                  opacity: 0.6,
                  fontWeight: 600,
                  textAlign: "left",
                  padding: "0 6px"
                }}
              >
                {item.product_brand}
              </h6>
            </div>
            <div>
              <h6
                className="mb-2"
                style={{
                  opacity: 0.6,
                  fontWeight: 400,
                  textAlign: "left",
                  padding: "0 6px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  lineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  minHeight: "2.5rem"
                }}
              >
                {item.product_name.substr(0, 45) === item.product_name
                  ? item.product_name
                  : `${item.product_name.substr(0, 45)}...`}
              </h6>
            </div>
            <div>
              <h5
                style={{
                  fontWeight: 600,
                  textAlign: "left",
                  padding: "4px 6px",
                  margin: "0 0"
                }}
              >
                {" "}
                ₹ {item.product_price}
              </h5>
            </div>
            <div
              className="row"
              style={{
                justifyContent: "space-between",
                padding: "0 6px",
                alignItems: "center",
                marginBottom: "6px"
              }}
            >
              {sale ? (
                <span
                  style={{
                    backgroundColor: "rgb(255, 218, 219)",
                    fontSize: "12px",
                    marginTop: "6px",
                    borderRadius: "6px",
                    color: "rgb(217, 32, 39)",
                    padding: "4px 7px"
                  }}
                >
                  On Sale
                </span>
              ) : (
                <span
                  style={{
                    backgroundColor: "rgb(218 255 233)",
                    fontSize: "12px",
                    marginTop: "6px",
                    borderRadius: "6px",
                    color: "#088a3b",
                    padding: "4px 7px"
                  }}
                >
                  New Arrival
                </span>
              )}

              <span>
                <AiOutlineShoppingCart style={{ fontSize: "1.2rem" }} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
