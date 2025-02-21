import React, { useContext } from "react";
import QuizHeader from "./QuizHeader";
import QuizContext from "../../../context/QuizContext";
import QuizBookmarkHeader from "./QuizBookmarkHeader";
import QuestionsComponent from "./QuestionsComponent";


const DisplayQuestions = () => {
  const { getBookMarksData, loadingImage, initialQuestionsView, titleName ,longQuestionLoading , submitLoading,viewBook} =
    useContext(QuizContext);

  return (
    <>
      {getBookMarksData.bookMark === "None" ? (
        <main className="container px-0">
          {loadingImage ? (
            <div className="container ">
              <div className="loading-image-container  ">
                <img
                  src="https://cdn.adraproductstudio.com/waitingImage.gif"
                  alt="No Logo"
                  className="img-responsive mx-auto d-block questions-loading-image"
                />
                <h2 className="text-center chapter-processing-text">
                  {getBookMarksData.bookName} chapter is Processing...
                </h2>
                <h2 className="brand-color text-center please-wait-text">Please wait...</h2>
              </div>
            </div>
          ) : (
            <>
              <div className="action-field-container d-flex  ">
                <div className="px-5 d-flex w-100 justify-content-between align-items-center ">
                  <QuizHeader />
                </div>
              </div>
              <hr className="horizontal-line p-0 m-0" />

              {/* <!-- action container --> */}
              <div className="action-container overflow-auto ">
                <div className="row action-container-row px-0 px-sm-5 pt-2 w-100">
                  <QuestionsComponent />
                </div>
              </div>
            </>
          )}
        </main>
      ) : (
        <main className="container px-0  ">
          {!initialQuestionsView ? (
            <>
              <div className="action-field-container pt-5">
                <div className="card border-0">
                  <div className="card-body instructions-container">
                    <h4 className="mt-3 lh-lg ">
                      <b>
                        <span className="brand-color">
                          Greetings from PrepyAI qabot
                        </span>
                      </b>
                      <br />
                      PrepyAI is here to help you get ready for your exams or
                      learn things faster by testing your knowledge
                    </h4>
                    <div className="instructions mt-5">
                      <h6 className="text-start ">In this workspace:</h6>

                      <ol className="list-group list-group-numbered text-start ">
                        <li className="list-group-item">
                          You can generate questions either from the entire
                          textbook or by choosing specific chapters or topics.
                          To do this, click on the book title, chapter, or topic
                          you're interested in from the sidebar to generate
                          questions.
                        </li>
                        <li className="list-group-item">
                          {" "}
                          You'll get 20 questions about the topic you choose.
                          After answering them, you'll get a summary of your
                          results.
                        </li>
                        <li className="list-group-item">
                          You can also redo tests you've done before.
                        </li>
                        <li className="list-group-item">
                          {" "}
                          If you didn't upload a book with bookmarks, the
                          questions will be random from the entire content.
                        </li>
                      </ol>
                    </div>

                    <h6 className="mt-3 text-start ">
                      We hope PrepyAI makes studying for exams easier and boosts
                      your confidence in your learning journey!
                    </h6>
                  </div>
                </div>
              </div>  

              {/* <!-- action container --> */}
              <div className="action-container overflow-auto ">
                <div className={submitLoading ? "d-none" : "row action-container-row  pt-2 w-100 mx-auto"}></div>
              </div>
            </>
          ) : (
            <>
              {loadingImage ? (
                <div className="container">
                  <div className="loading-image-container  ">
                    <img
                      src="https://cdn.adraproductstudio.com/waitingImage.gif"
                      alt="No Logo"
                      className="img-responsive img-fluid mx-auto d-block questions-loading-image"
                    />
                    <h2 className="text-center chapter-processing-text">
                      {titleName} chapter is Processing...
                    </h2>
                    <h2 className="brand-color text-center please-wait-text">Please wait...</h2>
                  </div>
                </div>
              ) : (
                <>
                  <div  className={longQuestionLoading ? "" : "action-field-container text-center pt-2"}>
                    <QuizBookmarkHeader />
                  </div>
                  <hr className="horizontal-line p-0 m-0" />

                  {/* <!-- action container --> */}
                  <div className="action-container overflow-auto">
                    <div className={submitLoading ? "d-flex justify-content-center" : "row action-container-row  pt-2 w-100 mx-auto"}>
                      <QuestionsComponent />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          {/* <!-- action field container --> */}
        </main>
      )}
    </>
  );
};

export default DisplayQuestions;
