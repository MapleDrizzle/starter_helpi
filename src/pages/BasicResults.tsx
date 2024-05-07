import React from 'react';
//import OpenAI from "openai";

/*
interface ResultsProps {
  quizResults: string[];
}
*/

//const openai = new OpenAI({apiKey: "", dangerouslyAllowBrowser: true});

/*
async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });
  

  console.log(completion.choices[0]);
}
*/
interface ResultsProps {
  responses: { [key: number]: { [key: string]: string } };
  questions: Array<Array<{ question: string; options: string[] }>>;
  formData: { [key: number]: { [key: string]: string } };

}

const BasicResults: React.FC<ResultsProps> = ({ responses, questions }) => {
  return (
    <div className="basicResults">
      <h1>Quiz Results</h1>
      {questions.map((questionList, index) => (
        <div key={index}>
          <h3>Question {index + 1}: {questionList[0].question}</h3>
          <p>Response: {responses[index]?.[questions[index + 1][0].question]}</p>
        </div>
      ))}
    </div>
  );
};

export default BasicResults;
/*
const BasicResults: React.FC<ResultsProps> = ({ quizResults }) => { // Change responses to quizResults
  return (
    <div>
      <h1>Results</h1>
      {quizResults.map((result, index) => (
        <div key={index}>{result}</div>
      ))}
    </div>
  );
};

export default BasicResults;
*/