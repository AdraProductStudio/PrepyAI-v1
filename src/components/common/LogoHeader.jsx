import React, { useContext } from "react";
import { TfiClose } from "react-icons/tfi";
import CommonContext from "../../context/CommonContext";
import { useNavigate } from "react-router-dom";

const LogoHeader = () => {
  const {getCloseButton} = useContext(CommonContext)

  const navigate = useNavigate()
  

  return (
    <>
      <div className="row side-row1">
        <div className="d-flex justify-content-center align-items-center ">
            <a href="https://anatomy.adraproductstudio.com/" className="mx-auto" >
                <img src="https://cdn.adraproductstudio.com/adra-white-logo.png" className="img-responsive text-center adra-logo-image" alt="No Logo"/>
            </a>
         
          <button className="btn d-md-none d-block close-btn text-white" onClick={getCloseButton}>
            <TfiClose className="close-icon"/>
          </button>
        </div>
      </div>
    </>
  );
};

export default LogoHeader;


