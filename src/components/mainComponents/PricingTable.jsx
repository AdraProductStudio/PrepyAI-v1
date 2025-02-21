import React, { useEffect, useState } from "react";
import Footer from "../common/Footer";
import { FaQuestionCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../common/Header";
import { getUserEmailID,getUserData,removeUserDatas } from "../../services/Storage";
import { storeUserAPIToken } from "../../services/Storage";
import axios from "axios";

const PricingTable = () => {

  useEffect(() => {

    const myFun = () => {
      
      let userData = getUserData(); 
        if(userData === null) {
         setTimeout(() => {
            navigate("/")
         },30)
        }
        
    }


    let eID = getUserEmailID();

    let emailEncoded = btoa(eID);
    setUserID(emailEncoded);




    const getCheckOutStatus = async () => {
      try {
        let email = eID;

        await axios
          .post(
            "https://anatomyapi.adraproductstudio.com/get_checkout_status",
            {
              user_email_id: email,
            }
          )
          .then((response) => {
            if (
              response.data.status_flag === 1 &&
              response.data.status_msg === "canceled"
            ) {
              setCheckTraialingStatus("subscription_cancelled");
              navigate("/subscription_plan");
            } else if (response.data.status_flag === 3) {
              setCheckTraialingStatus("subscription_cancelled");
              toast.info(response.data.message);
              navigate("/subscription_plan");
            } else {
              if (response.data.status_flag === 2) {
                navigate("/dashboard");
              } else {
              navigate("/subscription_plan");
              }
            }
          }
          )
        
      } catch (err) {
        if (err.response.status === 401) {
          toast.error("Session Expired...! Please try again...!");
        } else {
          toast.error(err.message);
        }
      }
    };
    (async () => await getCheckOutStatus())();
    myFun()




  }, []);


  const navigate = useNavigate();


  const [basicPricingRange, setBasicPricingRange] = useState("$9.99");
  const [proPricingRange, setProPricingRange] = useState("$19.99");
  const [planKey, setPlanKey] = useState("price_1O5MbfDW6EemFUWr4CQfUpV7");

  const getSubcriptionPlan = (pricingPlan) => {
    if (pricingPlan === "monthly") {
      setBasicPricingRange("$9.99");
      setProPricingRange("$99.99");
      setPlanKey("price_1O5MbfDW6EemFUWr4CQfUpV7");
    } else if (pricingPlan === "yearly") {
      setBasicPricingRange("$99.99");
      setProPricingRange("$199.99");
      setPlanKey("price_1O5N1MDW6EemFUWrDvxUER2t");
    }
  };

  const [userID, setUserID] = useState("");
  const [checkTrialingStatus, setCheckTraialingStatus] = useState("");

  const [userDataNull,setUserDataNull] = useState(false)






  const queryErrorParams = new URLSearchParams(window.location.search);
  const gmailAuthenticationError = queryErrorParams.get("error");

  if (gmailAuthenticationError !== null) {
    toast.error(gmailAuthenticationError);
  }

  const [referralCode, setReferralCode] = useState("");

  const [referralStatusCode, setReferralStatusCode] = useState("");

  const getReferralCode = async () => {
    if (referralCode === "") {
      toast.error("Please Enter Valid Referral Code");
    } else {
      let email = getUserEmailID();

      try {
        await axios
          .post(
            "https://anatomyapi.adraproductstudio.com/referral_code_check",
            {
              referral_code: referralCode,
              user_email_id: email,
            }
          )
          .then((response) => {
            if (response.data.status_code === 200) {
              toast.success(response.data.res);
            } else {
              toast.error(response.data.res);
            }
            setReferralStatusCode(response.data.status_code);
          });
      } catch (err) {
        if (err.response.status === 401) {
          toast.error("Session Expired...! Please try again...!");
        } else {
          toast.error(err.message);
        }
      }
    }
  };


  return (
    <>
      <Header />
      <ToastContainer />
      <div className="container whole-pricing-container d-flex align-items-center justify-content-center   ">
        <div className="row main-container-row">
          <div className="col-sm-4 explore-pricing-container">
            <div className="card h-100 border-0 ">
              <div className="card-body ">
                <main className="position-absolute top-50 start-50 translate-middle w-100 pricing-table-main ">
                  <h3>
                    <b>EXPLORE PRICING PLANS</b>
                  </h3>
                  <img
                    src="https://cdn.adraproductstudio.com/line_2.png"
                    className="img-responsive  mx-auto d-block"
                    width={150}
                    alt="underline-image"
                  />
                  <ol className="list-group mt-5">
                    <li className="list-group-item border-0">
                      <ul
                        className="nav nav-pills mb-3 planDetails justify-content-center"
                        id="pills-tab"
                        role="tablist"
                      >
                        <li className="nav-item border-0" role="presentation">
                          <button
                            className="nav-link active"
                            id="pills-home-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-home"
                            type="button"
                            role="tab"
                            aria-controls="pills-home"
                            aria-selected="true"
                            onClick={() => getSubcriptionPlan("monthly")}
                          >
                            MONTHLY
                          </button>
                        </li>
                        <li className="nav-item border-0" role="presentation">
                          <button
                            className="nav-link"
                            id="pills-profile-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-profile"
                            type="button"
                            role="tab"
                            aria-controls="pills-profile"
                            aria-selected="false"
                            onClick={() => getSubcriptionPlan("yearly")}
                          >
                            YEARLY
                          </button>
                        </li>
                      </ul>
                    </li>
                    <li className="list-group-item border-0">
                      <small className="mt-3">
                        Do you have any referral code?
                      </small>
                    </li>
                    <li className="list-group-item border-0">
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Referral Code"
                          aria-label="Referral Code"
                          aria-describedby="basic-addon2"
                          disabled={referralStatusCode === 200 ? true : false}
                          value={referralCode || ""}
                          onChange={(e) => setReferralCode(e.target.value)}
                        />
                        <span
                          className="input-group-text bg-custom text-white referralCodeInput"
                          id="basic-addon2"
                          // disabled={referralStatusCode === 200 ? true : false}
                          onClick={() => getReferralCode()}
                        >
                          Enter
                        </span>
                      </div>
                    </li>
                    <li className="list-group-item border-0 text-center">
                      <small className="small-text">
                        (You'll get extra 1000 questions after purchasing)
                      </small>
                    </li>
                    <li className="list-group-item border-0 text-center">
                      <a
                        className="text-primary text-decoration-none mt-4  d-flex align-items-center FaQuestionCircle-container"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        <FaQuestionCircle className="FaQuestionCircle" />{" "}
                        &nbsp;&nbsp;
                        <span>
                          how to activate international banking in debit
                        </span>
                      </a>
                    </li>
                  </ol>
                </main>

                <br />

                <div
                  className="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                          Instructions
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <ol className="list-group">
                          <li className="list-group-item d-flex justify-content-between align-items-start">
                            There are two different ways that you can follow to
                            enable international transactions on your debit
                            cards. And they are using the internet banking
                            portal and the mobile banking app of the bank.
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                              <div className="fw-bold">
                                Using Internet Banking
                              </div>
                              <h6 className="mt-2">
                                Follow the instructions given below.
                              </h6>
                              Open the Official Website of the Bank{" "}
                              <i className="text-primary text-arrow">→</i> Login
                              into your Account{" "}
                              <i className="text-primary text-arrow">→</i> Click
                              on Services{" "}
                              <i className="text-primary text-arrow">→</i>{" "}
                              Select Debit Card Services{" "}
                              <i className="text-primary text-arrow">→</i>{" "}
                              Select your Debit Card from the List{" "}
                              <i className="text-primary text-arrow">→</i>
                              Toggle the button of International Transaction to
                              "On" <i className="text-primary text-arrow">
                                →
                              </i>{" "}
                              Click on the "Submit" button.
                            </div>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                              <div className="fw-bold">
                                Using Mobile Banking App
                              </div>
                              <h6 className="mt-2">
                                Follow the instructions given below.
                              </h6>
                              Open the Mobile Banking App of your Bank{" "}
                              <i className="text-primary text-arrow">→</i> Login
                              into your Account{" "}
                              <i className="text-primary text-arrow">→</i> Open
                              Debit Card Services{" "}
                              <i className="text-primary text-arrow">→</i>{" "}
                              Select your Debit Card{" "}
                              <i className="text-primary text-arrow">→</i>{" "}
                              Toggle the Button of International Transactions to
                              "On" <i className="text-primary text-arrow">→</i>{" "}
                              Click on the "Submit" button.
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 plan-card">
            <div className="card h-100 position-relative">
              <div className="card-header py-3 text-white brand-color bg-custom text-center pricing-card-header">
                <h4 className="my-0 text-white ">
                  <b>BASIC</b>
                </h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title text-center mt-2">
                  <b>{basicPricingRange}</b>
                </h1>
                <ul className="mt-3 mb-4 features">
                  <li>Limit : 2000 Questions</li>
                  <li>Any Number of Books</li>
                  <li>Select questions at a Topic Level</li>
                  <li>Trial : 14 days</li>
                </ul>
              </div>
              <div className="card-footer border-top-0">
                <hr className="horizontalRuler " />
                <form
                  action="https://anatomyapi.adraproductstudio.com/create-checkout-session"
                  method="POST"
                >
                  <input type="hidden" name="user_email_id" value={userID} />
                  <input type="hidden" name="plan" value={"YmFzaWM="} />
                  <input
                    type="hidden"
                    name="referal_code"
                    value={referralStatusCode === 200 ? btoa(referralCode) : ""}
                  />
                  <input type="hidden" name="lookup_key" value={planKey} />
                  <button
                    type="submit"
                    className="w-100 btn btn-lg bg-custom text-white"
                  >
                    {checkTrialingStatus === "subscription_cancelled"
                      ? "CHECKOUT"
                      : "Start Free Trial"}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card h-100 coming-soon ">
              <div className="card-header py-3 text-white brand-color bg-custom text-center pricing-card-header">
                <h4 className="my-0 text-white ">
                  <b>PRO</b>
                </h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title text-center mt-2">
                  <b>{proPricingRange}</b>
                </h1>
                <ul className="mt-3 mb-4 features">
                  <li>Limit : 5000 Questions</li>
                  <li>Any Number of Books</li>
                  <li>Select questions at a Title / Chapter / Topic Level</li>
                  <li>Wider Variety of Questions</li>
                  <small>
                    {
                      "(we select the questions from more pages to ensure the 20 questions includes more topics from a chapter/mentioned page numbers)"
                    }
                  </small>
                  <li>
                    Input page numbers to generate questions from specific pages
                  </li>
                  <li>Trial : 14 days</li>
                </ul>
              </div>
              <div className="card-footer border-top-0 ">
                <hr className="horizontalRuler " />
                <button
                  type="button"
                  className="w-100 btn btn-lg bg-custom text-white "
                >
                  COMING SOON
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PricingTable;
