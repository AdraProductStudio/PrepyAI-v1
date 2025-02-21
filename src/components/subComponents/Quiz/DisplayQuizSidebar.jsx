import React, { useContext } from "react";
import ListOfChapters from "./ListOfChapters";
import BackToHomeAndLogout from "./BackToHomeAndLogout";
import LogoHeader from "../../common/LogoHeader";
import QuizContext from "../../../context/QuizContext";
import WithOutBookMark from "./WithOutBookMark";



const DisplayQuizSidebar = ({getCloseButton}) => {
  
    const { getBookMarksData} = useContext(QuizContext)
          
    return(
        <>
            <LogoHeader getCloseButton={getCloseButton}/>

            {getBookMarksData.bookMark !== 'None' ? <ListOfChapters  /> : <WithOutBookMark getBookMarksData={getBookMarksData}/>}
            
            <BackToHomeAndLogout/>
        </>
    )
}

export default DisplayQuizSidebar;