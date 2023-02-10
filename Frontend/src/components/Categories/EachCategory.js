import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import ProductCard from "../ProductCard/ProductCard";

const Category = (props) => {
  const category = props.category;

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
        console.log(err);
        setloading(false);
        toast.error(`${err.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        history.push("/");
      });
  }, [category]);

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
      <section
        className="popular-collections-area"
        style={{ marginTop: "100px" }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {/* Intro */}
              <div className="intro d-flex justify-content-between align-items-end m-0">
                <div className="intro-content">
                  <h3 className="mt-0 mb-3">{category}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row items">
            {products.map((item, idx) => {
              return <ProductCard item={item} key={item.product_id} />;
            })}
          </div>
        </div>
      </section>
    );
  }
};

export default Category;
