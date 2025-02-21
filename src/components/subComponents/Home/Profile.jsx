import React, { useContext, useState } from "react";
import {  FaExclamationTriangle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import HomeContext from "../../../context/HomeContext";
import getCancelSubscriptionAPI from "../../../api/post";
import {  getUserEmailID } from "../../../services/Storage";
import CopyPromoCode from "./CopyPromoCode";
import CommonContext from "../../../context/CommonContext";
import { MdOutlineLock } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";





const Profile = () => {
  const { getProfileDetails } = useContext(HomeContext);

  const {
    logout,
    secretKey,
    setSecretKey,
    secretKeyVisible,
    setSecretKeyVisible
  } = useContext(CommonContext)


  
 let questionUsagePercentage;
 
 if(getProfileDetails.user_plan === "basic"){
  questionUsagePercentage =
    (getProfileDetails.quest_gen /
      getProfileDetails.total_quest_limit) *
    100;    
 }
  

  const handleSecretKey = () => {
    alert(secretKey);
  }

  const cancelSubscription2 = async () => {
    let email = getUserEmailID();

    let cancelSubcriptionParamters = {
      user_email_id: email,
    };
    try {
      await getCancelSubscriptionAPI
        .post("/cancel_subscription",cancelSubcriptionParamters)
        .then((response) => {          
          if (response.data.status_flag === 200) {
            toast.success(response.data.message);
          } else if (response.data.status_code === 403) {
            toast.error(response.data.error_message);
          } else if(response.data.status_flag === 500){
            toast.error(response.data.message)
          }
        });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const upgradePlan = () => {
    toast.info("This feature will coming soon...!");
  };



  return (
    <>
      <ToastContainer />
      <div className="row ">
        <div className="side-row2-box ">
          <div className="col-12 side-row2 overflow-auto">
            {/* <!-- user container --> */}
            <div className="user-container d-flex align-items-center justify-content-between pt-4">
              <div className="d-flex align-items-center">
              <div className="user-image px-3">
                <img src="https://cdn.adraproductstudio.com/profile.png" alt="profile image" className="profile-icon" />
              </div>
              <div className="user-email-container">
                <label>
                  <b>Email ID</b>
                </label>
                <br />
                <span
                  className="user-email text-wrap"
                  style={{ width: "100%" }}
                >
                  {getProfileDetails.user_email_id
                    ? getProfileDetails.user_email_id
                    : "No Email ID"}
                </span>
              </div>
              </div>
              <div className="me-5 d-block d-sm-none" onClick={logout}>
                <img src="https://cdn.adraproductstudio.com/logout.png" alt="logout-image" width={28}/>
              </div>
            </div>

            {/* <!-- plan container --> */}
            <div className="plan-container justify-content-between p-1 align-items-center  my-3 mb-0 ">
              <div className="border rounded-3 p-2">
                <p>Plan</p>
                <div className="upgrade-container d-flex justify-content-between align-items-center ">
                  <h5 className="d-inline-block my-auto plan">
                    {getProfileDetails.user_plan
                      ? getProfileDetails.user_plan
                      : "No Plan"}
                  </h5>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm custom-outline-button"
                    onClick={() => upgradePlan()}
                  >
                    Upgrade
                  </button>
                </div>

                <div className="d-flex justify-content-between mt-2">
                  {getProfileDetails.message !== "" ? (
                    <>
                      <h4 className="text-warning">
                        <FaExclamationTriangle />
                      </h4>
                      <span className="d-flex text-secondary text-wrap warning-text ms-4">
                        {getProfileDetails.message}
                      </span>
                    </>
                  ) : null}
                </div>
              </div>
            </div>

            {/* <!-- referal code container --> */}
            <div className="referal-code-container p-1">
              <div className="referal-code-border border  rounded-3 p-2 mb-0">
                <div className="code-text mb-3">
                  <label>
                    Refer your friends to us,they will each get 50 Questions
                    packets, on top of that , we will give you 50 Question
                    packets for each friend
                  </label>
                </div>
                <div className="input-group promo-code-container my-2 0">
                    <CopyPromoCode referralCode={getProfileDetails.referal_code}/>
                </div>
              </div>
            </div>

            {/* <!-- remaining questions container --> */}
            <div className="remaining-questions-container p-1">
              <div className="remaining-questions-border border rounded-3 p-2 mb-0">
                <div className="remaining-questions-text-container">
                  <label className="remaining-questions-text">
                    Remaining Questions
                  </label>
                </div>
                <div className="count-container d-flex justify-content-between align-items-center my-2 mb-0">
                  <h5 className="count">
                    {getProfileDetails.quest_gen
                      ? getProfileDetails.quest_gen
                      : 0}{" "}
                    /{" "}
                    {getProfileDetails.total_quest_limit
                      ? getProfileDetails.total_quest_limit
                      : 0}
                  </h5>
                  <p className="quota-usage border border-success p-1 my-auto">
                    {Math.round(questionUsagePercentage ? 100 - questionUsagePercentage:0).toFixed(2)}               
                    % of Quota Used
                  </p>
                </div>
              </div>
            </div>

            {/* <!-- books container --> */}
            <div className="books-container p-1">
              <div className="books-border border  rounded-3 p-2">
                <label className="books-text">Total Uploaded Books</label>
                <div className="count-container d-flex justify-content-between align-items-center my-2 mb-0 ">
                  <h5>
                    {getProfileDetails.no_of_books
                      ? getProfileDetails.no_of_books
                      : "No Books"}
                  </h5>
                </div>
              </div>
            </div>

            {/* <!-- Secret key container --> */}
            {/* <div className="books-container p-1">
              <div className="books-border border  rounded-3 p-2">
                <label className="books-text">Secret key to encryption</label>
                <div className="count-container d-flex justify-content-between align-items-center my-2 mb-0 ">
                <div className="input-group mb-3">
                  <input 
                    type={secretKeyVisible === true ? "text" : "password" } 
                    className="form-control" 
                    placeholder="Secret key" 
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)} 
                    aria-label="Recipient's username" 
                    aria-describedby="basic-addon2" />
                  <span className="input-group-text eye-icon fs-4"  id="basic-addon2" onClick={() => setSecretKeyVisible(!secretKeyVisible)}>
                    { secretKeyVisible === true ? <FaEye /> :<FaEyeSlash /> }
                  </span>
                  <span className="input-group-text lock-icon bg-custom text-light fs-4" id="basic-addon2" onClick={handleSecretKey}>
                   <MdOutlineLock />
                  </span>
              </div>
                </div>
              </div>
            </div> */}

            {/* <!-- cancel subscription --> */}
            <div className="cancel-subscription-container text-center ">
              <a

                className={getProfileDetails.message !== "" ? "cancel-subscription-text cancel-user-select": "cancel-subscription-text"}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                cancel subscription
              </a>
            </div>

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog ">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Cancel Subscription
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body text-center">
                    <img
                      src="https://cdn.adraproductstudio.com/CancelSub.png"
                      className="rounded mx-auto d-block"
                      alt="..."
                      width={200}
                      height={200}
                    />
                    <label className="mt-3">
                      Are you sure you want to cancel your subscription?
                    </label>
                  </div>
                  <hr className="mb-3" />
                  <div className="d-flex justify-content-evenly mb-1 p-2">
                    <div className="d-grid gap-2 w-50 p-1">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        data-bs-dismiss="modal"
                        onClick={() => {
                          cancelSubscription2()
                        }}
                      >
                        Cancel Subscription
                      </button>
                    </div>
                    <div className="d-grid gap-2 w-50 p-1">
                      <button
                        type="button"
                        className="btn btn-primary bg-custom"
                        data-bs-dismiss="modal"
                      >
                        Go Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
