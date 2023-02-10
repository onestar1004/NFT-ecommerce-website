import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import ProductCard from "../ProductCard/ProductCard";

const Products = () => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://flipkart-grid-server.vercel.app/api/all_products", {
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
      <section className="popular-collections-area">
        <div className="container-fluid">
          <div className="row items product-all-items">
            {products.map((item, idx) => {
              return <ProductCard item={item} key={item.product_id} />;
            })}
          </div>
        </div>
      </section>
    );
  }
};

export default Products;
