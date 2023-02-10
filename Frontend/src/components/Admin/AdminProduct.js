import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { storage } from "../../firebase";
import Modal from "react-modal";
import AvatarEditor from "react-avatar-editor";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    border: "none",
    background: "rgb(255 255 255 / 0%)",
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "#2a2a2ac9",
  },
};

const AdminProduct = () => {
  const [loading, setLoading] = useState("");

  const history = useHistory();
  const [productImage, setproductImage] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  const [productbrand, setproductbrand] = useState("");
  const [productprice, setproductprice] = useState("");
  const [productname, setproductname] = useState("");
  const [category, setcategory] = useState("Electronics");
  const [warranty, setwarranty] = useState("");
  const [productquantity, setproductquantity] = useState("");
  const [scale, setScale] = useState(1);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    document.getElementById("inputGroupFile01").value = "";
    setImage("");
  }

  let editor = "";
  const setEditorRef = (ed) => {
    editor = ed;
  };

  const uploadImage = (val, blob) => {
    setImageLoading(true);
    const uploadTask = storage.ref(`product_images/${val.name}`).put(blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function ...
        storage
          .ref("product_images")
          .child(val.name)
          .getDownloadURL()
          .then((url) => {
            setproductImage(url);
            // console.log(url, "this is image url");
            setImageLoading(false);
          });
      }
    );
  };

  const handelImage = (image) => {
    if (setEditorRef) {
      const canvasScaled = editor.getImage();
      // const croppedImg = canvasScaled.toDataURL();
      canvasScaled.toBlob(function (blob) {
        uploadImage(image, blob);
      }, "image/png");
      setIsOpen(false);
    }
  };

  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    setScale(scale);
  };

  const handelFile = (value) => {
    if (value) {
      setImage(value);
      openModal();
    }
  };

  const addnewproduct = async () => {
    setLoading(true);

    if (
      productImage === "" ||
      productname === "" ||
      productbrand === "" ||
      category === "" ||
      productprice === "" ||
      productquantity === "" ||
      warranty === ""
    ) {
      toast.error(
        "Any of the fields cannot be empty! Please fill all the fields!",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      setLoading(false);
      return;
    }

    const data = {
      product_name: productname,
      product_image: productImage,
      category: category,
      warranty_duration: warranty,
      product_price: productprice,
      product_brand: productbrand,
      product_quantity: productquantity,
    };

    const senddata = [data];

    try {
      let token = localStorage.getItem("token");
      let res = await axios.post(
        "https://flipkart-grid-server.vercel.app/admin/add_product",
        { product_data: senddata },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      // localStorage.setItem("user_id", res.data.decoded_values._id);
      toast.success("Product Added Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(res);
      history.push("/");
    } catch (err) {
      console.log(err);
      toast.error(`${err.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
    }
  };

  return (
    <section className="author-area">
      {loading ? (
        <div style={{ height: "60vh" }}>
          <center>
            <div className="fa-3x mt-5 pt-5">
              <i className="fas fa-spinner fa-spin"></i>
            </div>
          </center>
        </div>
      ) : (
        <>
          <div className="container" style={{ marginTop: "80px" }}>
            <div className="row justify-content-center">
              <div className="col-12 col-md-7 col-lg-6 ">
                <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                  <div
                    className="intro-content"
                    style={{ "text-align": "center" }}
                  >
                    <h3 className="mt-3 "> ADD PRODUCT</h3>
                  </div>
                </div>

                <form
                  className="item-form card-1 no-hover"
                  style={{ marginTop: "45px" }}
                >
                  <div className="row">
                    <div className="col-12">
                      <div className=" form-group">
                        <div className="custom-file" style={{ zIndex: 0 }}>
                          <input
                            type="file"
                            name="myImage"
                            className="custom-file-input"
                            id="inputGroupFile01"
                            required
                            onChange={(e) => handelFile(e.target.files[0])}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="inputGroupFile01"
                          >
                            {image ? image.name : "Product Image"}
                          </label>
                        </div>
                      </div>
                    </div>
                    {imageLoading ? (
                      <div
                        className="fa-3x"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "auto",
                        }}
                      >
                        <i className="fas fa-spinner fa-spin"></i>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Product Name"
                          required
                          onChange={(e) => setproductname(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          name="brand"
                          placeholder="Product Brand"
                          required
                          onChange={(e) => setproductbrand(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <select
                          value={category}
                          onChange={(e) => setcategory(e.target.value)}
                        >
                          <option value="Electronics">Electronics</option>
                          <option value="Mobiles">Mobiles</option>
                          <option value="Large Appliances">
                            Large Appliances
                          </option>
                          <option value="Watches">Watches</option>
                          <option value="Headphones">Headphones</option>
                          <option value="Fitness">Fitness</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          name="price"
                          placeholder="Product Price"
                          required
                          onChange={(e) => setproductprice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          name="quantity"
                          placeholder="Product Quantity"
                          required
                          onChange={(e) => setproductquantity(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          name="warranty"
                          placeholder="Warranty Duration (In Days)"
                          required
                          onChange={(e) => setwarranty(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div
                        style={{ justifyContent: "center", display: "flex" }}
                      >
                        <button
                          className="btn mt-3 mt-sm-4"
                          style={{ zIndex: 0 }}
                          onClick={() => addnewproduct()}
                        >
                          Add Product
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div className="modal-dialog modal-dialog-centered" id="profilePic">
          <div className="modal-content">
            <div className="modal-body justify-content-center flex-column ">
              <AvatarEditor
                ref={setEditorRef}
                image={image}
                width={250}
                height={250}
                border={0}
                scale={parseFloat(scale)}
                rotate={0}
              />
              <input
                name="scale"
                type="range"
                onChange={handleScale}
                min="1"
                max="2"
                step="0.01"
                defaultValue="1"
                style={{ maxWidth: "250px" }}
              />
            </div>
            <div className="modal-footer justify-content-center ">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => handelImage(image)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default AdminProduct;
