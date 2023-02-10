import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import OrderCardHeader from "./OrderCardHeader";
import Faq from "react-faq-component";
import OrderCardBody from "./OrderCardBody";
import contractABI from "../../abi.json";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { ContractAddress } from "../../core/constant";
import "./styles.css";

const OrdersDetails = () => {
  const [loading, setloading] = useState(true);
  const [renderData, setRenderData] = useState({});
  const [userOrdersLength, setUserOrdersLength] = useState(0);
  const history = useHistory();

  const web3 = createAlchemyWeb3(process.env.REACT_APP_ALCHEMY_ID);

  const Contract = new web3.eth.Contract(
    JSON.parse(contractABI.result),
    ContractAddress
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://flipkart-grid-server.vercel.app/api/user_orders", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(async (res) => {
        console.log(res.data);
        // setorders(res.data.orders);

        try {
          const productData = res.data.orders;
          const nftData = await Contract.methods
            .getAllNftsOfUser(res.data.wallet_address)
            .call();

          const userOrders = [];
          for (let i = 0; i < nftData.length; i++) {
            const serialNo = nftData[i].warrentyDetails.ProductSerialNumber;
            const filtredProductData = productData.filter((pd) => {
              return pd.orders_details.product_serial_number === serialNo;
            });

            const newOrdersObj = {
              nft_details: nftData[i],
            };

            if (filtredProductData.length > 0) {
              newOrdersObj["order_details"] =
                filtredProductData[0].orders_details;
              newOrdersObj["product_details"] =
                filtredProductData[0].product_details;
            }

            userOrders.push(newOrdersObj);
          }
          setUserOrdersLength(userOrders.length);
          const dataToShow = userOrders.map((item) => {
            const obj = {
              title: (
                <OrderCardHeader
                  item={item}
                  walletAddress={res.data.wallet_address}
                />
              ),
              content: (
                <OrderCardBody
                  item={item}
                  walletAddress={res.data.wallet_address}
                />
              ),
            };
            return obj;
          });

          console.log(dataToShow, userOrders, "sd");
          setRenderData({ rows: dataToShow });
          setloading(false);
        } catch (err) {
          console.log(err);
          setloading(false);
          history.push("/");
        }
      })
      .catch((err) => {
        setloading(false);
        toast.error(`${err.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
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
      <div className="row" style={{ marginTop: "80px" }}>
        {userOrdersLength > 0 && renderData ? (
          <>
            <div className="col-12 faq-style-wrapper">
              <Faq data={renderData} />
            </div>
          </>
        ) : (
          <>
            <div
              className="col-12"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                marginTop: "80px",
              }}
            >
              No Items Ordered
            </div>
          </>
        )}
      </div>
    );
  }
};

export default OrdersDetails;
