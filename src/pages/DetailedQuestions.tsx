import React, { useState } from "react";
import ProgressBar from "../components/progress-bar/progressBar";
import DetailedResults from './DetailedResults';
import OpenAI from "openai";
import { Alert } from "react-bootstrap";
import Loading from "./Loading";
import CareerSuggestions from "./BasicSuggestions";


//image imports
import motivates from "../images/homePageImages/help.png";
import accomplishments from "../images/homePageImages/Accomplishments.png";
import conflict from "../images/homePageImages/Conflicts.png";
import pressure from "../images/homePageImages/pressure.png";
import counsel from "../images/homePageImages/counsel.png";
import handson from "../images/homePageImages/handson.png";
import good from "../images/homePageImages/good.png";
import complex from "../images/homePageImages/Complex.png";
import organized from "../images/homePageImages/organized.png";
import goals from "../images/homePageImages/Goals.png"

/*  Credit to OpenAI's ChatGPT for assistance with API handling
 The function retrieves an API key stored in the browser's local storage and uses it to initialize an OpenAI client. 
 If the API key is not found, it logs an error message. */ 

const saveKeyData = "MYKEY"
const getAPIKey = (): string | undefined => {
    const key = localStorage.getItem(saveKeyData);
    return key ? JSON.parse(key) : null;
}

const apiKey = getAPIKey();

const openai = new OpenAI({apiKey, dangerouslyAllowBrowser: true});

interface DetailedProp {
    handlePage: (page: string) => void;
}

