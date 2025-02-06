import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getUserAPIToken } from "../services/Storage";

const authUser = () => {
  const user = {
    login: getUserAPIToken() == null ? false : true,
  };
  return user && user.login;
};

const NavigateDashboard = () => {
  const navigate = useNavigate();
  navigate("/");
};

const Protect = () => {
  const auth = authUser();

  return auth ? <Outlet /> : <Navigate to="/"/>;
};

export default Protect;
