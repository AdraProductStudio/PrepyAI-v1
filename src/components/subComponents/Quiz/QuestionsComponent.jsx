import React, { useContext, useEffect, useRef, useState } from "react";
import QuizContext from "../../../context/QuizContext";
import { FaMicrophoneLines } from "react-icons/fa6";
import mic from "../../../images/mic.png";
import micRecording from "../../../images/mic_recording.png";
import { IoMdInformationCircle } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import AudioPlayer from "./AudioPlayer";
import StatusCard from "./StatusCard";




const QuestionsComponent = () => {
  const {
    getListOfQuestions,
    handleChange,
    submitted,
    selectedValues,
    getRevisionBasedScroll,
    loadingSpinner,

    // phase two
    questionView,
    longQuestionsData,
    setLongQuestionsData,
    getLongQuestionExplanation,
    longQuestionExplanation,
    handleSendAudioButton,
    aiQuestionAnswer,
    titleName,
    setQuestionIndex,

    // Loading
    audioResponseLoading,
    longQuestionLoading,
    questionExplanationLoading,
    submitLoading,
    setSubmitLoading,
    answerState,
    setAnswerState,
    longAnswerModaldata,
    longSubmitLoading,
    longQuestionModaldata,

   
  } = useContext(QuizContext);


  // Microphone
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const [audioFile, setAudioFile] = useState({});

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  

  const startRecording = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia is not supported in this browser");
      return;
    }
  
    audioChunksRef.current = [];
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };
        mediaRecorderRef.current.onstop = handleStop;
        mediaRecorderRef.current.start();
        setIsRecording(true);
      })
  };
  

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      console.warn("Recorder is already stopped or not started");
    }
  };

  const handleStop = () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });

    const audioFile = new File([audioBlob], "recording.wav", {
      type: "audio/wav",
    });
    setAudioFile(audioFile);

    if (audioFile) {
      const url = URL.createObjectURL(audioFile);
      setAudioUrl(url);
    }
  };

  useEffect(() => {
    const element = document.getElementById("section-1");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [getRevisionBasedScroll]);

 

 
  const handleEditAnswer = (event, ind) => {
    var newData = longQuestionsData.map((v, index) => {
      return ind === index ? { ...v, answer: event.target.value } : v;
    });
  
    setLongQuestionsData(newData);
  };




  return (
    <>
      <div className="container placeholder-glow p-0 p-sm-2">
        <div className="wrapper text-start">
          <div className="card border-0 listOfQuestions">
            <div className="card-body overflow-auto w-100">
              {questionView === "longQues" && aiQuestionAnswer ? (
                <div className="d-flex align-items-center justify-content-end mb-3">
                  <div>
                    <button
                      type="button"
                      className="btn bg-custom text-white w-100 "
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      
                    >
                      <span className="d-flex">
                        Status: <p className="mb-0 ms-2 fw-bold">{longQuestionModaldata?.overall_status}</p>
                      </span>
                    </button>
                  </div>
                </div>
              ) : null}

           
              
              {questionView === "mcqQues" ? (
                loadingSpinner ? (
                  <div className="d-flex justify-content-center align-items-center h-100 ">
                    <div className="spinner-border brand-color" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  getListOfQuestions?.map((data) => {
                    return (
                      <React.Fragment key={data.question_id}>
                        <div className="question-and-options">
                          <h5 className="card-title brand-color mt-3">
                            Question {data.Question_no}
                          </h5>
                          <p className="card-text question">{data.Question}</p>
                          <div className="options">
                            <ol className="list-group  list-of-options">
                              {data.options.map((option) => {
                                return (
                                  <React.Fragment key={option.Question_no}>
                                    <label>
                                      <li
                                        className={
                                          submitted
                                            ? option.answer
                                              ? "list-group-item border bg-custom-success"
                                              : (selectedValues[
                                                  data.Question_no
                                                ] ===
                                                  option.id) !==
                                                option.answer
                                              ? "list-group-item border bg-custom-danger"
                                              : "list-group-item border "
                                            : "list-group-item border option-div "
                                        }
                                      >
                                        <div className="form-check option-div">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name={data.Question_no}
                                            id={`option${option.id}`}
                                            value={`option${option.option}`}
                                            checked={
                                              selectedValues[
                                                data.Question_no
                                              ] === option.id
                                            }
                                            onChange={() =>
                                              handleChange(
                                                data.Question_no,
                                                option.id,
                                                option.answer
                                              )
                                            }
                                            disabled={
                                              submitted ? "disabled" : ""
                                            }
                                          />
                                          <label
                                            className="form-check-label px-3 option-div"
                                            htmlFor={`option${option.id}`}
                                          >
                                            {option.option}
                                          </label>
                                        </div>
                                      </li>
                                    </label>
                                  </React.Fragment>
                                );
                              })}
                            </ol>
                          </div>

                          {/* Explanation  */}
                          {submitted ? (
                            <div className="card">
                              <div className="card-body">
                                <p className="card-text italic ">
                                  <i>
                                    <u>Explanation</u> :{" "}
                                    {data.Explanation !== ""
                                      ? data.Explanation
                                      : "With supporting text below as a natural lead-in to additional content."}
                                  </i>
                                </p>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </React.Fragment>
                    );
                  })
                )
              ) : questionView === "longQues" ? (
                longQuestionLoading ? (
                  longSubmitLoading ? (
                    <div className="d-flex justify-content-center align-items-center h-100 ">
                    <div className="spinner-border brand-color" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  ) : (
                    <div className="loading-image-container  ">
                      <img
                        src="https://cdn.adraproductstudio.com/waitingImage.gif"
                        alt="No Logo"
                        className="img-responsive img-fluid mx-auto d-block questions-loading-image"
                      />
                      <h2 className="text-center chapter-processing-text">
                        {titleName} chapter is Processing...
                      </h2>
                      <h2 className="brand-color text-center please-wait-text">
                        Please wait...
                      </h2>
                    </div>
                  )
                ) : (
                  <div
                    className={
                      longQuestionsData.length <= 0
                        ? "d-none"
                        : "container  border rounded-3 overflow-auto py-4 "
                    }
                  >
                    {longQuestionsData.map((data, ind) => {
                      return (
                        <React.Fragment key={data.question_id}>
                          <div className="question-and-options pt-3">
                            <div>
                              <span className="card-title mt-3 fs-6">
                                {data.question_id}. {data.question}
                              </span>

                              <div className="col-12 mb-4 w-100">
                                <div className="d-flex align-items-center justify-content-between pt-2">
                                  <div>
                                    {/* info button */}

                                    <button
                                      id="info-toolTip"
                                      className="btn btn-secondary rounded-3 p-2 recordVoice-Size informationIcon cursorPointer"
                                      data-bs-toggle="modal"
                                      data-bs-target="#questionElaborateModal"
                                      data-tooltip-id="info-toolTip"
                                      data-placement="top"
                                      data-tooltip-html="Click here to view the question explanation"
                                      onClick={(e) =>
                                        getLongQuestionExplanation(
                                          e,
                                          data.question
                                        )
                                      }
                                    >
                                      <IoMdInformationCircle className="fs-6" />{" "}
                                      <span className="d-none d-md-inline-block">
                                        Info
                                      </span>
                                    </button>
                                    <Tooltip
                                      id="info-toolTip"
                                      className="tooltipWidth fw-bolder shadow rounded"
                                    />
                                  </div>

                                  <div>
                                    <button
                                      className="brand-Back-color rounded-3 p-2 recordVoice-Size"
                                      data-bs-toggle="modal"
                                      data-bs-target={`#voiceRecorder${data.question_id}Modal`}
                                      onClick={() => {
                                        setAudioUrl(null);
                                        setQuestionIndex(ind);
                                      }}
                                    >
                                      <FaMicrophoneLines className="fs-6" />{" "}
                                      <span className="d-none d-md-inline-block">
                                        Record your voice
                                      </span>
                                    </button>

                                    {/* } */}

                                    {/* Voice Recorder Modal */}
                                    <div
                                      className="modal fade"
                                      id={`voiceRecorder${data.question_id}Modal`}
                                      data-bs-backdrop="static"
                                      data-bs-keyboard="false"
                                      tabIndex="-1"
                                      aria-labelledby="staticBackdropLabel"
                                      aria-hidden="true"
                                    >
                                      <div className="modal-dialog modal-dialog-centered rounded-4">
                                        <div className="modal-content">
                                          <div className="modal-header border-0 pb-2">
                                            <p
                                              className="modal-title text-secondary"
                                              id="staticBackdropLabel"
                                            >
                                              Record your answer
                                            </p>
                                            <button
                                              id={`voiceRecorderClose${data.question_id}Button`}
                                              type="button"
                                              className="btn-close"
                                              data-bs-dismiss="modal"
                                              aria-label="Close"
                                            ></button>
                                          </div>
                                          <hr className="mx-3 m-0" />
                                          <div className="modal-body mt-3 mb-5 w-100">
                                            <div className="col-12">
                                              {audioUrl !== null ? null : (
                                                <>
                                                  <div className="d-flex align-items-center justify-content-center">
                                                    <p
                                                      className="  pt-2 text-light cursorPointer text-center"
                                                      onClick={
                                                        isRecording
                                                          ? stopRecording
                                                          : startRecording
                                                      }
                                                    >
                                                      {!isRecording ? (
                                                        <img
                                                          src={mic}
                                                          alt="mic"
                                                          width={100}
                                                          height={100}
                                                        />
                                                      ) : (
                                                        <img
                                                          src={micRecording}
                                                          alt="mic"
                                                          width={100}
                                                          height={100}
                                                        />
                                                      )}
                                                    </p>
                                                  </div>
                                                  <p className=" text-center">
                                                    {" "}
                                                    {isRecording
                                                      ? "Stop Recording"
                                                      : "Tap and start speaking.."}{" "}
                                                  </p>
                                                </>
                                              )}
                                            </div>
                                            <AudioPlayer
                                              src={audioUrl}
                                              title="rec"
                                              barWidth={10}
                                              barGap={1}
                                              bufferPercentage={75}
                                              muted={false}
                                              handleSendAudioButton={(e) => {
                                                handleSendAudioButton(
                                                  e,
                                                  audioFile,
                                                  data.question_id,
                                                  data.question
                                                );
                                                document
                                                  .getElementById(
                                                    `voiceRecorderClose${data.question_id}Button`
                                                  )
                                                  .click();
                                              }}
                                              handleDeleteAudio={() =>
                                                setAudioUrl(null)
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {answerState ? (
                                <p className="w-100 answerField rounded p-3 text-secondary border">
                                  {data.answer}
                                </p>
                              ) : (
                                <textarea
                                  className="w-100 answerField rounded p-3 text-secondary form-control"
                                  value={
                                    audioResponseLoading
                                      ? "Loading..."
                                      : data.answer
                                  }
                                  onChange={(e) => handleEditAnswer(e, ind)}
                                  name="answerField"
                                  rows={4}
                                >
                                  {data.answer}
                                </textarea>
                              )}

                              <div
                                className={
                                  data.explaination !== undefined &&
                                  data.explaination.toString().length > 0
                                    ? "w-100 rounded-3 p-3 answer-color border-0 my-3 fw-bold"
                                    : "d-none"
                                }
                                name="answerExplanationField"
                              >
                                {" "}
                                Explanation :
                                <p className="fw-normal pt-2">
                                  {data.explaination}
                                </p>
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                )
              ) : null}

            </div>
          </div>
        </div>
      </div>

      {/*Question Elaborate Modal */}

      <div
        className="modal fade"
        id="questionElaborateModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered rounded-4">
          <div className="modal-content">
            <div className="modal-header border-0 pb-2">
              <p
                className="modal-title text-secondary"
                id="staticBackdropLabel"
              >
                Question Explanation
              </p>
              <button
                id={`questionElaborateModalButton`}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <hr className="mx-3 m-0" />
            {questionExplanationLoading ? (
              <div className="modal-body placeholder my-4">
                <div className="d-flex justify-content-center align-items-center explanation-loading-spinner">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="modal-body mt-3 mb-5 p-0">
                <p className="text-start px-3">
                  {longQuestionExplanation !== ""
                    ? longQuestionExplanation[0].question_explaination
                    : null} 
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/*Status Elaborate Modal */}

      <div
        className="modal fade "
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="status-modal-dialog modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 fw-bold text-secondary"
                id="exampleModalLabel"
              >
                Status -{longQuestionModaldata?.overall_status}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body status-modal-body ">
              <StatusCard cardTitle={"Explanation"} titleValue={longQuestionModaldata?.overall_levels?.explanation} explanation={longQuestionModaldata?.reasoning?.explanation} />
              <StatusCard cardTitle={"Evidence Based"}titleValue={longQuestionModaldata?.overall_levels?.evidence_based} explanation={longQuestionModaldata?.reasoning?.evidence_based} />
              <StatusCard cardTitle={"Opinion"} titleValue={longQuestionModaldata?.overall_levels?.opinion} explanation={longQuestionModaldata?.reasoning?.opinion}/>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-cancel"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn bg-custom text-white" data-bs-toggle="modal" data-bs-target="#questionTypeModal" data-bs-dismiss="modal">
                Take a Retest
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionsComponent;
