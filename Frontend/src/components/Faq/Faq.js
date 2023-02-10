import React from "react";

const data = [
  {
    id: "1",
    btnClass: "btn d-block text-left w-100 py-4",
    target: "#collapseOne",
    quote: "How can I buy the products from Flipkart?",
    contentId: "collapseOne",
    contentClass: "collapse show",
    content:
      'Go to the "Shop" section and search for the product you want to buy. Click on buy now. Fill in your address and card details and proceed to pay. Voila, the product is yours now.',
  },
  {
    id: "2",
    btnClass: "btn d-block text-left w-100 collapsed py-4",
    target: "#collapseTwo",
    quote: "Can I sell my purchases on this website?",
    contentId: "collapseTwo",
    contentClass: "collapse",
    content:
      'You can sell your purchases as NFTs to other users. Go to the "My Orders" section and go to the product which you want to sell. Connect your metamask wallet to appove that you want to sale and you are done. Your product will now be displayed in the "Sale" section for others to buy',
  },
  {
    id: "3",
    btnClass: "btn d-block text-left w-100 collapsed py-4",
    target: "#collapseThree",
    quote: "What happens when the warranty period is up?",
    contentId: "collapseThree",
    contentClass: "collapse",
    content:
      'All the warranty details are available in the custom NFT generated for you. You can find it in the "My Orders" section. Once the warranty is up, it gets mentioned in the NFT and this NFT becomes void which will stop users from claiming false warranties.',
  },
  {
    id: "4",
    btnClass: "btn d-block text-left w-100 collapsed py-4",
    target: "#collapseFour",
    quote: "I am a retailer. How can I sell my goods here?",
    contentId: "collapseFour",
    contentClass: "collapse",
    content:
      'Contact Flipkart. After you are approved as a seller, you will be given an admin account through which you can easily sell your goods. Go to your profile and click on "Add product". List all the relevant information and submit. Now this product will be up for sale for other users to buy.',
  },
];

const Faq = () => {
  return (
    <section className="faq-area pt-0" style={{ marginTop: "60px" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-7">
            {/* Intro */}
            <div className="intro text-center">
              <h3 className="mt-3 mb-0">Frequently Asked Questions</h3>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12">
            {/* FAQ Content */}
            <div className="faq-content">
              {/* Netstorm Accordion */}
              <div className="accordion" id="netstorm-accordion">
                <div className="row justify-content-center">
                  <div className="col-12 col-md-10">
                    {/* Single Accordion Item */}
                    {data.map((item, idx) => {
                      return (
                        <div
                          key={`fd_${idx}`}
                          className="single-accordion-item p-3"
                        >
                          {/* Card Header */}
                          <div className="card-header bg-inherit border-0 p-0">
                            <h2 className="m-0">
                              <button
                                className={item.btnClass}
                                type="button"
                                data-toggle="collapse"
                                data-target={item.target}
                              >
                                {item.quote}
                              </button>
                            </h2>
                          </div>
                          <div
                            id={item.contentId}
                            className={item.contentClass}
                            data-parent="#netstorm-accordion"
                          >
                            {/* Card Body */}
                            <div className="card-body py-3">{item.content}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
