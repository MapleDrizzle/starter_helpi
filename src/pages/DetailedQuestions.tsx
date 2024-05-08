import React, { useState } from "react";
import ProgressBar from "../components/progress-bar/progressBar";
import DetailedResults from './DetailedResults';
import { RingLoader } from "react-spinners";
import OpenAI from "openai";
import { Alert } from "react-bootstrap";

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
    const [quizResults, setQuizResults] = useState<string | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [responses, setResponses] = useState<Responses>({
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
    const [progress, setProgress] = useState<number>(0);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState('');


    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setProgress(progress + (100 / questions.length));
        }
    };
    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setCurrentPage(currentPage - 1);
            setProgress(progress - (100 / questions.length - 1));
        }
      };
        

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        const { name, value } = event.target;
        setResponses((prevResponses) => ({
            ...prevResponses,
            [name]: value,
        }));
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setResponses((prevResponses) => ({
            ...prevResponses,
            [name]: value,
        }));
    };

    const isRadioButtonSelected = (questionIndex: number): boolean => {
        const selectedValue = responses[`question${questionIndex + 1}` as keyof Responses];
        return ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].includes(selectedValue);
    };
    

    const isNextButtonDisabled = () => {
        if (currentQuestionIndex < 3) {
            return !isRadioButtonSelected(currentQuestionIndex);
        } else { 
            return responses[`question${currentQuestionIndex + 1}` as keyof Responses].length < 30;
        }
    };
    

    const handleSubmit = async () => {
        setLoading(true);
        try {
        let answerJson = JSON.stringify(responses);
        answerJson = "What career should I have given these questions and my corresponding answers?" + JSON.stringify(questions) + answerJson;
        console.log(answerJson);
        const chatResponse = await openai.chat.completions.create(
            {messages: [ //edit system role to edit the output it gives you
                {role: "system", content: "You are a career advisor. You will return a concrete list of career options given a list of questions and corresponding record object with question answer key value pairs. Only return responses, no questions."}, 
                {role: "user", content: answerJson}], model: "gpt-4"})
        setQuizResults(chatResponse.choices[0].message.content);
        setShowResults(true);
        setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error: API key is missing or invalid. Please check your configuration.');
        } finally {
            setLoading(false);// Set loading state back to false
            setProgress(100);
        }
    };

    return (
        <div className="basicForm">
            {showResults ? (
            <div className="submission-message">
            <h2>Form submitted successfully!</h2>
            <DetailedResults />
            {quizResults && <p>Your Results:  {quizResults}</p>}
        </div>
        ) : (<form>
            <h1>Detailed Quiz</h1>
            <p>{questions[currentQuestionIndex]}</p>
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
                <p className="select-answer-text">Please select an answer</p>
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
                <button type="button" onClick={handleSubmit} disabled={responses[`question${currentQuestionIndex + 1}` as keyof Responses].length < 30}>
                    Submit
                </button>
            )}
            {errorMessage && (
                    <Alert variant="danger">
                    {errorMessage}
                    </Alert>
            )}
            {progress > 0 && progress < 100 && <ProgressBar progress={progress} max={100} color="#2c6fbb" />}
            {loading && (
            <div className="loading-screen">
              <RingLoader color="#2c6fbb" size={60} />
              <p>Loading...</p>
            </div>
          )}
        </form>)}
        </div>
    );
};

export default DetailedQuestions;
