import React from "react";
import LogoHeader from "../../common/LogoHeader";
import Profile from "./Profile";
import Logout from "./Logout";

const DisplayHomeSidebar = () => {
  return (

      <>
        <LogoHeader/>

        <Profile />

        <Logout/>
      </>

  );
};

export default DisplayHomeSidebar;
