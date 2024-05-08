import React from 'react';

interface ResultsProps {
}

const DetailedResults: React.FC<ResultsProps> = ( ) => { // Change responses to quizResults
  return (
    // tell in the {quizResults} to .split and do other things to edit the text
    <div>
      <h1>Results</h1> 
    </div>
  );
};

export default DetailedResults;