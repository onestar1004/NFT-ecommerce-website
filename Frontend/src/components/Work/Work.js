import React, { Component } from "react";
class Work extends Component {
  state = {
    data: {
      preHeading: "How It Works",
      // heading: "Create and sell your NFTs",
    },
    workData: [
      {
        id: 1,
        icon: "icons icon-wallet text-effect",
        title: "Shop",
        text: "Go to the Shop section and pick the product of your choice. Click on buy now and fill in the relevant details. After successful payment, you will get an NFT and the product  will be shipped to you at the earliest.",
      },
      {
        id: 2,
        icon: "icons icon-grid text-effect",
        title: "Check your collection",
        text: 'Go to "My Orders" and check your NFT collection along with all its details..',
      },
      {
        id: 3,
        icon: "icons icon-bag text-effect",
        title: "Sell your collection",
        text: 'Go to "My Orders" and select the product you wish to sell. Connect your Metamask wallet and proceed. Now you can put up your product for sale',
      },
      {
        id: 4,
        icon: "icons icon-drawer text-effect",
        title: "Sell as a retailer",
        text: 'Click "Add Product" and add your products for sale.',
      },
    ],
  };
  componentDidMount() {}

  render() {
    return (
      <section className="work-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Intro */}
              <div className="intro mb-4">
                <div className="intro-content">
                  <span>{this.state.data.preHeading}</span>
                  <h3 className="mt-3 mb-0">{this.state.data.heading}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row items">
            {this.state.workData.map((item, idx) => {
              return (
                <div
                  key={`wd_${idx}`}
                  className="col-12 col-sm-6 col-lg-3 item"
                >
                  {/* Single Work */}
                  <div className="single-work">
                    <i className={item.icon} />
                    <h4
                      style={{
                        backgroundImage:
                          "linear-gradient(150deg, #5045e2 0%, #6919d9 78%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default Work;
