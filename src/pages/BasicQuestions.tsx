import React, { useState } from "react";
import ProgressBar from "../components/progress-bar/progressBar";
import { Button } from "react-bootstrap";

interface BasicProps {
  handlePage: (page: string) => void;
}

const BasicQuestions: React.FC<BasicProps> = ({ handlePage }) => {
  const [responses, setResponses] = useState<{ [key: number]: { [key: string]: string } }>({});
  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const questions = [
    [ { question: "I like working in a team", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }],
      [{ question: "I prefer working alone", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }],
    [  { question: "I am fascinated by different ideas", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }],
      [{ question: "I enjoy helping others", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }],
    [
      { question: "I am good at counseling people", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }],
      [{ question: "I am an organized person", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }],
      [{ question: "I am a creative person", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }],
      [{ question: "I see the good in people", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
    ],
    [
        { question: "I am a hands-on person", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }],
        [{ question: "I work well under pressure", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }],
        [{ question: "I like taking care of plants", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }],
        [{ question: "I am an organized person", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },],
        [
            { question: "I understand animasl over humans", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }],
            [{ question: "I prefer job roles that allow me to be creative and innovative.", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']}],
        [ { question: "I am interested in working in the healthcare industry", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }],
          [  { question: "I excel in organizing and planning tasks or projects", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }],];
        
            
    // Add more pages as needed


  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setResponses((prevResponses) => ({
      ...prevResponses,
      [currentPage]: {
        ...prevResponses[currentPage],
        [name]: value
      }
    }));
  };

  const handleNext = () => {
    if (currentPage < questions.length - 1) {
      setCurrentPage(currentPage + 1);
      const newProgress = ((currentPage + 1) * 100) / questions.length;
      setProgress(newProgress);
    } else {
      handlePage("Results");
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      const newProgress = ((currentPage - 1) * 100) / questions.length;
      setProgress(newProgress);
    } else {
      handlePage("Results");
    }
  };

  return (
    <div className="basicForm">
      <form>
        <h1>Basic Quiz</h1>
        {questions[currentPage].map((questionObj, questionIndex) => (
          <div className="questions" key={questionIndex}>
            <p>{questionObj.question}</p>
            <div className="radio-group">
              {questionObj.options.map((option, optionIndex) => (
                <label className="radio-button" key={`question${questionIndex + 1}-${optionIndex}`}>
                  <input
                    type="radio"
                    name={`question${questionIndex + 1}`} // Unique name per question
                    value={option}
                    checked={responses[currentPage]?.[`question${questionIndex + 1}`] === option}
                    onChange={handleRadioChange}
                  />
                  <span className="custom-radio"></span>
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <Button type="button" id = "Next" onClick={handlePrev} disabled={currentPage === 0}>
          Previous
        </Button>
        <button type="button" id= "Next" onClick={handleNext} disabled={currentPage === questions.length - 1}>
          Next
        </button>
      </form>
      <ProgressBar progress={progress} max={100} color="#2c6fbb" />
    </div>
  );
};

export default BasicQuestions;
