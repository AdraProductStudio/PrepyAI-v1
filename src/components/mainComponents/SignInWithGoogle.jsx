import React, { useEffect } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { storeUserData,getUserData,storeUserEmailID } from '../../services/Storage';

const SignInWithGoogle = () => {

  const naviagte = useNavigate();

  const handleReDirectWebPage = () => {    
    window.location.replace(
      "https://anatomyapi.adraproductstudio.com/googleweb"
    );
  };

  const queryParams = new URLSearchParams(window.location.search);
  const gmailAuthenticationToken = queryParams.get("token");
  
  if (gmailAuthenticationToken !== null) {
    storeUserData(gmailAuthenticationToken);
    var uri = window.location.toString();
    if (uri.indexOf("?") > 0) {
      var clean_uri = uri.substring(0, uri.indexOf("?"));
      window.history.replaceState({}, document.title, clean_uri);
    }
  }

  let gAuthtoken = getUserData();
  

  useEffect(() => {
    if(gAuthtoken !==null){
      validateToken(gAuthtoken) 
    }    
  }, [gAuthtoken]);

  const validateToken = async (gToken) => {           

    await axios
      .post("https://www.googleapis.com/oauth2/v1/tokeninfo", {
        access_token: gToken,
      })
      .then((response) => {        
        if (response.data.verified_email) {
          storeUserEmailID(response.data.email);
          naviagte("/dashboard");
        }
      })
      .catch(() => {
        naviagte("/");
      });
  };

  return (
    <>
    <Header/>
    <main className="form-signin d-flex justify-content-center align-items-center vh-100">
        <div className="text-center px-3">
          <h1 className='my-2'>Enhance Exam Preparation</h1>
          <h6 className='my-2'>
            Your AI companion that generates questions from your own textbook
          </h6>
          <button
            type="button"
            className="btn btn-primary btn-sm my-2"
            onClick={handleReDirectWebPage}
          >
            <img
              src="https://appliediiot.com/Google_Signin.png"
              alt="No Logo"
              target="_blank"
              rel="noopener noreferrer"
            />
          </button>
        </div>
      </main>
    <Footer/>
    </>
  )
}

export default SignInWithGoogle