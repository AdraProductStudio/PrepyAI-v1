import React, { useContext, useState } from "react";
import { FaTrash, FaFilePdf } from "react-icons/fa";
import HomeContext from "../../../context/HomeContext";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import { storeBookName } from "../../../services/Storage";

const ListOfBooks = ({ searchPdf }) => {
  const { getProfileDetails, deleteBook } = useContext(HomeContext);

  const [deletingBook, setDeletingBook] = useState('');


  if (getProfileDetails.book_details === undefined) {
    return;
  }

  const getBookName = async (bookName) => {
    storeBookName(await bookName);
  };


  return (
    <>
      {getProfileDetails.book_details.length > 0 ? (
        getProfileDetails.book_details.filter((book) => {
          return book.book_name.toLowerCase().includes(searchPdf.toLowerCase());
        }).length > 0 ? (
          getProfileDetails.book_details
            .filter((book) => {
              return book.book_name
                .toLowerCase()
                .includes(searchPdf.toLowerCase());
            })
            .map((book) => {
              return (
                <React.Fragment key={book.book_name}>
                  <div className="col-lg-3 col-md-6 col-sm-12 my-2 book-card">
                    <div className="card h-100 ">
                      <div className="card-header py-2 bg-white ">
                        <p className="float-start my-auto">
                          {book.no_of_chapter === 0
                            ? <span style={{color:'grey'}}>No Bookmark</span>
                            : `${book.no_of_chapter} Chapters`}
                        </p>
                        <FaTrash
                          className="float-end my-auto text-danger fa-icon fa-delete-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteBook"
                          onClick={()=> setDeletingBook(book.book_name)}
                        />

                        <div
                          className="modal fade"
                          id="deleteBook"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog ">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                                >
                                  Delete Book
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body text-center">
                                <img
                                  src="https://cdn.adraproductstudio.com/delete-img.png"
                                  className="rounded mx-auto d-block"
                                  alt="delete-image"
                                  width={300}
                                  
                                />
                                <label className="mt-3">
                                  Are you sure you want to delete this book?
                                </label>
                              </div>
                              <hr className="mb-3" />
                              <div className="d-flex justify-content-evenly mb-1 p-2">
                                <div className="d-grid gap-2 w-50 p-1">
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={() => deleteBook(deletingBook)}
                                  >
                                    Delete
                                  </button>
                                </div>
                                <div className="d-grid gap-2 w-50 p-1">
                                  <button
                                    type="button"
                                    className="btn btn-primary bg-custom"
                                    data-bs-dismiss="modal"
                                  >
                                    Go Back
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Link
                        className="card-body text-center py-2 text-decoration-none text-dark booksPointer"
                        to={`get_questions/${book.book_name}`}
                        onClick={() => getBookName(book.book_name)}
                      >
                        <div
                          className="d-flex justify-content-start"
                          data-tooltip-id={book.book_name}
                        >
                          <h3 className="card-title text-danger ">
                            <FaFilePdf className="pdfFile" />
                          </h3>
                          &emsp;
                          <p className="card-text my-auto limitSetBookName ">
                            {book.book_name}
                            <ReactTooltip
                              className="toolTipIndex"
                              id={book.book_name}
                              place="bottom"
                              content={book.book_name}
                            />
                          </p>
                        </div>
                      </Link>

                      <div className="card-footer text-muted  ">
                        <p className="float-start my-auto">
                          {book.quest_gen} questions generated
                        </p>
                        <p className="float-end my-auto">
                          {book.Date} days ago
                        </p>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })
        ) : (
          <h1>Search Book is empty</h1>
        )
      ) : (
        <h1>No books Found</h1>
      )}
    </>
  );
};

export default ListOfBooks;
