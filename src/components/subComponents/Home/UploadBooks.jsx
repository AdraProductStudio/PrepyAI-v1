import React, { useState, useRef, useContext } from "react";
import { Modal } from "react-bootstrap";
import { getUserEmailID, getUserAPIToken } from "../../../services/Storage";
import getFileUploadAPI from "../../../api/post";
import { toast } from "react-toastify";
import HomeContext from "../../../context/HomeContext";
import CommonContext from "../../../context/CommonContext";

const UploadBooks = () => {
  const { setUpdateBooks, updateBooks } = useContext(HomeContext);
  const {
    reGenerateToken,
    setReGenerateToken,
    secretKey,
    setSecretKey
  } = useContext(CommonContext)

  const [progressPercentage, setProgressPercentage] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    // if(!secretKey){
    //   toast.error("Please Enter Secret key")
    // }else{
    //   setShow(true);
    // }

    setShow(true);


  }
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const ref = useRef();

  const reset = () => {
    ref.current.value = "";
  };

  const handleUploadBooks = async (event) => {

    try {
      setFileUploadLoading(true);
      const file = event.target.files[0];
      const fileSize = event.target.files[0].size;    
      if (fileSize > 1073741824) {
        toast.error("book size is too large...!");
        reset();
        setFileUploadLoading(false);
        return;
      }
      if (file.name.includes(".pdf")) {
        let email = getUserEmailID();
        let token = getUserAPIToken();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("user_email_id", email);
        formData.append("file_name", file.name);
  
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
          onUploadProgress: function (progressEvent) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgressPercentage(percentCompleted);
          },
        };
  
        
  
        await getFileUploadAPI
          .post("/file_upload", formData, config)
          .then((response) => {
            setProgressPercentage(0);
            setFileUploadLoading(false);
            if (response.data.status_code === 200) {
              toast.error(response.data.message);
              handleShow();
              reset();
            } else if (response.data.status_code === 201) {
              // if bookmark
              // storeBookName(response.data.book_name)
              toast.success(response.data.message);
              handleClose();
              reset();
              setUpdateBooks(!updateBooks);
            } else if (response.data.status_code === 403) {
              toast.error("This PDF does not supported");
            }
          });
      } else {
        toast.error("Unsupported file format, Upload pdf files only");
        handleClose();
        setProgressPercentage(0);
      }
    }catch (err) {
        //Not in 200 response
        if (err.response.status === 401) {
          toast.error("Session Expired...! Please try again...!");
          setReGenerateToken(!reGenerateToken)          
        } else {
          toast.error(err.message);
        }
      }
  
  };

  return (
    <>
      <div className="me-auto bd-highlight" onClick={handleShow}>
        <div className="card p-2 rounded-3 upload-card">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              <img src="https://cdn.adraproductstudio.com/addBook.png" className="add-book-icon" alt="No Logo" width={35} />
            </div>
            <div className="flex-grow-1 ms-3 d-none d-sm-block">
              Add your Book
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        {fileUploadLoading ? (
          <Modal.Header>
            <Modal.Title>Add your book</Modal.Title>
          </Modal.Header>
        ) : (
          <Modal.Header closeButton>
            <Modal.Title>Add your book</Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group files">
                  <input
                    type="file"
                    accept=".pdf"
                    className="form-control"
                    onChange={handleUploadBooks}
                    ref={ref}
                    disabled={fileUploadLoading}
                  />
                  {fileUploadLoading ? (
                    <div className="progress">
                      <div
                        className="progress-bar bg-custom progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        aria-valuenow="100"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: `${progressPercentage}%` }}
                        //  style={{ width: '100%' }}
                      >
                        Loading {progressPercentage}%
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          {/* {!loading && fileUploadResponseMessage !== null ? (
              <p className="text-danger fileUploadError">
                {fileUploadResponseMessage}
              </p>
            ) : null} */}

          <p className="text-secondary">Maximum Uploading Book Size : 1GB</p>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UploadBooks;
