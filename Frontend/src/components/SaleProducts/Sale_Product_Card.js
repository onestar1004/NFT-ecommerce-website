import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ item }) {
  return (
    <Link
      key={`cd_${item.product_id}`}
      className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 item"
      to={{ pathname: `/product/${item.product_id}`, state: { sale: true } }}
    >
      <div className="card hover text-center">
        <div
          className="image-over"
          style={{
            minHeight: "200px",
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img
            className="card-img-top"
            src={item.product_data.product_image}
            alt=""
          />
        </div>
        {/* Card Caption */}
        <div className="card-caption p-0">
          {/* Card Body */}
          <div className="card-body">
            <div>
              <h6
                className="mb-2"
                style={{
                  opacity: 0.6,
                  fontWeight: 400,
                  textAlign: "left",
                  padding: "0 6px",
                  overflow: "hidden",
                  textVverflow: "ellipsis",
                  display: "-webkit-box",
                  webkitLineClamp: "2",
                  lineClamp: "2",
                  webkitBoxOrient: "vertical",
                  minHeight: "2.5rem"
                }}
              >
                {item.product_data.product_name.substr(0, 45) ===
                item.product_data.product_name
                  ? item.product_data.product_name
                  : `${item.product_data.product_name.substr(0, 45)}...`}
              </h6>
            </div>
            <div>
              <h5
                style={{
                  fontWeight: 600,
                  textAlign: "left",
                  padding: "4px 6px",
                  margin: "8px 0"
                }}
              >
                {" "}
                ₹ {item.product_data.product_price}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
