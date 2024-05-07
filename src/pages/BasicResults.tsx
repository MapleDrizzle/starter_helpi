import React from "react";

interface ResultsProps {
  responses: { [key: string]: string };
  questions: Array<{ question: string; options: string[] }>;
}


const BasicResults: React.FC<ResultsProps> = ({ responses, questions }) => {

  return (
    <div className="basicResults">
      <h1>Quiz Results</h1>
    </div>
    
  );
};

export default BasicResults;



