import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getBook, getTitleName, getUserAPIToken, getUserEmailID, removeTitleName } from "../services/Storage";
import { toast } from "react-toastify";
import getBookMarkAPI from "../api/post";
import getQuestionsAPI from "../api/post";
import getRevisionSetAPI from "../api/post";
import getHistoryAPI from "../api/post";
import CommonContext from "./CommonContext";
import getBookAPI from '../api/post';

import axios from "axios";
import { IoIosInformationCircleOutline } from "react-icons/io";

const QuizContext = createContext({});

export const DataQuizContextProvider = ({ children }) => {

  const [questionIndex, setQuestionIndex] = useState(Number);

  const [titleName, setTitleName] = useState("");

  const [getRevsionSetUpdate, setGetRevsionSetUpdate] = useState(false);

  const [optionsSubmitted, setOptionsSubmitted] = useState(false);

  const [userSelect, setUserSelect] = useState({});

  const [chaptersLoadingImage, setChaptersLoadingImage] = useState(true)

  const [correctAnswers, setCorrectAnswers] = useState(0);

  const [wrongAnswers, setWrongAnswers] = useState(0);

  const [unAnsweredQuestions, setUnAnsweredQuestions] = useState(0);

  const [submitted, setSubmitted] = useState(false);

  const [difficultyLevel, setDifficultyLevel] = useState("Easy");

  const [generateQuestionBtn, setGenerateQuestionBtn] = useState('Generate Questions');

  const [getBookMarksData, setGetBookMarksData] = useState({
    bookName: "",
    bookMark: "",
    revisionNo: [],
    totalPage: "",
  });



  const { reGenerateToken, setReGenerateToken } = useContext(CommonContext)

  const test = useRef(false);

  useEffect(() => {
    // if (test.current === false) {
    const getBookMarkDetails = async () => {

      let email = getUserEmailID();
      let bookName = getBook();
      let token = getUserAPIToken();

      let getBookMarkParameter = {
        user_email_id: email,
        book_name: bookName,
      };


      try {
        await getBookMarkAPI
          .post("/get_bookmark", getBookMarkParameter, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            if (response.data.status_code === 201) {
              setGetBookMarksData({
                bookName: response.data.book_name,
                bookMark: response.data.bookmark,
                revisionNo: response.data.revision_no,
                totalPage: response.data.total_page_no,
              });
              setTimeout(() => {
                setChaptersLoadingImage(false)
              }, 500)

            } else if (response.data.status_code === 200) {
              setGetBookMarksData({
                bookName: response.data.book_name,
                bookMark: response.data.bookmark,
                revisionNo: response.data.revision_no,
                totalPage: response.data.total_page_no,
              });
              setTimeout(() => {
                setChaptersLoadingImage(false)
              }, 500)
              setGetPageNumbers(response.data);
            } else if (response.data.status_code === 403) {
              toast.error(response.data.error_message);
            }
          });


      } catch (err) {
        toast.error(err.message);
      }
    };


    (async () => getBookMarkDetails())();

    // return () => {
    //   test.current = true;
    // };
    // }
  }, [getRevsionSetUpdate]);

  const [getListOfQuestions, setGetListOfQuestions] = useState([]);

  const [loadingImage, setLoadingImage] = useState(false);

  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const [progressPercentage, setProgressPercentage] = useState(0);

  const [pageNo, setPageNo] = useState({
    page_no: "",
    title: "",
    endPageNo: "",
  });

  const [showSubmit, setShowSubmit] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});


  // phase 2 states
  const [difficultyLevelLabel, setDifficultyLevelLabel] = useState("Easy");

  const [longQuestionview, setLongQuestionView] = useState(true)

  const [questionType, setQuestionType] = useState("")

  const [questionView, setQuestionView] = useState("")

  const [longQuestionLoading, setLongQuestionLoading] = useState(false)

  const [answerState, setAnswerState] = useState(false)

  const [submitLoading, setSubmitLoading] = useState(false)

  const [audioResponseLoading, setAudioResponseLoading] = useState(false)

  const [longQuestionsData, setLongQuestionsData] = useState([])

  const [aiQuestionAnswer, setAiQuestionAnswer] = useState(null)

  const [longQuestionExplanation, setLongQuestionExplanation] = useState("")

  const [questionExplanationLoading, setQuestionExplanationLoaing] = useState(false)

// phase 3 changes

