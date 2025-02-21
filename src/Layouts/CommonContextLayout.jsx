import React from "react";
import { CommonDataProvider } from "../context/CommonContext";
import { Outlet } from "react-router-dom";

const CommonContextLayout = () => {
  return (
    <CommonDataProvider>
      <Outlet />
    </CommonDataProvider>
  );
};

export default CommonContextLayout;
