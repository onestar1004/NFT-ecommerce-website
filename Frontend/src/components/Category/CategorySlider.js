import React, { useRef, useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import ProductCard from "../ProductCard/ProductCard";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const myArrow = ({ type, onClick, isEdge }) => {
  return (
    <StyledArrowButton
      onClick={onClick}
      disabled={isEdge}
      className={type === "PREV" ? "prev-arrow" : "next-arrow"}
    >
      {type === "PREV" ? <BiLeftArrowAlt /> : <BiRightArrowAlt />}
    </StyledArrowButton>
  );
};

function CategorySlider({ category, title = null }) {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://flipkart-grid-server.vercel.app/api/category_products", {
        params: { category: category },
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setproducts(res.data.products);
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        toast.error(`${err.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        history.push("/");
      });
  }, []);

  const carouselRef = useRef();

  return (
    <div
      className="container-fluid"
      style={{ paddingTop: "40px", paddingBottom: "40px" }}
    >
      <div className="row" style={{ justifyContent: "center" }}>
        <div className="col-12 col-md-12 col-lg-11">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Heading4>{title ? title : category}</Heading4>
            </div>
            <div>
              <StyledBtn to={`/category/${category}`}>View all</StyledBtn>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ justifyContent: "center" }}>
        <div className="col-12 col-md-12 col-lg-11">
          <Carousel
            renderArrow={myArrow}
            itemsToShow={6}
            pagination={false}
            ref={carouselRef}
            disableArrowsOnEnd={true}
            breakPoints={[
              { width: 576, itemsToShow: 2 },
              { width: 767, itemsToShow: 4 },
              { width: 991, itemsToShow: 5 },
              { width: 1199, itemsToShow: 6 },
            ]}
          >
            {products.map((item) => (
              <StyledImageContainer key={item.product_id}>
                <ProductCard item={item} />
              </StyledImageContainer>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default CategorySlider;

const StyledImageContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 6px;
`;

const StyledArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  font-size: 1.5em;
  background-color: white;
  color: #7971ea;
  box-shadow: 0 0 2px 0px #333;
  border-radius: 50%;
  border: 1px solid #7971ea !important;
  padding: 0;
  width: 35px;
  height: 34px;
  min-width: 35px;
  line-height: 50px;
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
  cursor: pointer;
  outline: none;

  &.prev-arrow {
    position: absolute;
    left: 10px;
    z-index: 10;
  }

  &.next-arrow {
    position: absolute;
    right: 10px;
    z-index: 10;
  }

  &:focus {
    outline: none;
  }
`;

const Heading4 = styled.h4`
  margin-block-start: 0;
  margin-block-end: 0;
  margin-left: 20px;
  color: #7971ea;
`;

const StyledBtn = styled(Link)`
  margin-right: 20px;
  text-align: center;
  font-weight: 500;
  background: #7971ea;
  border: 1px solid #7971ea !important;
  border-radius: 6px;
  padding: 8px 18px;
  color: white !important;
  line-height: 1;
  &:focus {
    outline: none;
  }
`;
