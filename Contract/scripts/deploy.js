const { ethers } = require("hardhat");

async function main() {
  const nftContract = await ethers.getContractFactory("ItemNFT_V1");

  // here we deploy the contract
  const deployedNFTContract = await nftContract.deploy("FLIP_SHOP", "FSN");

  // print the address of the deployed contract
  console.log("NFT Contract Address:", deployedNFTContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
