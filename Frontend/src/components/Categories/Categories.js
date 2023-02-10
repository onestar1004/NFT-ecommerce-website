import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { FaHeadphonesAlt } from "react-icons/fa";
import { BiMobileAlt } from "react-icons/bi";
import { BsSmartwatch, BsLaptop } from "react-icons/bs";
import { IoIosFitness } from "react-icons/io";
import { RiFridgeLine } from "react-icons/ri";
import styled from "styled-components";

const Icons = ({ item }) => {
  switch (item) {
    case "Electronics":
      return <BsLaptop style={{ fontSize: "2.5rem", marginBottom: "12px" }} />;
    case "Headphones":
      return (
        <FaHeadphonesAlt style={{ fontSize: "2.5rem", marginBottom: "12px" }} />
      );
    case "Mobiles":
      return (
        <BiMobileAlt style={{ fontSize: "2.5rem", marginBottom: "12px" }} />
      );
    case "Watches":
      return (
        <BsSmartwatch style={{ fontSize: "2.5rem", marginBottom: "12px" }} />
      );
    case "Fitness":
      return (
        <IoIosFitness style={{ fontSize: "2.5rem", marginBottom: "12px" }} />
      );
    case "Large Appliances":
      return (
        <RiFridgeLine style={{ fontSize: "2.5rem", marginBottom: "12px" }} />
      );
    default:
      return null;
  }
};

const Categories = () => {
  const [categories, setcategories] = useState([]);
  const [loading, setloading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://flipkart-grid-server.vercel.app/api/all_category", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // console.log(res);
        setcategories(res.data.all_category);
        setloading(false);
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setloading(false);
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
      <section style={{ marginTop: "30px", marginBottom: "30px" }}>
        <div className="container-fluid">
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-12 col-md-12 col-lg-11">
              <div className="row items">
                {categories.map((item, idx) => {
                  return (
                    <Link
                      className="col-6 col-sm-4  col-md-3  col-lg-2 item"
                      to={`/category/${item}`}
                      style={{ height: "190px" }}
                      key={idx}
                    >
                      <StyleCard className="card hover">
                        <div
                          className="single-seller d-flex align-items-center"
                          style={{ flexDirection: "column" }}
                        >
                          <Icons item={item} />
                          <div className="seller-info">
                            <div className="d-flex" style={{ fontWeight: 500 }}>
                              <div>{item}</div>
                            </div>
                          </div>
                        </div>
                      </StyleCard>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Categories;

const StyleCard = styled.div`
  color: #7971ea;
  padding: 0.8rem;
  justify-content: center;
  text-align: center;
`;
