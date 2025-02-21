import React from "react";

const SearchBooks = ({searchPdf,setSearchPdf,inputRef}) => {
  return (
    <>
      <div className="p-3 bd-highlight">
        <input
          ref={inputRef}
          type="text"
          className="form-control "
          placeholder="Search pdf..."
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={searchPdf}
          onChange={(e) => setSearchPdf(e.target.value)}
        />
      </div>
    </>
  );
};

export default SearchBooks;
