import React, { useContext } from "react";

import CommonContext from "../../../context/CommonContext";
import { useNavigate } from "react-router-dom";
import { LuHome } from "react-icons/lu";
import { AiOutlineLogout } from "react-icons/ai";

const BackToHomeAndLogout = () => {

  const {logout} = useContext(CommonContext)

  const navigate = useNavigate()


  const backtoHome = () => {    
    navigate("/dashboard")
  }

  return (
    <>
      <div className="row align-items-center  backToHome-and-logout ">
        <div className="side-row3-box ">
          <ul className="list-group p-0 mt-0">
            <li className="list-group-item p-1  text-center back-to-home" onClick={backtoHome}>
              <img
                src="https://cdn.adraproductstudio.com/house.png"
                alt="logout image"
                className="float-start home-icon"
                width={25}
              />
              {/* <LuHome className="float-start home-icon brand-color fs-5 ms-2" width={25}/> */}
              <span className="home-span">Home</span>
            </li>
            <li className="list-group-item p-1 mt-1 text-center quiz-page-logout" onClick={logout}>
              <img
                src="https://cdn.adraproductstudio.com/logout.png"
                alt="logout image"
                className="float-start logout-icon"
                width={25}
              />
              {/* <AiOutlineLogout className="float-start home-icon brand-color fs-5 ms-2" width={25}/> */}
              <span className="logout-span">Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default BackToHomeAndLogout;
