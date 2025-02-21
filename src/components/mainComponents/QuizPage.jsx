import React from "react";
import Quiz from "../subComponents/Quiz/Quiz";
import { CommonDataProvider } from "../../context/CommonContext";

const QuizPage = () => {

  
  return (
    <>
      <CommonDataProvider>
        <Quiz />
      </CommonDataProvider>   
    </>
  );
};

export default QuizPage;
