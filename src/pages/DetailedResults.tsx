import React from 'react';

interface ResultsProps {
  quizResults: string | null;
}

const DetailedResults: React.FC<ResultsProps> = ({ quizResults }) => { // Change responses to quizResults
  return (
    // tell in the {quizResults} to .split and do other things to edit the text
    <div>
      <h1>Results</h1> 
      <p >{quizResults}</p>
      {/* Display results here */}
      {/*
      {quizResults.map((result, index) => (
        <div key={index}>{result}</div>
      ))}
      */}
    </div>
  );
};

export default DetailedResults;