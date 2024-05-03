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
  const [showSubmissionMessage, setShowSubmissionMessage] = useState(false);

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
      setShowSubmissionMessage(true); // Display submission message upon completing all questions
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      const newProgress = ((currentPage - 1) * 100) / questions.length;
      setProgress(newProgress);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted with responses:", responses);
    setProgress(100); // Set progress to 100 upon form submission
    setShowSubmissionMessage(true); // Display submission message
  };

  const handleCloseMessage = () => {
    setShowSubmissionMessage(false); // Close the submission message
  };

  return (
    <div className="basicForm">
      <form onSubmit={handleSubmit}>
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
        <Button type="button" id = "Next" onClick={handleNext} disabled={currentPage === questions.length - 1}>
          Next
        </Button>
        {currentPage === questions.length - 1 && (
          <Button type="submit" id = "Next">
            Submit
          </Button>
        )}
      </form>
      <ProgressBar progress={progress} max={100} color="#2c6fbb" />

      {/* Submission message popup */}
      {showSubmissionMessage && (
        <div className="submission-message">
          <h2>Quiz submitted successfully!</h2>
          <Button onClick={handleCloseMessage} id = "Next">Close</Button>
        </div>
      )}
    </div>
  );
};

export default BasicQuestions;