interface Responses {
    question1: string;
    question2: string;
    question3: string;
    question4: string;
    question5: string;
    question6: string;
    question7: string;
    question8: string;
    question9: string;
    question10: string;
}
// Quiz questions
const DetailedQuestions: React.FC<DetailedProp> = ({ handlePage }) => {
    const questions: string[] = [
        "I am a very hands-on person.",
        "I work well under pressure.",
        "I am good at counseling people.",
        "What are some of the most fulfilling aspects of your current or past roles?",
        "What do you consider your greatest accomplishment?",
        "How do you handle conflicts in the workplace?",
        "Describe a situation where you had to solve a complex problem.",
        "What motivates you to succeed?",
        "How do you prioritize tasks and manage your time effectively?",
        "What are your long-term career goals?"
    ];
    const [quizResults, setQuizResults] = useState<string | null>(null); // shows quiz results
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0); // handles whichever question is the current one
    const [responses, setResponses] = useState<Responses>({ // keeps track of the user's responses
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: '',
        question6: '',
        question7: '',
        question8: '',
        question9: '',
        question10: ''
    });
    const [loading, setLoading] = useState<boolean>(false); // for the loading screen (in progress)
    const [progress, setProgress] = useState<number>(0); // for the progress bar
    const [showResults, setShowResults] = useState<boolean>(false); // for showing the results
    const [currentPage, setCurrentPage] = useState<number>(0); // for showing the current page
    const [error, setError] = useState(false); // for determining if the question has been answered or not

    const images = [
        handson, pressure, counsel, good, accomplishments, conflict, complex, motivates, organized, goals
      ];

    const currentImage = images[currentPage];

    // Handles going to the next question
    const nextQuestion = () => {
        if ((currentQuestionIndex < questions.length - 1) && localStorage.getItem(saveKeyData) !== null) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentPage(currentPage + 1);
            setProgress(progress + (100 / questions.length));
        }
        else {
            setError(true);
        }
    };
    // Handles going to the previous question
    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setCurrentPage(currentPage - 1);
            setProgress(progress - (100 / questions.length - 1));
        }
      };
    
    // Handles which answer is chosen
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setResponses((prevResponses) => ({
            ...prevResponses,
            [name]: value,
        }));
    };
    // Allows input of text 
    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setResponses((prevResponses) => ({
            ...prevResponses,
            [name]: value,
        }));
    };
    // Returns which option was selected
    const isRadioButtonSelected = (questionIndex: number): boolean => {
        const selectedValue = responses[`question${questionIndex + 1}` as keyof Responses];
        return ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].includes(selectedValue);
    };
    
    // Stops user from continuing the quiz
    const isNextButtonDisabled = () => {
        if (currentQuestionIndex < 3) {
            return !isRadioButtonSelected(currentQuestionIndex);
        } else { 
            return responses[`question${currentQuestionIndex + 1}` as keyof Responses].length < 30;
        }
    };
    
      // Credit to OpenAI's ChatGPT model for generating chat responses
    // Returns a text of results using all of the chosen answers
    const handleSubmit = async () => {
        setLoading(true);
        try {
        let answerJson = JSON.stringify(responses);
        answerJson = "What career should I have given these questions and my corresponding answers?" + JSON.stringify(questions) + answerJson;
        console.log(answerJson);
        const chatResponse = await openai.chat.completions.create(
            {messages: [ // edit system role to edit the output it gives you
                {role: "system", content: "You are a career advisor. You will return a concrete list of 4 career options given the list of questions and corresponding record object with question answer key value pairs. Separate the career name and description by ONLY a colon. Explain the choices as well! Only return responses, no questions.in addition, say the salary like this Average salary - $66,000. Do not put quotes around the results. Do not add extra white space. "}, 
                {role: "user", content: answerJson}], model: "gpt-4"}) //  the language model (gpt-4) for generating the chat response
        setQuizResults(chatResponse.choices[0].message.content);
        setShowResults(true);
        } finally {
            setLoading(false); // Set loading state back to false
            setProgress(100);
        }
    };

    return (
        <div className="basicForm">
            {showResults ? ( // Once the loading screen is done, show the results page 
            <div className="submission-message">
            <DetailedResults />
            {quizResults && (
            <div>
              <h2> Click on the careers to find out more: </h2>
              
              <CareerSuggestions results={quizResults || ""} />
             
            </div>
          )}
        </div>
        ) : (loading ? <Loading /> : (<form> 
            <h1>Detailed Quiz</h1> {/*Format of the Detailed Quiz*/} 
            <img src={currentImage} alt="Working together" style={{ maxWidth: "100%" }} />
            <p className = "questions">{questions[currentQuestionIndex]}</p>
            {currentQuestionIndex < 3 && (
                <div className="radio-group">
                    {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map(
                        (label, index) => (
                            <label className="radio-button" key={`question-${currentQuestionIndex}-${index}`}>
                                <input
                                    type="radio"
                                    name={`question${currentQuestionIndex + 1}`}
                                    value={label}
                                    checked={responses[`question${currentQuestionIndex + 1}` as keyof Responses] === `${label}`}
                                    onChange={handleRadioChange}
                                />
                                <span className="custom-radio"></span>
                                {label}
                            </label>
                        )
                    )}
                </div>
            )}
            {currentQuestionIndex < 3 && !isRadioButtonSelected(currentQuestionIndex) && (
                <p className="select-answer-text">Please complete this question before moving on.</p>
            )}
            {currentQuestionIndex >= 3 && (
                <div className="text-area">
                    <textarea
                        name={`question${currentQuestionIndex + 1}`}
                        value={responses[`question${currentQuestionIndex + 1}` as keyof Responses]}
                        onChange={handleTextChange}
                        placeholder="Type your answer here..."
                        rows={4}
                        cols={50}
                    ></textarea>
                    {responses[`question${currentQuestionIndex + 1}` as keyof Responses].length < 30 && (
                        <p>Please provide a minimum of 30 characters.</p>
                    )}
                </div>
            )}
                {currentQuestionIndex !== questions.length - 1 && currentQuestionIndex !== 0 && (
                <button type="button" id="Next" onClick={handlePrev}>
                    Previous
                </button>
            )}
            {currentQuestionIndex !== questions.length - 1 && (
                <button type="button" id="Next" onClick={nextQuestion} disabled={isNextButtonDisabled()}>
                    Next
                </button>
            )}
            {currentQuestionIndex === questions.length - 1 && (
                <button type="button" id = "Next" onClick={handleSubmit} disabled={responses[`question${currentQuestionIndex + 1}` as keyof Responses].length < 30}>
                    Submit
                </button>
            )}
            {error && (
                    <Alert variant="danger">
                        <h5>Please enter an API key before continuing.</h5>
                    </Alert>
            )}
            {/*Progress Bar*/}
            {progress > 0 && progress < 100 && <ProgressBar progress={progress} max={100} color="#2c6fbb" />}
        </form>))}
        </div>
    );
};

export default DetailedQuestions;
