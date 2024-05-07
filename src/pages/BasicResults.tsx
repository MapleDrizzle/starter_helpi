import React from "react";

interface ResultsProps {
  responses: { [key: string]: string };
  questions: Array<{ question: string; options: string[] }>;
}


const BasicResults: React.FC<ResultsProps> = ({ responses, questions }) => {

  return (
    <div className="basicResults">
      <h1>Quiz Results</h1>
      {questions.map((question, index) => (
        <div key={index}>
        
        </div>
      ))}
    </div>
  );
};

export default BasicResults;



