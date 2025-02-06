import React, {  useContext, useEffect } from "react";
import DashboardHeader from "../../common/DashboardHeader";
import DashboardFooter from "../../common/DashboardFooter";
import DisplayHomeSidebar from "../../subComponents/Home/DisplayHomeSidebar";
import DisplayBooks from "../../subComponents/Home/DisplayBooks";
import CommonContext from "../../../context/CommonContext";
import { DataHomeContextProvider } from "../../../context/HomeContext";
import { toast } from "react-toastify";
import { getUserData } from "../../../services/Storage";
import { useNavigate } from "react-router-dom";


const Home = () => {

  const { openButton } = useContext(CommonContext);

    const queryErrorParams = new URLSearchParams(window.location.search);
    const pricingSuccessToast = queryErrorParams.get("msg");
  
    if (pricingSuccessToast !== null) {
      var uri = window.location.toString();
      if (uri.indexOf("?") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("?"));
        window.history.replaceState({}, document.title, clean_uri);
      }
    }
  
    if (pricingSuccessToast !== null) {    
      toast.success(pricingSuccessToast);
    }   
    
    
    
    

    // if(isAuthenticated() === false){
      
    //   return <Navigate to="/" replace={true}/>
    // }

  return (
    <>
      <DataHomeContextProvider>
        <div className="container-fluid">
          <div className="row">
            {/* left column */}
            <div
              className={
                openButton
                  ? "col-lg-3 col-12 left-column active"
                  : "col-lg-3 col-12 left-column"
              }
            >
              <DisplayHomeSidebar />
            </div>

            {/* right column */}
            <div className="col-lg-9 col-12 right-column">
              <DashboardHeader />

              <DisplayBooks />

              <DashboardFooter />
            </div>
          </div>
        </div>
      </DataHomeContextProvider>
    </>
  );
};

export default Home;
