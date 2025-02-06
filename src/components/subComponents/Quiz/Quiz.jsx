import React, { useContext } from 'react'
import DisplayQuizSidebar from '../../subComponents/Quiz/DisplayQuizSidebar'
import DashboardHeader from '../../common/DashboardHeader'
import DashboardFooter from '../../common/DashboardFooter'
import DisplayQuestions from '../../subComponents/Quiz/DisplayQuestions'
import CommonContext from '../../../context/CommonContext'
import { DataQuizContextProvider } from '../../../context/QuizContext'
import { ToastContainer } from 'react-toastify'
import { isAuthenticated } from '../../../services/Auth'
import { Navigate } from 'react-router-dom'

const Quiz = () => {

  const {openButton} = useContext(CommonContext)

  

  if(isAuthenticated() === false){
    return <Navigate to="/" replace={true} /> 
  }

  return (
    <>
        <DataQuizContextProvider>
          <ToastContainer/>
            <div className="container-fluid">
              <div className="row">
                {/* left column */}
                <div className={openButton ? 'col-lg-3 col-12 left-column active' : 'col-lg-3 col-12 left-column' }>
                  <DisplayQuizSidebar />
                </div>

                {/* right column */}
                <div className="col-lg-9 col-12 right-column">
                  <DashboardHeader />

                  <DisplayQuestions />

                  <DashboardFooter />
                </div>
              </div>
            </div>
        </DataQuizContextProvider>
    </>
  )
}

export default Quiz