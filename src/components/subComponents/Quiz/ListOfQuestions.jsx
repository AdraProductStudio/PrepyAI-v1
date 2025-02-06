import React, { useContext, useEffect, useState } from "react";
import QuizContext from "../../../context/QuizContext";

const ListOfQuestions = () => {
  const { getListOfQuestions,getRevisionBasedScroll } = useContext(QuizContext);

  const [showAnswer, setShowAnswer] = useState(false)
  const [getSelectedAnswerDiv, setGetSelectedAnswerDiv] = useState("")

  const expandAnswerDiv = (Question_no) => {
    setGetSelectedAnswerDiv(Question_no)
    setShowAnswer(!showAnswer)
  }
  
  useEffect(()=>{
     const element = document.getElementById('section-1');
     if(element){
        element.scrollIntoView({behavior:'smooth'})
     }
  },[getRevisionBasedScroll])


  return (
    <>
      <div className="container">        
        <div className="wrapper text-start">
          <div className="card border-0 listOfQuestions">                    
            <div className="card-body overflow-auto w-100">
                <div id="section-1"></div>

              {getListOfQuestions.map((questionDatas) => {
                return (
                  <React.Fragment key={questionDatas.id}>
                    <h5 className="card-title brand-color mt-3">
                      Question {questionDatas.Question_no}
                    </h5>
                    <p className="card-text">{questionDatas.Question}</p>
                    <div className="options">
                      <ol className="list-group  list-of-options">
                        {questionDatas.options.map((option) => {
                          return (
                            <li
                              className="list-group-item"
                              key={questionDatas.id}
                            >
                              {option}
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                    <div className="card mt-3 show_answer" onClick={()=>expandAnswerDiv(questionDatas.Question_no)}>

                        {
                           questionDatas.Question_no === getSelectedAnswerDiv ? <div className="card-body py-0">
                            <span
                              className="position-absolute top-0 start-50 translate-middle badge rounded-pill rounded-pills bg-danger"
                              id="showAnswerBadge"
                            >
                              Answer
                              <span className="visually-hidden">
                                unread messages
                              </span>
                            </span>
    
                            <p className="m-2">{questionDatas.Answer}</p>
                          </div>:
                          <div className="card-body py-0">
                                <p className="m-2  text-center brand-color"><b>Show Answer</b></p>
                          </div>
                        }
                      
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ListOfQuestions;
