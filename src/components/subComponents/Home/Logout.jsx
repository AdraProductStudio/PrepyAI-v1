import React, { useContext } from "react";
import CommonContext from "../../../context/CommonContext";

const Logout = () => {
  const {logout} = useContext(CommonContext)
  return (
    <>
      <div className="row align-items-center logout" onClick={logout}>
        <div className="side-row3-box">
          <div className="side-row3 position-relative  ">
                    <div className="position-absolute top-50 start-0 translate-middle-y">
                    <img src="https://cdn.adraproductstudio.com/logout.png" alt="logout image" className="logout-image"/>
                    </div>
            <div className="position-absolute top-50 start-50 translate-middle">
            Logout
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logout;
