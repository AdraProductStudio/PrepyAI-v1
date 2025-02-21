import React, { useContext, useEffect, useState } from "react";
import QuizContext from "../../../context/QuizContext";
import { LuListTodo } from "react-icons/lu";
import { CgNotes } from "react-icons/cg";

const QuizHeader = () => {
  const {
    getBookMarksData,
    generateQuestion,
    getRevisionQuestions,
    setGetRevisionBasedScroll,
    getRevisionBasedScroll,
    optionsSubmitted,
    unAnsweredQuestions,
    correctAnswers,
    wrongAnswers,
    handleSubmit,
    showSubmit,
    generateQuestionBtn,
    setGenerateQuestionBtn,
    difficultyLevel,
    setDifficultyLevel,
    // phase two
    questionType,
    setQuestionType,
    questionView,
    setQuestionView,
    getLongQuestion,
    getLongQuestionExplanation,
    getLongAnswers,
    difficultyLevelLabel,
    setDifficultyLevelLabel,
    setLongQuestionsData,
    setAnswerState,
    setAiQuestionAnswer,

    // phase 3

    setQuestionLanguage,
    questionLanguage,
    setOptionsSubmitted
  } = useContext(QuizContext);

  const handleChange = (event, revision) => {
    if (revision !== "History") {
      setQuestionView("mcqQues")
      getRevisionQuestions(revision);
      setGetRevisionBasedScroll(!getRevisionBasedScroll);
    }
  };


  // phase two
  const handleQuesType = (e) => {
    setQuestionType(e.target.value)
  }

  const handleQuestionTypeSelection = () => {
    setOptionsSubmitted(false)
    setQuestionView(questionType)
    document.getElementById("quesTypeModalCloseButton").click()
    
    if (questionType === "longQues") {
      setAnswerState(false);
      setAiQuestionAnswer(null)
      setLongQuestionsData([])
      getLongQuestion()
      setGenerateQuestionBtn("Submit")
    }
    else if (questionType === "mcqQues") {
      setAnswerState(false);
      setAiQuestionAnswer(null)
      setLongQuestionsData([])
      document.getElementById("quesTypeModalCloseButton").click();
      generateQuestion()
    }
  }

  // const handleRegenerateQuestion = () => {
  //   setAnswerState(false);
  //   setAiQuestionAnswer(null)
  //   setLongQuestionsData([])
  // }

  // phase 3
  const handleSelectlanguage = (lang) => {
    if (lang == "en") {
      setQuestionLanguage("english");
    } else {
      setQuestionLanguage(lang);
    }
  };


  return (
    <>
      <div className="container">
        <div className="">
          <div className="row my-2 ">
            <div className="col-lg-6 my-auto">
              <div className="title-container ">
                <h5 className="brand-color float-start  my-auto fw-bold ">
                  {getBookMarksData.bookName ? getBookMarksData.bookName : ""}
                </h5>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row align-items-center">
                <div className="col-lg-3 my-2">
                  <form>
                    <div className="dropdown prepy prepy-difficulty-level">
                      <button className="btn btn-secondary dropdown-toggle w-100" type="button" id="dropdownMenuButton1"
                        data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => { setDifficultyLevel("Easy"); setDifficultyLevelLabel("Easy") }}>
                        {difficultyLevelLabel}
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li onClick={(e) => { setDifficultyLevel("Medium"); setDifficultyLevelLabel("Medium") }}><a className="dropdown-item" href="#">Medium</a></li>
                        <li onClick={(e) => { setDifficultyLevel("Hard"); setDifficultyLevelLabel("Hard") }}><a className="dropdown-item" href="#">Hard</a></li>
                      </ul>
                    </div>

                  </form>
                </div>
                <div className="col-lg-4 mb-2 mb-lg-0">
                  <select
                    className="form-select language-selectbox text-center"
                    aria-label="select example"
                    onChange={(e) => {
                      handleSelectlanguage(e.target.value);
                    }}
                    value={questionLanguage}
                  >
                    <option className="text-lg-start selectbox-option">
                      Select Language
                    </option>
                    <option value="tamil" className="text-lg-start">
                      Tamil
                    </option>
                    <option value="english" className="text-lg-start">
                      English
                    </option>
                    <option value="hindi" className="text-lg-start">
                      Hindi
                    </option>
                    <option value="malayalam" className="text-lg-start">
                      Malayalam
                    </option>
                  </select>
                </div>
                <div className="col-lg-5">

                  {showSubmit ? (
                    <button
                      type="button"
                      className="btn bg-custom text-white w-100  submit-question-btn"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  ) : (
                    generateQuestionBtn === "Generate Questions" ?
                      <button
                        type="button"
                        className="btn bg-custom text-white w-100 generate-question-btn"
                        // onClick={generateQuestion}
                        data-bs-toggle="modal" data-bs-target="#questionTypeModal"
                      >
                        {generateQuestionBtn}
                      </button>
                      :
                      generateQuestionBtn === "Regenerate Questions" ?
                        <button
                          type="button"
                          className="btn bg-custom text-white w-100 generate-question-btn"
                          // onClick={() => handleRegenerateQuestion()}
                          data-bs-toggle="modal" data-bs-target="#questionTypeModal"
                        >
                          {generateQuestionBtn}
                        </button>
                        :
                        generateQuestionBtn === "Submit" ?
                          <button
                            type="button"
                            className="btn bg-custom text-white w-100 generate-question-btn"
                            onClick={getLongAnswers}
                          >
                            {generateQuestionBtn}
                          </button>

                          :
                          null

                  )}


                </div>
                {/* <div className="col-lg-4">
                  <div className="dropdown prepy">
                    <button className="btn btn-secondary dropdown-toggle w-100" type="button" id="dropdownMenuButton1"
                      data-bs-toggle="dropdown" aria-expanded="false">
                      History
                    </button>
                    <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton1">
                      {getBookMarksData.revisionNo.length === 1 ? (
                        <li value="" className="no-history" disabled><a>
                          No History Found
                        </a></li>
                      ) : (
                        getBookMarksData.revisionNo.map((revision, index) => {
                          return <li value={revision} key={index} onClick={(e) => handleChange(e, revision)}><a
                            className="dropdown-item" href="#">{revision}</a></li>;
                        })
                      )}
                    </ul>
                  </div>



                </div> */}

              </div>
            </div>
           

          </div>
          {optionsSubmitted ? (
            <div className="submitted-records d-flex justify-content-between ">
              <p>Correct Answers : {correctAnswers}</p>
              <p>Wrong Answers : {wrongAnswers}</p>
              <p>Unanswered Questions : {unAnsweredQuestions}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>



      {/* Question Type Selection Modal */}

      <div className="modal fade" id="questionTypeModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered rounded-4">
          <div className="modal-content">
            <div className="modal-header border-0 pb-2">
              <p className="modal-title text-secondary" id="staticBackdropLabel">Select Question Type</p>
              <button id="quesTypeModalCloseButton" onClick={() => setQuestionType("")} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <hr className="mx-3 mt-0" />
            <div className="modal-body my-3">
              <div className="row align-items-center justify-content-around mx-4">
                <div className={questionType === "mcqQues" ? "card mcq-Ques brand-Back-color px-0 mb-3 mb-sm-0" : "card mcq-Ques px-0 mb-3 mb-sm-0"} style={{ "width": "12rem" }}>
                  <label className={questionType === "mcqQues" ? "card-text px-3 ques py-3 modal-FontSize text-light fw-bold" : "card-text px-3 ques py-3 modal-FontSize text-secondary"}>
                    <input className="d-none" type="radio" name="ques" id="mcqQues" value="mcqQues" checked={questionType === "mcqQues"} onChange={handleQuesType} />
                    <p className=" fs-5"><LuListTodo /></p>
                    Multiple Choice Questions
                  </label>
                </div>


                <div className={questionType === "longQues" ? "card mcq-Ques brand-Back-color px-0" : "card mcq-Ques px-0"} style={{ "width": "12rem" }}>
                  <label className={questionType === "longQues" ? "card-text px-3 ques py-3 modal-FontSize text-light fw-bold" : "card-text px-3 ques py-3 modal-FontSize text-secondary"}>
                    <input className="d-none" type="radio" name="ques" id="longQues" value="longQues" checked={questionType === "longQues"} onChange={handleQuesType} />
                    <p className="fs-5"><CgNotes /></p>
                    Long Answer <br />Questions
                  </label>
                </div>
              </div>
            </div>

            <div className="modal-footer bg-transparent border-0 mb-3">

              <button type="button" className="btn text-light px-4 brand-Back-color" onClick={handleQuestionTypeSelection}>Continue</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizHeader;
