import React, { useContext, useState } from "react";
import QuizContext from "../../../context/QuizContext";
import { storeTitleName } from "../../../services/Storage";
import CommonContext from "../../../context/CommonContext";
import { Tooltip as ReactTooltip } from "react-tooltip";


const ListOfChapters = () => {
  const {
    setInitialQuestionsView,
    getChaptersHistory,
    setPageNo,
    setTitleName,
    setOptionsSubmitted,
    setGetListOfQuestions,
    setShowSubmit,
    getBookMarksData,
    getPageNumbers,
    loadingImage,
    chaptersLoadingImage,

    // phase 2
    longQuestionsData, setLongQuestionsData,aiQuestionAnswer,setAiQuestionAnswer
  } = useContext(QuizContext);

  const { getCloseButton } = useContext(CommonContext);

  const [active,setActive] = useState(null)

  let pageNumbers = {};

  if (getPageNumbers.length === 0) {
    return;
  } else {
    pageNumbers = getPageNumbers.page_nos;
  }

  const getQuestionsView = (title, pageno, endPageNo) => {
    if (
      pageno ===
      pageNumbers[Object.keys(pageNumbers)[Object.keys(pageNumbers).length - 1]]
    ) {     
      setPageNo({
        page_no: pageno,
        title: title,
        endPageNo: getBookMarksData.totalPage,
      });
      
    } else {
      setPageNo({
        page_no: pageno,
        title: title,
        endPageNo: endPageNo,
      });
    }

    
    storeTitleName(title);

    setInitialQuestionsView(true);
    setTitleName(title);
    getChaptersHistory(title);
    setOptionsSubmitted(false);
    setGetListOfQuestions([]);
    setShowSubmit(false);
    getCloseButton();
  };

  return (
    <>
      <div className="row list-of-chapters-container">
        <div className={loadingImage ? "side-row2-box user-pointer-none" : "side-row2-box "}>
          <div className="col-12 side-row2 overflow-auto">


            { chaptersLoadingImage ? 
                            <div className="d-flex justify-content-center align-items-center h-100 ">
                            <div className="spinner-border brand-color" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                            </div> 
                            : 
                          <>
                            <div className="card test chapter-title">
                              <div className="card-body d-flex justify-content-between"
                                data-tooltip-id={getBookMarksData.bookName}>
                                {getBookMarksData.bookName.length > 25
                                ? getBookMarksData.bookName.slice(0, 15) + "...pdf "
                                : getBookMarksData.bookName}
                                <ReactTooltip className="toolTipIndex" id={getBookMarksData.bookName}
                                  place="bottom" content={getBookMarksData.bookName} />
                                <p className="fw-normal ">Pg.no</p>

                              </div>
                            </div>

                            
                            <div className="container-fluid px-0 ">
                              {getBookMarksData.bookMark !== "" ? (
                                getBookMarksData.bookMark.map((chapters, index) => {
                                  return chapters.sub_chapter_level_1 !== undefined ? (
                                    <React.Fragment key={index}>
                                      <div
                                        className="accordion"
                                        id={`accordionExample${chapters.index}`}
                                        key={chapters.index}
                                      >
                                        <div className="accordion-item">
                                          <h2 
                                            className={`accordion-item ${active == chapters && "active"}   accordion-header`}
                                            id={`heading${chapters.index}`}
                                            onClick={() => {
                                              let next_chapter_index =
                                                chapters.sub_chapter_level_1.length - 1;
                                              let next_index =
                                                parseInt(
                                                  chapters.sub_chapter_level_1[
                                                    next_chapter_index
                                                  ].index
                                                ) + 1;
                                              getQuestionsView(
                                                chapters.title,
                                                chapters.main_page_no,
                                                pageNumbers[next_index]
                                              );
                                              setActive(chapters)
                                            }}
                                          >
                                            <button
                                              className="accordion-button collapsed"
                                              type="button"
                                              data-bs-toggle="collapse"
                                              data-bs-target={`#collapse${chapters.index}`}
                                              aria-expanded="true"
                                              aria-controls={`collapse${chapters.index}`}

                                            >
                                              {chapters.title}
                                              <span className="badge rounded-pill text-dark fw-normal">
                                                {chapters.page_no}
                                              </span>
                                            </button>
                                          </h2>

                                          <div
                                            id={`collapse${chapters.index}`}
                                            className="accordion-collapse collapse "
                                            aria-labelledby={`heading${chapters.index}`}
                                            data-bs-parent={`#accordionExample${chapters.index}`}
                                          >
                                            <div className="accordion-body px-1 py-0">
                                              {chapters.sub_chapter_level_1.map(
                                                (subChapterLevel1, index) => {
                                                  return (
                                                    <React.Fragment key={index}>
                                                      {subChapterLevel1.sub_chapter_level_2 !==
                                                      undefined ? (
                                                        <div
                                                          className="accordion "
                                                          id={`accordion${subChapterLevel1.index}`}
                                                        >
                                                          <div className="accordion-item">
                                                            <h2
                                                              className={`accordion-item ${active == subChapterLevel1 && "active"}  accordion-header`} 
                                                              id={`heading${subChapterLevel1.index}`}
                                                              onClick={() => {
                                                                getQuestionsView(
                                                                  subChapterLevel1.title,
                                                                  subChapterLevel1.page_no,
                                                                  pageNumbers[
                                                                    parseInt(
                                                                      subChapterLevel1.index
                                                                    ) + 1
                                                                  ]
                                                                );
                                                                setActive(subChapterLevel1)
                                                              }}
                                                              
                                                            >
                                                              <button
                                                                className="accordion-button collapsed"
                                                                type="button"
                                                                data-bs-toggle="collapse"
                                                                data-bs-target={`#sub-collapse${subChapterLevel1.index}`}
                                                                aria-expanded="true"
                                                                aria-controls="collapseOne"
                                                              >
                                                                {subChapterLevel1.title}
                                                              </button>
                                                            </h2>
                                                            <div
                                                              id={`sub-collapse${subChapterLevel1.index}`}
                                                              className="accordion-collapse collapse "
                                                              aria-labelledby="sub-headingOne"
                                                              data-bs-parent={`#accordion${subChapterLevel1.index}`}
                                                            >
                                                              <div className="accordion-body px-1 py-0">
                                                                {subChapterLevel1.sub_chapter_level_2.map(
                                                                  (subChapterLevel2, index) => {
                                                                    return (
                                                                      <React.Fragment
                                                                        key={index}
                                                                      >
                                                                        {subChapterLevel2.sub_chapter_level_3 !==
                                                                        undefined ? (
                                                                          <>
                                                                            <div
                                                                              className="accordion"
                                                                              id={`accordion${subChapterLevel2.index}`}
                                                                            >
                                                                              <div className="accordion-item">
                                                                                <h2
                                                                                  className={`accordion-item ${active == subChapterLevel2 && "active"}  accordion-header`}
                                                                                  id={`heading${subChapterLevel2.index}`}
                                                                                  onClick={() => {
                                                                                    getQuestionsView(
                                                                                      subChapterLevel2.title,
                                                                                      subChapterLevel2.page_no,
                                                                                      pageNumbers[
                                                                                        parseInt(
                                                                                          subChapterLevel2.index
                                                                                        ) + 1
                                                                                      ]
                                                                                    );
                                                                                    setActive(subChapterLevel2)
                                                                                  }}
                                                                                >
                                                                                  <button
                                                                                    className="accordion-button collapsed"
                                                                                    type="button"
                                                                                    data-bs-toggle="collapse"
                                                                                    data-bs-target={`#sub-collapse${subChapterLevel2.index}`}
                                                                                    aria-expanded="true"
                                                                                    aria-controls="collapseOne"
                                                                                  >
                                                                                    {
                                                                                      subChapterLevel2.title
                                                                                    }
                                                                                  </button>
                                                                                </h2>
                                                                                <div
                                                                                  id={`sub-collapse${subChapterLevel2.index}`}
                                                                                  className="accordion-collapse collapse "
                                                                                  aria-labelledby="sub-headingOne"
                                                                                  data-bs-parent={`#accordion${subChapterLevel2.index}`}
                                                                                >
                                                                                  <div className="accordion-body px-1 py-0">
                                                                                    {subChapterLevel2.sub_chapter_level_3.map(
                                                                                      (
                                                                                        subChapterLevel3,
                                                                                        index
                                                                                      ) => {
                                                                                        return subChapterLevel3.sub_chapter_level_4 !==
                                                                                          undefined ? (
                                                                                          <div
                                                                                            className="accordion"
                                                                                            id={`accordian${subChapterLevel3.index}`}
                                                                                            key={
                                                                                              index
                                                                                            }
                                                                                          >
                                                                                            <div className="accordion-item">
                                                                                              <h2
                                                                                                className={`accordion-item ${active == subChapterLevel3 && "active"}  accordion-header`}
                                                                                                id={`heading${subChapterLevel3.index}`}
                                                                                                onClick={() => {
                                                                                                  getQuestionsView(
                                                                                                    subChapterLevel3.title,
                                                                                                    subChapterLevel3.page_no,
                                                                                                    pageNumbers[
                                                                                                      parseInt(
                                                                                                        subChapterLevel3.index
                                                                                                      ) +
                                                                                                        1
                                                                                                    ]
                                                                                                  );
                                                                                                  setActive(subChapterLevel3)
                                                                                                }}
                                                                                              >
                                                                                                <button
                                                                                                  className="accordion-button collapsed"
                                                                                                  type="button"
                                                                                                  data-bs-toggle="collapse"
                                                                                                  data-bs-target={`#collapse${subChapterLevel3.index}`}
                                                                                                  aria-expanded="true"
                                                                                                  aria-controls="collapseOne"
                                                                                                >
                                                                                                  {
                                                                                                    subChapterLevel3.title
                                                                                                  }
                                                                                                </button>
                                                                                              </h2>
                                                                                              <div
                                                                                                id={`collapse${subChapterLevel3.index}`}
                                                                                                className="accordion-collapse collapse "
                                                                                                aria-labelledby="sub-headingOne"
                                                                                                data-bs-parent={`#accordian${subChapterLevel3.index}`}
                                                                                              >
                                                                                                <div className="accordion-body px-1 py-0">
                                                                                                  {subChapterLevel3.sub_chapter_level_4.map(
                                                                                                    (
                                                                                                      subChapterLevel4,
                                                                                                      index
                                                                                                    ) => {
                                                                                                      return (
                                                                                                        <React.Fragment
                                                                                                          key={
                                                                                                            index
                                                                                                          }
                                                                                                        >
                                                                                                          <ul className="list-group ">
                                                                                                            <li
                                                                                                              className={`list-group-item ${active == subChapterLevel4 && "active"}  d-flex justify-content-between align-items-start`}
                                                                                                              key={
                                                                                                                subChapterLevel4.index
                                                                                                              }
                                                                                                              onClick={() => {
                                                                                                                setLongQuestionsData([])
                                                                                                                setAiQuestionAnswer(null)
                                                                                                                getQuestionsView(
                                                                                                                  subChapterLevel4.title,
                                                                                                                  subChapterLevel4.page_no,
                                                                                                                  pageNumbers[
                                                                                                                    parseInt(
                                                                                                                      subChapterLevel4.index
                                                                                                                    ) +
                                                                                                                      1
                                                                                                                  ]
                                                                                                                );
                                                                                                                setActive(subChapterLevel4)
                                                                                                              }}
                                                                                                            >
                                                                                                              <div className="ms-2 me-auto">
                                                                                                                <div>
                                                                                                                  {
                                                                                                                    subChapterLevel4.title
                                                                                                                  }
                                                                                                                </div>
                                                                                                              </div>
                                                                                                              <span className="badge rounded-pill text-dark fw-normal">
                                                                                                                {
                                                                                                                  subChapterLevel4.page_no
                                                                                                                }
                                                                                                              </span>
                                                                                                            </li>
                                                                                                          </ul>
                                                                                                        </React.Fragment>
                                                                                                      );
                                                                                                    }
                                                                                                  )}
                                                                                                </div>
                                                                                              </div>
                                                                                            </div>
                                                                                          </div>
                                                                                        ) : (
                                                                                          <ul className="list-group">
                                                                                            <li
                                                                                              className={`list-group-item ${active == subChapterLevel3 && "active"}  d-flex justify-content-between align-items-start`}
                                                                                              key={
                                                                                                subChapterLevel3.index
                                                                                              }
                                                                                              onClick={() => {
                                                                                                setLongQuestionsData([])
                                                                                                setAiQuestionAnswer(null)
                                                                                                getQuestionsView(
                                                                                                  subChapterLevel3.title,
                                                                                                  subChapterLevel3.page_no,
                                                                                                  pageNumbers[
                                                                                                    parseInt(
                                                                                                      subChapterLevel3.index
                                                                                                    ) +
                                                                                                      1
                                                                                                  ]
                                                                                                );
                                                                                                setActive(subChapterLevel3)
                                                                                              }}
                                                                                            >
                                                                                              <div className="ms-2 me-auto">
                                                                                                <div>
                                                                                                  {
                                                                                                    subChapterLevel3.title
                                                                                                  }
                                                                                                </div>
                                                                                              </div>
                                                                                              <span className="badge rounded-pill text-dark fw-normal">
                                                                                                {
                                                                                                  subChapterLevel3.page_no
                                                                                                }
                                                                                              </span>
                                                                                            </li>
                                                                                          </ul>
                                                                                        );
                                                                                      }
                                                                                    )}
                                                                                  </div>
                                                                                </div>
                                                                              </div>
                                                                            </div>
                                                                          </>
                                                                        ) : (
                                                                          <ul className="list-group">
                                                                            <li
                                                                              className={`list-group-item ${active == subChapterLevel2 && "active"}  d-flex justify-content-between align-items-start`}
                                                                              key={
                                                                                subChapterLevel2.index
                                                                              }
                                                                              onClick={() => {
                                                                                setLongQuestionsData([])
                                                                                setAiQuestionAnswer(null)
                                                                                getQuestionsView(
                                                                                  subChapterLevel2.title,
                                                                                  subChapterLevel2.page_no,
                                                                                  pageNumbers[
                                                                                    parseInt(
                                                                                      subChapterLevel2.index
                                                                                    ) + 1
                                                                                  ]
                                                                                );
                                                                                setActive(subChapterLevel2)
                                                                              }}
                                                                            >
                                                                              <div className="ms-2 me-auto">
                                                                                <div>
                                                                                  {
                                                                                    subChapterLevel2.title
                                                                                  }
                                                                                </div>
                                                                              </div>
                                                                              <span className="badge rounded-pill text-dark fw-normal">
                                                                                {
                                                                                  subChapterLevel2.page_no
                                                                                }
                                                                              </span>
                                                                            </li>
                                                                          </ul>
                                                                        )}
                                                                      </React.Fragment>
                                                                    );
                                                                  }
                                                                )}
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      ) : (
                                                        <ul className="list-group">
                                                          <li
                                                            className={`list-group-item ${active == subChapterLevel1 && "active"}  d-flex justify-content-between align-items-start`} 
                                                            key={subChapterLevel1.index}
                                                            onClick={() => {
                                                              setLongQuestionsData([])
                                                              setAiQuestionAnswer(null)
                                                              getQuestionsView(
                                                                subChapterLevel1.title,
                                                                subChapterLevel1.page_no,
                                                                pageNumbers[
                                                                  parseInt(
                                                                    subChapterLevel1.index
                                                                  ) + 1
                                                                ]
                                                              );
                                                              setActive(subChapterLevel1)
                                                            }}
                                                          >
                                                            <div className="ms-2 me-auto">
                                                              <div
                                                                // pageNumbers[0]["sub_chapter_level_1"][0+1].page_no
                                                              >
                                                                {subChapterLevel1.title}
                                                              </div>
                                                            </div>
                                                            <span className="badge rounded-pill text-dark fw-normal">
                                                              {subChapterLevel1.page_no}
                                                            </span>
                                                          </li>
                                                        </ul>
                                                      )}
                                                    </React.Fragment>
                                                  );
                                                }
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </React.Fragment>
                                  ) : (
                                    <ul className="list-group">
                                      <li
                                        className={`list-group-item ${active == chapters && "active"}  d-flex justify-content-between align-items-start`}
                                        key={chapters.index}
                                        onClick={() => {
                                          setLongQuestionsData([])
                                          setAiQuestionAnswer(null)
                                          getQuestionsView(
                                            chapters.title,
                                            chapters.main_page_no,
                                            pageNumbers[parseInt(chapters.index) + 1]
                                          );
                                          setActive(chapters)
                                        }}
                                      >
                                        <div
                                          className="ms-2 me-auto"
                                        >
                                          <div>{chapters.title}</div>
                                        </div>

                                        <span className="badge rounded-pill text-dark fw-normal">
                                          {chapters.main_page_no}
                                        </span>
                                      </li>
                                    </ul>
                                  );
                                })
                              ) : (
                                <ul className="list-group">
                                  <li className="list-group-item ">{"Error in BookMark"}</li>
                                </ul>
                              )}
                            </div> 
                          </> 
            }


            

          </div>
        </div>
      </div>
    </>
  );
};

export default ListOfChapters;
