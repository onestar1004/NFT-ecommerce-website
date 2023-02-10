import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { storage } from "../../firebase";
import Modal from "react-modal";
import AvatarEditor from "react-avatar-editor";
import { toast } from "react-toastify";
import styled from "styled-components";
import { FiLogIn } from "react-icons/fi";
import { IoCreateOutline } from "react-icons/io5";
import Wallet from "../Wallet/Wallet";
import { useWeb3React } from "@web3-react/core";

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

const connectCustomStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-40%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    zIndex: 10,
  },
};

const Signup = () => {
  const [loading, setLoading] = useState("");

  const history = useHistory();
  const [profileImage, setProfileImage] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [scale, setScale] = useState(1);
  const [isLoginPage, setLoginPage] = useState(true);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [connectModalOpen, setIsConnectModalOpen] = React.useState(false);

  const openConnectModal = (e) => {
    e.preventDefault();
    setIsConnectModalOpen(true);
  };

  const closeConnectModal = () => {
    setIsConnectModalOpen(false);
  };

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
    const uploadTask = storage.ref(`user_images/${val.name}`).put(blob);

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
        // console.log(error);
        alert(error.message);
      },
      () => {
        // complete function ...
        storage
          .ref("user_images")
          .child(val.name)
          .getDownloadURL()
          .then((url) => {
            setProfileImage(url);
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

  const createNewAccount = async () => {
    setLoading(true);

    if (
      profileImage === "" ||
      profileName === "" ||
      email === "" ||
      password === "" ||
      !active ||
      !account
    ) {
      toast.error(
        "Any of the fields cannot be empty! Please fill all the fields!",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      setLoading(false);
      return;
    } else if (!phone.match("[0-9]{10}")) {
      toast.error("Please provide a valid Phone Number!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
      return;
    }

    try {

      var res = await axios({
        method: "POST",
        url: "https://flipkart-grid-server.vercel.app/api/register",
        data: {
          name: profileName,
          email: email,
          phone: phone,
          profile_image: profileImage,
          password: password,
          wallet_address: account,
        },
      });
      localStorage.setItem("token", res.data.token);
      // localStorage.setItem("user_id", res.data.decoded_values._id);
      toast.success("User Registered Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        window.location = '/';
      }, 1000);
    } catch (err) {
      toast.error(`${err.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
    }
  };

  const loginAccount = async () => {
    setLoading(true);

    if (email === "" || password === "") {
      toast.error(
        "Any of the fields cannot be empty! Please fill all the fields!",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      setLoading(false);
      return;
    }

    try {
      var res = await axios({
        method: "POST",
        url: "https://flipkart-grid-server.vercel.app/api/login",
        data: {
          email: email,
          password: password,
        },
      });
      localStorage.setItem("token", res.data.token);
      // localStorage.setItem("user_id", res.data.decoded_values._id);
      toast.success("You Logged In Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        window.location = '/';
      }, 1000);
    } catch (err) {
      toast.error(`${err.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
      return;
    }
  };

  const { active, account } = useWeb3React();

  useEffect(() => {
    if (active && account && connectModalOpen) {
      setIsConnectModalOpen(false);
    }
  }, [active]);

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
          <div className="container" style={{ marginTop: "125px" }}>
            <div className="row justify-content-center">
              <div className="col-12 col-md-3 col-lg-4">
                <TabsContainer
                  className="nav flex-column nav-pills"
                  aria-orientation="vertical"
                >
                  <TabsBtn
                    className={`nav-link ${
                      isLoginPage ? "active" : ""
                    } loginBtn`}
                    onClick={(e) => setLoginPage(true)}
                  >
                    <FiLogIn
                      style={{ fontSize: "1.5rem", marginRight: "15px" }}
                    />
                    Login
                  </TabsBtn>
                  <TabsBtn
                    className={`nav-link ${!isLoginPage ? "active" : ""}`}
                    onClick={(e) => setLoginPage(false)}
                  >
                    <IoCreateOutline
                      style={{ fontSize: "1.5rem", marginRight: "15px" }}
                    />
                    SignUp
                  </TabsBtn>
                </TabsContainer>
              </div>
              <div className="col-12 col-md-1 col-lg-1"></div>
              <div className="col-12 col-md-7 col-lg-6">
                <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                  <div className="intro-content">
                    <span> Get Started</span>
                    <h3 className="mt-3 mb-0">
                      {" "}
                      {isLoginPage ? "Login" : "Create Profile"}
                    </h3>
                  </div>
                </div>

                {isLoginPage ? (
                  <form
                    className="item-form card-1 no-hover"
                    style={{ marginTop: "45px" }}
                  >
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group mt-3">
                          <input
                            type="email"
                            className="form-control"
                            name="price"
                            placeholder="Email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group mt-3">
                          <input
                            type="password"
                            className="form-control"
                            name="price"
                            placeholder="Password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div
                          style={{ justifyContent: "center", display: "flex" }}
                        >
                          <button
                            className="btn  mt-3 mt-sm-4"
                            style={{ zIndex: 0 }}
                            onClick={() => loginAccount()}
                          >
                            Login
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                ) : (
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
                              {image ? image.name : "Profile Image"}
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
                            placeholder="Name"
                            required
                            onChange={(e) => setProfileName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group mt-3">
                          <input
                            type="email"
                            className="form-control"
                            name="price"
                            placeholder="Email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group mt-3">
                          <input
                            type="text"
                            className="form-control"
                            name="phoneNo"
                            placeholder="Phone Number"
                            required
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group mt-3">
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group mt-3">
                          <input
                            placeholder="Wallet Address"
                            disabled
                            required
                            value={account}
                            style={{
                              background: "#b3b3b333",
                              cursor: "not-allowed",
                            }}
                          />
                          <div
                            style={{
                              justifyContent: "center",
                              display: "flex",
                            }}
                          >
                            <button
                              className="btn mt-3 mt-sm-4"
                              style={{ fontSize: "15px" }}
                              onClick={(e) => openConnectModal(e)}
                              disabled={active ? true : false}
                            >
                              {active ? "Connected" : "Connect Wallet"}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div
                          style={{ justifyContent: "center", display: "flex" }}
                        >
                          <button
                            className="btn mt-3 mt-sm-4"
                            style={{ zIndex: 0 }}
                            onClick={() => createNewAccount()}
                          >
                            Create Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
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

      <Modal
        isOpen={connectModalOpen}
        onRequestClose={closeConnectModal}
        style={connectCustomStyles}
      >
        <Wallet />
      </Modal>
    </section>
  );
};

export default Signup;

const TabsContainer = styled.div`
  align-items: center;
  cursor: pointer;
  position: fixed;
  width: 25%;
  .active {
    background-color: #7971ea !important;
  }
  .loginBtn {
    margin-bottom: 20px;
  }
  padding-top: 120px;
  @media (max-width: 767px) {
    position: relative;
    width: 100%;
    padding-top: 0px;
  }
`;

const TabsBtn = styled.div`
  width: 200px;
  text-align: center;
  font-weight: 500;
  border: 1px solid #7971ea;
  color: #7971ea;
`;
