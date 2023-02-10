import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CategorySlider from "../Category/CategorySlider";
import { RiShoppingBag3Line } from "react-icons/ri";
import ProductDeliveryImage from "../../Images/product_delivery.png";
import ProductFeatureImage from "../../Images/product_features.png";

const ProductDetail = (props) => {
  const productid = props.productid;
  const sale = props?.state?.sale ? true : false;
  const tokenId = props?.state?.sale ? props.state.tokenId : null;
  const nftOwnerAddress = props?.state?.sale
    ? props.state.nftOwnerAddress
    : null;
  const serialNo = props?.state?.sale ? props.state.serialNo : null;

  console.log(sale, tokenId, "from sale page");
  const [loading, setloading] = useState(true);
  const [product, setproduct] = useState({});
  const history = useHistory();
  const [nftData, setNftData] = useState();
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    setloading(true);
    axios
      .get("https://flipkart-grid-server.vercel.app/api/product", {
        params: { productid: productid },
      })
      .then((res) => {
        setproduct(res.data.product);
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        toast.error(`${err.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        history.push("/");
      });
  }, [productid]);

  return (
    <div>
      {loading ? (
        <div style={{ height: "80vh" }}>
          <center>
            <div className="fa-3x mt-5 pt-5">
              <i className="fas fa-spinner fa-spin"></i>
            </div>
          </center>
        </div>
      ) : (
        <section
          className="item-details-area"
          style={{ marginTop: "100px", marginBottom: "100px" }}
        >
          <div className="container" style={{ paddingBottom: "80px" }}>
            <div className="row justify-content-between">
              <div className="col-12 col-lg-5">
                <StyledCard className="item-info card-1">
                  <div className="item-thumb text-center">
                    <img
                      src={product.product_image}
                      alt=""
                      onLoad={() => setImageLoading(false)}
                    />
                    {sale ? (
                      <span
                        style={{
                          backgroundColor: "rgb(255, 218, 219)",
                          fontSize: "16px",
                          marginTop: "6px",
                          borderRadius: "6px",
                          color: "rgb(217, 32, 39)",
                          padding: "6px 14px",
                          top: "10px",
                          right: "40px",
                          position: "absolute",
                        }}
                      >
                        On Sale
                      </span>
                    ) : (
                      <span
                        style={{
                          backgroundColor: "rgb(218 255 233)",
                          fontSize: "16px",
                          marginTop: "6px",
                          borderRadius: "6px",
                          color: "#088a3b",
                          padding: "6px 14px",
                          top: "10px",
                          right: "40px",
                          position: "absolute",
                        }}
                      >
                        New Arrival
                      </span>
                    )}
                  </div>
                </StyledCard>
                <div className="row items mt-4">
                  <div className="col-12 item" style={{ paddingLeft: 0 }}>
                    <div className=" align-items-center justify-content-center d-flex">
                      <div className="d-block btn" style={{ width: "220px" }}>
                        <RiShoppingBag3Line style={{ fontSize: "1.4rem" }} />
                        <Link
                          to={{
                            pathname: `/payment/${productid}`,
                            state: {
                              sale: sale,
                              tokenId: tokenId,
                              serialNo: serialNo,
                              nftOwnerAddress: nftOwnerAddress,
                            },
                          }}
                          style={{
                            color: "white",
                            fontWeight: 500,
                            marginLeft: "10px",
                          }}
                        >
                          BUY NOW
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 ">
                {/* Content */}
                <div className="content mt-5 mt-lg-0">
                  <h6
                    className="m-0"
                    style={{ fontWeight: 500, color: "#191f23", opacity: 0.5 }}
                  >
                    {product.product_brand}{" "}
                    {sale ? `| ${serialNo}` : ""}
                  </h6>
                  <h4
                    className="mt-4"
                    style={{ fontWeight: 400, color: "#191f23" }}
                  >
                    {product.product_name}
                  </h4>
                </div>

                <div className="item-info-list mt-4">
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: 600,
                      color: "#191f23",
                    }}
                  >
                    ₹ {product.product_price}
                  </span>
                </div>

                <div className="content mt-4">
                  <img src={ProductDeliveryImage} alt="sd" />
                </div>
                <div className="content mt-5">
                  <img src={ProductFeatureImage} alt="sd" />
                </div>
              </div>
            </div>
          </div>

          {!loading && (
            <CategorySlider
              category={product.category}
              title={"Similar Products"}
            />
          )}
        </section>
      )}
    </div>
  );
};

export default ProductDetail;

const StyledCard = styled.div`
  background: transparent;
  box-shadow: none;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
