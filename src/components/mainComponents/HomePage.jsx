import React, { useEffect } from "react";
import Home from "../subComponents/Home/Home";
import { CommonDataProvider } from "../../context/CommonContext";
import {  isAuthenticated } from "../../services/Auth";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getUserData } from "../../services/Storage";

const HomePage = () => {

  const navigate = useNavigate()

  let isAuth = isAuthenticated();

  useEffect(() => {
    const myFun = () => {
      
      let userData = getUserData(); 
        if(userData === null) {
         setTimeout(() => {
            navigate("/")
         },30)
        }
    }

    myFun();

  },[])
  
      
  return (
    <>    
      <CommonDataProvider>
        {/* {isAuth === false ? navigate('/'): <Home />} */}
        <Home />
      </CommonDataProvider>   
    </>
  );
};

export default HomePage;
