import React, { useEffect } from "react";
import contractABI from "../abi.json";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { ContractAddress } from "../core/constant";

function Reference() {
  const web3 = createAlchemyWeb3(
    process.env.REACT_APP_ALCHEMY_ID
  );

  const Contract = new web3.eth.Contract(
    JSON.parse(contractABI.result),
    ContractAddress
  );

  async function mintNFT() {
    //the transaction
    console.log("straing...");
    const tx = {
      from: process.env.REACT_APP_WALLET_ADDRESS,
      to: ContractAddress,
      gas: 500000,
      maxPriorityFeePerGas: 1999999987,
      data: Contract.methods
        .mint(
          "prodtd id5",
          "product name5",
          "categry5",
          85,
          56,
          "0xA776F1523Eb7aEd1ad202Bb924b03A8275B4D4fc",
          "pdssserailno5"
        )
        .encodeABI(),
    };

    const signedTx = await web3.eth.accounts.signTransaction(
      tx,
      process.env.REACT_APP_PRIVATE_KEY
    );

    web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
      function (error, hash) {
        if (!error) {
          console.log(
            "🎉 The hash of your transaction is: ",
            hash,
            "\n Check Alchemy's Mempool to view the status of your transaction!"
          );
        } else {
          console.log(
            "❗Something went wrong while submitting your transaction:",
            error
          );
        }
      }
    );
    // .on("receipt", receipt => console.log("receipt", receipt));
  }

  useEffect(() => {
    const fetchData = async () => {
      const balance = await Contract.methods
        .balanceOf("0xcB39f2b7b0a1f10A6C7A285f6c14C2137F52cd21")
        .call();
      console.log(balance, "bal");

      const nft = await Contract.methods
        .getAllNftsOfUser("0xcB39f2b7b0a1f10A6C7A285f6c14C2137F52cd21")
        .call();
      console.log(nft, "nft");
    };

    fetchData();
  }, []);

  return (
    <div>
      <button onClick={mintNFT}>mint</button>
    </div>
  );
}

export default Reference;