const [questionLanguage , setQuestionLanguage]=useState("english")
const [longQuestionModaldata,setLongQuestionModaldata]=useState({})
const [longSubmitLoading,setLongSubmitLoading]=useState(false)


  const generateQuestion = async () => {

    setLoadingImage(true);
    setOptionsSubmitted(false)

    let email = getUserEmailID();
    let token = getUserAPIToken();
    let bookName = getBook();

    let getQuestionsParameter;

    if (pageNo.page_no === "") {
      getQuestionsParameter = {
        user_email_id: email,
        book_name: bookName,
        chapter_name: bookName,
        default_start_page_no: "",
        default_end_page_no: "",
        difficulty_level: difficultyLevel,
      };
    } else if (pageNo.page_no !== "") {
      getQuestionsParameter = {
        user_email_id: email,
        book_name: bookName,
        chapter_name: pageNo.title,
        default_start_page_no: pageNo.page_no,
        default_end_page_no: pageNo.endPageNo,
        difficulty_level: difficultyLevel,
      };
    }


    try {
      await getQuestionsAPI
        .post("/get_questions", getQuestionsParameter, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.status_code === 200) {
            setProgressPercentage(0);
            setGetListOfQuestions(response.data.List_of_questions);
            setGetRevsionSetUpdate(!getRevsionSetUpdate);
            setLoadingImage(false);
            setShowSubmit(true);
            setSelectedValues({});
            setSubmitted(false);
            setOptionsSubmitted(false);
            setCorrectAnswers(0);
            setWrongAnswers(0);
            setUnAnsweredQuestions(0);
            setUserSelect({});
          } else if (response.data.status_code === 402) {
            toast.info(response.data.error_message);
            setLoadingImage(false);
          } else if (response.data.status_code === 403) {
            toast.error(response.data.error_message);
            setLoadingImage(false);
          }
        });
    } catch (err) {
      setLoadingImage(false);
      toast.error(err.message);
    }
  };

  const getRevisionQuestions = async (selectedSet) => {
    let email = getUserEmailID();
    let token = getUserAPIToken();
    let bookName = getBook();

    let revisionQuestions = {
      user_email_id: email,
      book_name: bookName,
      revision_no: selectedSet,
      catagory: getTitleName() !== null ? getTitleName() : bookName,
    };

    setLoadingSpinner(true);


    try {
      await getRevisionSetAPI
        .post("/get_questions_archive", revisionQuestions, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.status_code === 200) {
            setOptionsSubmitted(false);
            setSubmitted(false);
            setShowSubmit(true);
            setSelectedValues({});
            setGetListOfQuestions(response.data.List_of_questions);
            setUserSelect({});
            setWrongAnswers(0);
            setCorrectAnswers(0);
            setLoadingSpinner(false)

          } else if (response.data.status_code === 403) {
            toast.error(response.data.error_message);
            setLoadingSpinner(false)

          }
        });
    } catch (err) {
      setLoadingSpinner(false)
      toast.error(err.message);
    }
  };

  const [chapterHistory, setChapterHistory] = useState([]);

  const getChaptersHistory = async (title) => {


    let email = getUserEmailID();
    let token = getUserAPIToken();
    let bookName = getBook();

    let getHistoryParameters = {
      user_email_id: email,
      book_name: bookName,
      catagory: title,
    };


    try {
      await getHistoryAPI
        .post("/get_history", getHistoryParameters, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.status_code === 200) {
            setChapterHistory(response.data);
            setGenerateQuestionBtn("Generate Questions")
          } else if (response.data.status_code === 403) {
            toast.error(response.data.error_message);
          }
        });
    } catch (err) {
      if (err.response.status === 401) {
        setReGenerateToken(!reGenerateToken)
        toast.error("Session Expired...! Please try again...!");
      } else {
        toast.error(err.message);
      }
    }
  };

  const [getRevisionBasedScroll, setGetRevisionBasedScroll] = useState(false);

  const [initialQuestionsView, setInitialQuestionsView] = useState(false);



  const getLongQuestion = async () => {

    let token = getUserAPIToken();

    let email = getUserEmailID();
    let bookName = getBook();

    var difficultLevelFirstLetter = difficultyLevel.charAt(0).toLowerCase() + difficultyLevel.slice(1,)

    let longQuesParams;

    if (pageNo.page_no === "") {
      longQuesParams = {
        user_email_id: email,
        book_name: bookName,
        chapter_name: pageNo.title,
        default_start_page_no: "",
        is_confidential: "true",
        difficulty_level: difficultLevelFirstLetter,
        default_end_page_no: "",
        language:questionLanguage
      }
    } else if (pageNo.page_no !== "") {
      longQuesParams = {
        user_email_id: email,
        book_name: bookName,
        chapter_name: pageNo.title,
        default_start_page_no: pageNo.page_no,
        is_confidential: "true",
        difficulty_level: difficultLevelFirstLetter,
        default_end_page_no: pageNo.endPageNo,
        language:questionLanguage
      }
    }


    try {
      setLongQuestionLoading(true)
      await axios.post(`${process.env.REACT_APP_LOCAL_HOST}/get_long_questions`, longQuesParams, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.data.status_code === 200) {
            setLongQuestionLoading(false)

            if (response.data.List_of_questions.data.length) {
              const addAnswerAtt = response.data.List_of_questions.data.map((v) => {
                return { ...v, answer: '', explaination: '' }
              })

              setLongQuestionsData(addAnswerAtt)
            } else {
              setLongQuestionsData([])
            }
          }
          else if (response.data.status_code === 402) {
            toast.info(response.data.error_message);
            setLongQuestionLoading(false);
          } else if (response.data.status_code === 403) {
            toast.error(response.data.error_message);
            setLongQuestionLoading(false);
          }
        });

    } catch (error) {
      setLongQuestionLoading(false);
      toast.error(error.message, "error", "376");
    }
  }


  const getLongQuestionExplanation = async (e, question) => {

    let token = getUserAPIToken();


    const longQuestionExplanation = {
      question: question
    }

    try {
      setQuestionExplanationLoaing(true)
      await axios.post(`${process.env.REACT_APP_LOCAL_HOST}/get_questions_explaination`, longQuestionExplanation, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setQuestionExplanationLoaing(false)
          setLongQuestionExplanation(response.data.Explanation.data.ques_explanation)
        });

    } catch (error) {
      setQuestionExplanationLoaing(false)
      // toast.error(error.message);

      if (error.response) {
        toast.error(error.message);
      } else if (error.request) {
        toast.error("Network error: No response from server.");
      } else {
        toast.error(`Request failed: ${error.message}`);
      }
    }

  }


  const getLongAnswers = async () => {

    var emptyCheckArray = []

    var longAns = longQuestionsData.filter((v) => {

      if (v.answer !== "") {
        return v.question_id
      }
      else {
        emptyCheckArray.push(v.question_id)
      }

    })

    if (emptyCheckArray.length === 0) {


      var arrayCopy = JSON.parse(JSON.stringify(longQuestionsData))


      var removedArray = arrayCopy.map((val, ind) => {
        const { explaination, ...rest } = val;
        return rest
      })

      var dataKeyAdded = {
        data: removedArray
      }

      // return
      let token = getUserAPIToken();

      let email = getUserEmailID();
      let bookName = getBook();
      const difficultLevelFirstLetter = difficultyLevel.charAt(0).toLowerCase() + difficultyLevel.slice(1,)
      let longAnsParams;

      if (pageNo.page_no === "") {
        longAnsParams = {
          user_email_id: email,
          book_name: bookName,
          chapter_name: pageNo.title,
          default_start_page_no: "",
          is_confidential: "true",
          difficulty_level: difficultLevelFirstLetter,
          default_end_page_no: "",
          List_of_questions: dataKeyAdded,
          language:questionLanguage
        }
      } else if (pageNo.page_no !== "") {
        longAnsParams = {
          user_email_id: email,
          book_name: bookName,
          chapter_name: pageNo.title,
          default_start_page_no: pageNo.page_no,
          is_confidential: "true",
          difficulty_level: difficultLevelFirstLetter,
          default_end_page_no: pageNo.endPageNo,
          List_of_questions: dataKeyAdded,
          language:questionLanguage
        }
      }



      try {
        
        setLongSubmitLoading(true)
        setLongQuestionLoading(true)
        setSubmitLoading(true)

        console.log(longAnsParams)
       

        await axios.post(`${process.env.REACT_APP_LOCAL_HOST}/submit_answer`, longAnsParams, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => {
            if (response.data.status_code === 200) {
              console.log(response.data)

              setAiQuestionAnswer(response.data.Explanation)
              setLongQuestionModaldata(response.data?.Explanation)
            

              const updatedArr = longQuestionsData.map((target, index) => ({
                ...target,
                explaination: response.data.Explanation.data[index].explanation
              }))


              setLongQuestionsData(updatedArr)
       

            }
          
            setSubmitLoading(false)
            setLongQuestionLoading(false)
            setAnswerState(true)
            setGenerateQuestionBtn("Regenerate Questions")
          
            setLongSubmitLoading(false)
          });

      } catch (error) {
        toast.error(error.message);
      }
    }
    else {
      toast("Please fill all the fields", {
        icon: (
          <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
        ),
      });
    }

  }



  const handleSendAudioButton = async (e, audiofile, questionId, question) => {
    let token = getUserAPIToken();

    var audioData = new FormData()

    audioData.append("file", audiofile)
    audioData.append("question", question)
    audioData.append("id", questionId)

    try {
      setAudioResponseLoading(true)
      await axios.post(`${process.env.REACT_APP_LOCAL_HOST}/convert-speech-to-text`, audioData, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.data.status_code === 200) {

            setAudioResponseLoading(false)


            if (response.data.data.length) {
              const addAnswerAtt = longQuestionsData.map((v, index) => {
                return questionIndex === index ? { ...v, answer: response.data.data[0].answer } : v
              })

              setLongQuestionsData(addAnswerAtt)
            }
          }
          else if (response.data.status_code === 402) {
            toast.info(response.data.error_message);
            setAudioResponseLoading(false);
          } else if (response.data.status_code === 403) {
            toast.error(response.data.error_message);
            setAudioResponseLoading(false);
          }
        });

    } catch (error) {
      toast.error(error.message);
    }
  }



  const handleChange = (questionId, optionId, userSelectedOptions) => {
    setSelectedValues((previousSelectedValues) => ({
      ...previousSelectedValues,
      [questionId]: optionId,
    }));
    setUserSelect((previousSelectedValues) => ({
      ...previousSelectedValues,
      [questionId]: userSelectedOptions,
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setOptionsSubmitted(true);
    setShowSubmit(false);

    const unAnsweredQuestionsLength =
      getListOfQuestions.length - Object.keys(selectedValues).length;
    setUnAnsweredQuestions(unAnsweredQuestionsLength);

    let correctAnswers = Object.values(userSelect).filter(
      (val) => val === true
    );
    setCorrectAnswers(correctAnswers.length);

    let wrongAnswers = Object.values(userSelect).filter((val) => val === false);
    setWrongAnswers(wrongAnswers.length);

    const element = document.getElementById("section-1");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }

    setGenerateQuestionBtn("Regenerate Questions")

  };

  const [getPageNumbers, setGetPageNumbers] = useState([]);
  return (
    <QuizContext.Provider
      value={{
        showSubmit,
        setShowSubmit,
        setOptionsSubmitted,
        setGetListOfQuestions,
        generateQuestion,
        loadingImage,
        getListOfQuestions,
        getRevisionQuestions,
        setGetRevisionBasedScroll,
        getRevisionBasedScroll,
        progressPercentage,
        setProgressPercentage,
        initialQuestionsView,
        setInitialQuestionsView,
        getChaptersHistory,
        chapterHistory,
        setPageNo,
        setTitleName,
        titleName,
        optionsSubmitted,
        submitted,
        selectedValues,
        unAnsweredQuestions,
        setUnAnsweredQuestions,
        correctAnswers,
        setCorrectAnswers,
        wrongAnswers,
        setWrongAnswers,
        handleChange,
        handleSubmit,
        setGetBookMarksData,
        getBookMarksData,
        setGetPageNumbers,
        getPageNumbers,
        generateQuestionBtn,
        setGenerateQuestionBtn,
        chaptersLoadingImage,
        setChaptersLoadingImage,
        getRevsionSetUpdate,
        difficultyLevel,
        setDifficultyLevel,
        loadingSpinner,

        // Phase two states 
        longQuestionview,
        setLongQuestionView,
        getLongQuestion,
        questionType,
        setQuestionType,
        questionView,
        setQuestionView,

        // loading
        longQuestionLoading,
        setLongQuestionLoading,
        audioResponseLoading,
        setAudioResponseLoading,
        questionExplanationLoading,
        setQuestionExplanationLoaing,
        submitLoading,
        setSubmitLoading,

        answerState,
        setAnswerState,
        longQuestionsData,
        setLongQuestionsData,
        aiQuestionAnswer,
        setAiQuestionAnswer,
        handleSendAudioButton,
        getLongQuestionExplanation,
        getLongAnswers,
        longQuestionExplanation,
        setLongQuestionExplanation,
        difficultyLevelLabel,
        setDifficultyLevelLabel,
        questionIndex, setQuestionIndex,

        //phase 3 changes
        setQuestionLanguage,
        longQuestionModaldata,
        longSubmitLoading,
        questionLanguage
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
