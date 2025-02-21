import "./stylesheets/Home.css";
import "./stylesheets/LoginAndPricing.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PricingTable from "./components/mainComponents/PricingTable";
import HomePage from "./components/mainComponents/HomePage";
import QuizPage from "./components/mainComponents/QuizPage";
import SignInWithGoogle from "./components/mainComponents/SignInWithGoogle";

function App() {
  return (
    <>
      <BrowserRouter basename="/qabot">
          <Routes>
            <Route path="/" element={<SignInWithGoogle />} />
            <Route path="/subscription_plan" element={<PricingTable />} />
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/dashboard/get_questions/:id" element={<QuizPage />}/> 
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
