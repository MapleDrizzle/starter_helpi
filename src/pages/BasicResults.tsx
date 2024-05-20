import React from "react";
import otto from "../images/homePageImages/otto.png";
import lottie from "../images/homePageImages/lottie.png";
import cecil from "../images/homePageImages/cecil.png";
import ray from "../images/homePageImages/ray.png";

interface ResultsProps {
  responses: { [key: string]: string };
  questions: Array<{ question: string; options: string[] }>;
}


const BasicResults: React.FC<ResultsProps> = ({ responses, questions }) => {// Change responses to quizResults

  return (
    <div className="basicResults">
      <h1>Quiz Results! </h1>
      <img src={otto} alt="Otto" className="otto" />
      <img src={lottie} alt="Lottie" className="lottie" />
      <img src={cecil} alt="Cecil" className="cecil" />
      <img src={ray} alt="Ray" className="ray" />
    </div>
    
  );
};

export default BasicResults;



