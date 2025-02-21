import { createContext, useEffect, useState } from "react";
import {
  getUserAPIToken,
  getUserEmailID,
  removeTitleName,
} from "../services/Storage";
import getDeleteBookAPI from "../api/post";
import getBookAPI from '../api/post';
import { toast } from "react-toastify";
import axios from "axios";

const HomeContext = createContext({});

export const DataHomeContextProvider = ({ children }) => {
  const [getProfileDetails, setGetProfileDetails] = useState([]);

  const [updateBooks, setUpdateBooks] = useState(false);  

  useEffect(() => {
    const getProfileDetails = async () => {      
      let emailID = getUserEmailID();
      let token = getUserAPIToken();

      let getProfileDetailsParameters = {
        user_email_id: emailID,
      };
      try {
        await getBookAPI
          .post("/get_book", getProfileDetailsParameters, 
          {
            headers: { 
              Authorization: `Bearer ${token}`,
             },
          }
          )
          .then((response) => {            
            if (response.data.status_code === 200) {
              setGetProfileDetails(response.data);
            } else if (response.data.status_code === 403) {
              toast.error(response.data.error_message);
            }
          });
      } catch (err) {
        if (err.response.status === 401) {
          toast.error("Session Expired...! Please try again...!");
        } else {
          toast.error(err.message);
        }
      }
    };
    (async () => getProfileDetails())();

    removeTitleName();
  }, [updateBooks]);

  const deleteBook = async (book) => {
    let email = getUserEmailID();
    let token = getUserAPIToken();
    let deleteBookParameters = {
      user_email_id: email,
      book_name: book,
    };
    try {
      await getDeleteBookAPI
        .post("/delete_book", deleteBookParameters,{
            headers : {
              Authorization : `Bearer ${token}`
            }
        })
        .then((response) => {
          if (response.data.status_code === 200) {
            toast.success(response.data.message);
            setUpdateBooks(!updateBooks);
          } else if (response.data.status_code === 403) {
            toast.error(response.data.error_message);
          }
        });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <HomeContext.Provider
      value={{ getProfileDetails, setUpdateBooks, updateBooks, deleteBook }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContext;
