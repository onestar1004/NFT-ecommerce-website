import React, { useRef } from "react";
import Carousel from "react-elastic-carousel";
import styled from "styled-components";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

function LargeBanners() {
  const itemsUrls = [
    "https://k.nooncdn.com/cms/pages/20220724/8cdd2318ac00462e41a92f4da2f423ee/en_dk_uae-hero-BEAUTY.jpg",
    "https://k.nooncdn.com/cms/pages/20220725/a9cf976dabcad0337875a37063780f30/en_noon-hero-BGS-01.png",
    "https://k.nooncdn.com/cms/pages/20220715/206a0db1b7625953f7afb536ca2c0743/en_mb-noon-hero-mms-01.png",
  ];

  const carouselRef = useRef();

  const myArrow = ({ type, onClick, isEdge }) => {
    return (
      <StyledArrowButton
        onClick={onClick}
        disabled={isEdge}
        className={type === "PREV" ? "prev-arrow" : "next-arrow"}
      >
        {type === "PREV" ? (
          <MdOutlineKeyboardArrowLeft />
        ) : (
          <MdOutlineKeyboardArrowRight />
        )}
      </StyledArrowButton>
    );
  };

  return (
    <div
      className="container-fluid"
      style={{ paddingTop: "150px", paddingBottom: "40px" }}
    >
      <div className="row" style={{ justifyContent: "center" }}>
        <div className="col-12 col-md-11 col-lg-11">
          <Carousel
            renderArrow={myArrow}
            itemsToShow={1}
            pagination={false}
            ref={carouselRef}
            autoPlaySpeed={4000}
            enableAutoPlay={true}
            disableArrowsOnEnd={false}
          >
            {itemsUrls.map((item, index) => (
              <StyledImageContainer key={index}>
                <img
                  className=""
                  src={item}
                  alt="card-img"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              </StyledImageContainer>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default LargeBanners;

const StyledImageContainer = styled.div`
  height: 350px;
  width: 100%;
`;

const StyledArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  font-size: 1.8em;
  background-color: white;
  color: #7971ea;
  box-shadow: 0 0 2px 0px #333;
  border-radius: 50%;
  border: none !important;
  box-shadow: none !important;
  padding: 0;
  width: 45px;
  height: 45px;
  min-width: 45px;
  line-height: 50px;
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
  cursor: pointer;
  outline: none;

  &.prev-arrow {
    position: absolute;
    left: 2px;
    z-index: 10;
  }

  &.next-arrow {
    position: absolute;
    right: 2px;
    z-index: 10;
  }

  &:focus {
    outline: none;
  }
`;
