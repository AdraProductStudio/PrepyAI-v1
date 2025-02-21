import React from "react";
const Header = () => {
  return (
    <>
      <nav className="navbar navbar-header navbar-light bg-dark bg-custom fixed-top">
        <div className="container">
          <a className="navbar-brand" href="https://anatomy.adraproductstudio.com/" target="blank">
            <img
              className="sign-in-with-google-logo"
              src="https://cdn.adraproductstudio.com/adra-white-logo.png"
              alt="No Logo"
              rel="noopener noreferrer"
            />
          </a>
        </div>
      </nav>
    </>
  );
};
export default Header;
