import React from "react";
import Header from "../components/Header/Header";
import EachCategory from "../components/Categories/EachCategory";

import ModalMenu from "../components/Modal/ModalMenu";

const Category = (props) => {
  return (
    <div className="main">
      <Header />
      <EachCategory category = {props.match.params.category}/>
  
      <ModalMenu />
    </div>
  );
};

export default Category;
