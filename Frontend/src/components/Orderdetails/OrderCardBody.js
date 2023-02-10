import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import Modal from "react-modal";
import Wallet from "../Wallet/Wallet";
import { toast } from "react-toastify";
import { ContractAddress } from "../../core/constant";
import { ethers } from "ethers";
import contractABI from "../../abi.json";
import axios from "axios";
import styled from "styled-components";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "100%",
  },
  overlay: {
    zIndex: 3000,
  },
};

function OrderCardBody({ item, walletAddress }) {
  const { active, account, activate, deactivate, library } = useWeb3React();
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(e) {
    e.preventDefault();
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (active && account && modalIsOpen) {
      setIsOpen(false);
    }
  }, [active]);

  const handleSale = async (e) => {
    e.preventDefault();
    try {
      if (active) {
        if (active && account && account !== walletAddress) {
          toast.error("Not connected to registered address", {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        }
        const signer = library.getSigner();
        const connectedContract = new ethers.Contract(
          ContractAddress,
          JSON.parse(contractABI.result),
          signer
        );

        console.log("Going to pop wallet now to approve...");

        try {
          const nftApprove = await connectedContract.approve(
            "0xcB39f2b7b0a1f10A6C7A285f6c14C2137F52cd21",
            item.nft_details.tokenId
          );

          let token = localStorage.getItem("token");

          axios
            .post(
              "https://flipkart-grid-server.vercel.app/api/sale",
              {
                product_serial_number:
                  item?.order_details?.product_serial_number,
              },
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            )
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });

          setTimeout(() => {
            window.location.reload(false);
          }, 2000);

          toast.success("Item Put on sale", {
            position: toast.POSITION.TOP_CENTER,
          });
        } catch (er) {
          console.log("approve error", er);
          return;
        }
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <h6 className="mb-2">
            <span
              style={{
                color: " black",
                opacity: "0.6",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Shipping Address
            </span>
            <StyledText>
              Address:
              <span style={{ width: "50%", textAlign: "left" }}>
                {item?.order_details?.address.line1}
              </span>
            </StyledText>
            <StyledText>
              City:
              <span style={{ width: "50%", textAlign: "left" }}>
                {item?.order_details?.address.city}
              </span>
            </StyledText>
            <StyledText>
              State:
              <span style={{ width: "50%", textAlign: "left" }}>
                {item?.order_details?.address.state}
              </span>
            </StyledText>
            <StyledText>
              Pincode:
              <span style={{ width: "50%", textAlign: "left" }}>
                {item?.order_details?.address.pincode}
              </span>
            </StyledText>
          </h6>
        </div>

        <div
          className="col-md-6"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {item?.order_details?.transferred ? (
            <>
              <button
                className="mb-2 btn btn-primary btn-block"
                disabled
                style={{ width: "230px", cursor: "not-allowed" }}
              >
                Item Already On Sale
              </button>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              {active && account ? (
                <button
                  className="btn btn-primary btn-block"
                  onClick={(e) => handleSale(e)}
                  style={{ width: "220px" }}
                >
                  Put on sale
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-primary btn-block"
                    onClick={(e) => openModal(e)}
                    style={{ width: "220px" }}
                  >
                    Connect Wallet
                  </button>
                  <p style={{ color: "#7971ea" }}>
                    Connect wallet to sell the product
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Order Modal"
      >
        <Wallet />
      </Modal>
    </>
  );
}

export default OrderCardBody;

const StyledText = styled.div`
  opacity: 0.6;
  font-weight: 400;
  color: black;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  margin: 0.6rem 0.5rem;
`;
