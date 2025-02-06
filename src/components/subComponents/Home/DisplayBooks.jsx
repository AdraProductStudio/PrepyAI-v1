import React, {  useEffect, useRef, useState } from "react";
import UploadBooks from "./UploadBooks";
import SearchBooks from "./SearchBooks";
import ListOfBooks from "./ListOfBooks";

const DisplayBooks = () => {
  const [searchPdf, setSearchPdf] = useState("");
  const inputRef = useRef();


  useEffect(() => {
    inputRef.current.focus();
  },[])

  return (
    <>
      <main className="container">
        {/* <!-- action field container --> */}
        <div className="action-field-container border-bottom w-100">
          <div className="d-flex bd-hightlight align-items-center ">
            <UploadBooks />
            <SearchBooks searchPdf={searchPdf} setSearchPdf={setSearchPdf} inputRef={inputRef}/>
          </div>
        </div>

        {/* <!-- action container --> */}
        <div className="action-container overflow-auto ">
          <div className="row action-container-row  pt-2 w-100">
              <ListOfBooks searchPdf={searchPdf} setSearchPdf={setSearchPdf}/>
          </div>
        </div>
      </main>
    </>
  );
};

export default DisplayBooks;
