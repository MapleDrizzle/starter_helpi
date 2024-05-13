import React, { useState } from "react";
import ProgressBar from "../components/progress-bar/progressBar";
import { Button, Alert } from "react-bootstrap";
import BasicResults from "./BasicResults";
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
import plants from "../images/homePageImages/plants.png";
import animals from "../images/homePageImages/animals.png";
import chilis from "../images/homePageImages/chilis.png";
import planning from "../images/homePageImages/planning.png";
import tome from "../images/homePageImages/tome.png";
import doctor from "../images/homePageImages/doctor.png";
import CareerSuggestions from "./BasicSuggestions";
import Loading from "./Loading";



const saveKeyData = "MYKEY";
const getAPIKey = (): string | undefined => {
  const key = localStorage.getItem(saveKeyData);
  return key ? JSON.parse(key) : null;
};

const apiKey = getAPIKey();

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true
});

interface BasicProps {
  handlePage: (page: string) => void;
}

export const topOfPage = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Smooth scrolling behavior
  });
}
const BasicQuestions: React.FC<BasicProps> = ({ handlePage }) => {
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [error, setError] = useState(false);
  const [prev, setPrev] = useState(0);

  const images = [
    workTogether,
    alone,
    idea,
    help,
    counsel,
    organized,
    creative,
    good,
    handson,
    pressure,
    plants,
    tome,
    animals,
    chilis,
    doctor,
    planning
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
    { question: "I am comfortable using technology and learning new software", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { question: "I understand animals over humans", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { question: "I prefer working in a fast-paced environment where I have to adapt quickly", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { question: "I am interested in working in the healthcare industry", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { question: "I excel in organizing and planning tasks or projects", options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  ];

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setResponses((prevResponses) => ({
      ...prevResponses,
      [name]: value
    }));
    setAnswered(true);
  };

  const handleNext = () => {
    console.log(prev);
    if (currentPage < questions.length - 1 && localStorage.getItem(saveKeyData) !== null) {
      if(prev === 0) {
      setCurrentPage(currentPage + 1);
      const newProgress = ((currentPage + 1) * 100) / questions.length;
      setProgress(newProgress);
      setAnswered(false);
    } else { // the previous button was clicked
      setPrev(prev - 1); // subtracts answered questions until you hit a question that hasn't been answered yet
      setCurrentPage(currentPage + 1);
      const newProgress = ((currentPage + 1) * 100) / questions.length;
      setProgress(newProgress);
      if(prev > 0) { // next question already answered, no warning should appear
          setAnswered(true);
      } else {
          setAnswered(false); // next question not answered yet, warning should appear
      }
    }
  } else {
    setError(true); 
   } };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      const newProgress = ((currentPage - 1) * 100) / questions.length;
      setProgress(newProgress);
      setAnswered(true);
      if(answered) {
        setPrev(prev + 1); // keeps track of how many times previous button was clicked so "unanswered" warning doesn't pop up when you click next
      }
      console.log(prev);    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const answerJson = JSON.stringify(responses);
      console.log(responses); 
      const questionJson = JSON.stringify(questions);
      const chatResponse = await openai.chat.completions.create({
  
        messages: [
          { role: "system", content: "You are a career advisor. You will return a concrete list of 4 career options given the list of questions and corresponding record object with question answer key value pairs. Separate the career name and description by ONLY a colon. Explain the choices as well! Only return responses, no questions.in addition, say the salary like this Average salary - $66,000. Do not put quotes around the results. Do not add extra white space. "}, 
            { role: "user", content: answerJson },
            {role: "user", content: questionJson}
        ],
        model: "gpt-4"
      });
      const generatedResponse = chatResponse.choices[0].message.content;
      setQuizResults(generatedResponse);
      setSubmitted(true);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };
  const currentImage = images[currentPage];

  
  return (
    <div className="basicForm">
      {submitted ? (
        <div className="submission-message">
          <BasicResults responses={responses} questions={questions} />
          {quizResults && (
            <div>
              <h2> Click on the careers to find out more: </h2>
              
              <CareerSuggestions results={quizResults || ""} />
             
            </div>
          )}
        </div>
      ) : (loading ? <Loading /> : (
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
                  <h5>Please complete this question before moving on.</h5>
                </Alert>
              )}
            </div>
          )}
          {currentPage !== 0 &&
          <Button type="button" id="Next" onClick={handlePrev} disabled={currentPage === 0}>
            Previous
          </Button>
          }
          {currentPage !== 15 && 
          <Button type="button" id="Next" onClick={handleNext} disabled={!answered || currentPage === questions.length - 1}>
            Next
          </Button>
}
          {currentPage === questions.length - 1 && (
            <Button type="submit" id="Next">
              Submit
            </Button>
          )}
          {error && (
            <Alert variant="danger">
              <h5>Please enter an API key before continuing.</h5>
            </Alert>
          )}
          <ProgressBar progress={progress} max={100} color="#2c6fbb" />

      
        </form>
      ))}
    </div>
  );
};

export default BasicQuestions;
