import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";
import CommonContext from "../../context/CommonContext";

const DashboardHeader = () => {
  
  const {getOpenButton} = useContext(CommonContext)
  
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-md navbar-light border-bottom  w-100">
          <div className="container-fluid">
            <div className="d-flex justify-content-between d-md-none d-block">
              <button className="btn px-1 py-0 open-btn" onClick={getOpenButton}>
                <FaBars />
              </button>
            </div>
            <a
              className="navbar-brand fs-4 brand-color ms-2"
              
            >
              PrepyAI
            </a>
          </div>
        </nav>
      </header>
    </>
  );
};

export default DashboardHeader;
