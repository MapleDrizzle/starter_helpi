import React from 'react';

interface ResultsProps {
  quizResults: string[];
}

const BasicResults: React.FC<ResultsProps> = ({ quizResults }) => { // Change responses to quizResults
  return (
    <div>
      <h1>Results</h1>
      {/* Display results here */}
      {quizResults.map((result, index) => (
        <div key={index}>{result}</div>
      ))}
    </div>
  );
};

export default BasicResults;