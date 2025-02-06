import { createContext, useEffect, useState } from "react";
import {
  getUserEmailID,
  removeUserDatas,
  storeUserAPIToken,
} from "../services/Storage";
import getTokenAPI from "../api/get";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CommonContext = createContext({});

export const CommonDataProvider = ({ children }) => {
  const [openButton, setOpenButton] = useState(false);

  const getOpenButton = () => {
    setOpenButton(true);
  };

  const getCloseButton = () => {
    setOpenButton(false);
  };

  const [reGenerateToken, setReGenerateToken] = useState(false);

  const [userToken, setUserToken] = useState(null)

  const [secretKeyVisible, setSecretKeyVisible] = useState(false);
  const [secretKey, setSecretKey] = useState("");

  useEffect(() => {
    const getAPIAuthToken = async () => {      
      try {
        let emailID = getUserEmailID();
        if (emailID !== null) {
          await getTokenAPI
            .get("/gettoken")
            .then((response) => {
              if (response.data.status_code === 201) {
                storeUserAPIToken(response.data.access_token);
                setUserToken(response.data.access_token)
              } else if (response.data.status_code === 403) {
                toast.error(response.data.error_message);
              }
            })
            .catch((err) => {
              (async () => getAPIAuthToken())();
            });
        }
      } catch (err) {
        //Not in 200 response
        if (err.response.status === 401) {
          toast.error("Session Expired...! Please try again...!");
          setReGenerateToken(!reGenerateToken)
          (async () => getAPIAuthToken())();
        } else {
          toast.error(err.message);
        }
      }
    };
    (async () => getAPIAuthToken())();
  }, [reGenerateToken]);

  const navigate = useNavigate();

  const logout = () => {
    removeUserDatas();
    navigate("/");
  };


  if(userToken === null) return

  return (
    <CommonContext.Provider
      value={{
        userToken,
        openButton,
        getOpenButton,
        getCloseButton,
        logout,
        reGenerateToken,
        setReGenerateToken,
        secretKey,
        setSecretKey,
        secretKeyVisible,
        setSecretKeyVisible
        
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

export default CommonContext;
