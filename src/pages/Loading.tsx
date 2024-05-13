import React from "react";
import spin from "../images/homePageImages/spin.png";
import { PuffLoader } from "react-spinners";
import {topOfPage} from "./BasicQuestions";

const Loading: React.FC = ( ) => {
    topOfPage();
    return (
      <div>
        <h1>Answers submitted!</h1>
        <h2>Loading Results...</h2>
        <PuffLoader className = "loader" color="#85d3fc" size = {200}/>
        <img src={spin} className = "otter" alt="Otto the Otter Spinning Around"/>
      </div>
      
    );
  };
  
  export default Loading;