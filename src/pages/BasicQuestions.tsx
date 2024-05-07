import React, { useState } from "react";
import ProgressBar from "../components/progress-bar/progressBar";
import { Button, Alert } from "react-bootstrap";
import BasicResults from "./BasicResults";
import { RingLoader } from "react-spinners";
import OpenAI from "openai";
import workTogether from "../images/homePageImages/workTogether.png";
import alone from "../images/homePageImages/alone.png";
import idea from "../images/homePageImages/idea.png";
import help from "../images/homePageImages/help.png";
import counsel from "../images/homePageImages/counsel.png";
import organized from "../images/homePageImages/organized.png";
import creative from "../images/homePageImages/creative.png";
import good from "../images/homePageImages/good.png";
import handson from "../images/homePageImages/handson.png";
import pressure from "../images/homePageImages/pressure.png";

const saveKeyData = "MYKEY"
const getAPIKey = (): string | undefined => {
    const key = localStorage.getItem(saveKeyData);
    return key ? JSON.parse(key) : null;
}

const apiKey = getAPIKey();

const openai = new OpenAI({ apiKey
, dangerouslyAllowBrowser: true });
//const OPENAI_API_URL = "https://api.openai.com/v1/engines/davinci/completions";

interface BasicProps {
  handlePage: (page: string) => void;
}

const BasicQuestions: React.FC<BasicProps> = ({ handlePage }) => {
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
 const [answered, setAnswered] = useState(false); 

 const images = [
    workTogether, alone, idea, help, counsel, organized, creative, good, handson, pressure
  ];

  const questions = [
    { question: "I like working in a team", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { question: "I prefer working alone", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { question: "I am fascinated by different ideas", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { question: "I enjoy helping others", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { question: "I am good at counseling people", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { question: "I am an organized person", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { question: "I am a creative person", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { question: "I see the good in people", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { question: "I am a hands-on person", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { question: "I work well under pressure", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { question: "I like taking care of plants", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { question: "I am an organized person", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { question: "I understand animals over humans", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { question: "I prefer job roles that allow me to be creative and innovative.", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { question: "I am interested in working in the healthcare industry", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { question: "I excel in organizing and planning tasks or projects", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  ];

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setResponses((prevResponses) => ({
      ...prevResponses,
      [name]: value
    }));
    setAnswered(true)
  };

  const handleNext = () => {
    if (currentPage < questions.length - 1) {
      setCurrentPage(currentPage + 1);
      const newProgress = ((currentPage + 1) * 100) / questions.length;
      setProgress(newProgress);
      setAnswered(false)

    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      const newProgress = ((currentPage - 1) * 100) / questions.length;
      setProgress(newProgress);
      setAnswered(true)

    }
  };

  const currentImage = images[currentPage];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true); // Set loading state to true

    try {
        const answerJson = JSON.stringify(responses);
        const chatResponse = await openai.chat.completions.create({
          messages: [
            { role: "system", content: "You are a career advisor. Explain the choices and You will return a concrete list of 4 career options given a list of questions and corresponding record object with question answer key value pairs. Only return responses, no questions."}, 
            { role: "user", content: answerJson }
          ],
          model: "gpt-4"
        });
        const generatedResponse = chatResponse.choices[0].message.content;
      setQuizResults(generatedResponse);
      setSubmitted(true);
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
       setLoading(false);// Set loading state back to false
      setProgress(100);

    }
  };

  return (
    <div className="basicForm">
      {submitted ? (
        <div className="submission-message">
          <h2>Form submitted successfully!</h2>
          <BasicResults responses={responses} questions={questions} />
          {quizResults && <p>Your Results:  {quizResults}</p>}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Basic Quiz</h1>
          <img src={currentImage} alt="Working together" style={{ maxWidth: "100%" }} />
          {questions[currentPage] && (
            <div className="questions">
              <p>{questions[currentPage].question}</p>
              <div className="radio-group">
                {questions[currentPage].options.map((option, optionIndex) => (
                  <label className="radio-button" key={`question${currentPage}-${optionIndex}`}>
                    <input
                      type="radio"
                      name={`question${currentPage}`}
                      value={option}
                      checked={responses[`question${currentPage}`] === option}
                      onChange={handleRadioChange}
                    />
                    <span className="custom-radio"></span>
                    {option}
                  </label>
                ))}
              </div>
              {!answered && (
                <Alert variant="warning">
                  <h5> Please complete this question before moving on.</h5>
                </Alert>
              )}
            </div>
          )}

          <Button type="button" id="Next" onClick={handlePrev} disabled={currentPage === 0}>
            Previous
          </Button>
          <Button type="button" id="Next" onClick={handleNext} disabled={!answered || currentPage === questions.length - 1}>
            Next
          </Button>
          {currentPage === questions.length - 1 && (
            <Button type="submit" id="Next">
              Submit
            </Button>
          )}

          <ProgressBar progress={progress} max={100} color="#2c6fbb" />

          {loading && (
            <div className="loading-screen">
              <RingLoader color="#2c6fbb" size={60} />
              <p>Loading...</p>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default BasicQuestions;
