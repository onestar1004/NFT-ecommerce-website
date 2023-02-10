import React from "react";
import Header from "../components/Header/Header";
import ProductDetail from "../components/ProductDetails/Productdetails";
import ModalMenu from "../components/Modal/ModalMenu";

const ProductDetails = (props) => {
  return (
    <div className="main">
      <Header />
      <ProductDetail
        productid={props.match.params.productid}
        state={props.location.state}
      />

      <ModalMenu />

    </div>
  );
};

export default ProductDetails;
