import React from 'react';
import otto from "../images/homePageImages/otto.png";
import lottie from "../images/homePageImages/lottie.png";
import cecil from "../images/homePageImages/cecil.png";
import ray from "../images/homePageImages/ray.png";

interface ResultsProps {
}

const DetailedResults: React.FC<ResultsProps> = ( ) => { // Change responses to quizResults
  return (
    <div>
      <h1>Quiz Results</h1> 
      <img src={otto} alt="Otto" className="otto" />
      <img src={lottie} alt="Lottie" className="lottie" />
      <img src={cecil} alt="Cecil" className="cecil" />
      <img src={ray} alt="Ray" className="ray" />
    </div>
  );
};

export default DetailedResults;