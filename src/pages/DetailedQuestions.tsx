import React, { useState } from "react";
import ProgressBar from "../components/progress-bar/progressBar";
import DetailedResults from './DetailedResults';
//import {userRole} from '../components/apiFiles/api'
import OpenAI from "openai";

// ADD IN API KEY AGAIN! Right down here vv
const openai = new OpenAI({apiKey: "", dangerouslyAllowBrowser: true});

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
    //let quizLength = 10;
    const questions = [
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
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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
    //const [loading, setLoading] = useState<boolean>(false); // for the loading screen (in progress)
    const [progress, setProgress] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setProgress(progress + (100 / questions.length));
            //quizLength = quizLength - 1;
        }
        //console.log(quizLength);
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

    const isNextButtonDisabled = () => {
        if (currentQuestionIndex < 3) {
            return false;
        } else if (currentQuestionIndex >= 3 && currentQuestionIndex <= 9) {
            return responses[`question${currentQuestionIndex + 1}` as keyof Responses].length < 30;
        } else {
            return false;
        }
    };

    const handleSubmit = async () => {
        //setLoading(true);
        //quizLength = quizLength - 1;
        let answerJson = JSON.stringify(responses);
        answerJson = "What career should I have given these questions and my corresponding answers?" + JSON.stringify(questions) + answerJson;
        console.log(answerJson);
        const chatResponse = await openai.chat.completions.create(
            {messages: [ //edit system role to edit the output it gives you
                {role: "system", content: "You are a career advisor. You will return a concrete list of career options given a list of questions and corresponding record object with question answer key value pairs. Only return responses, no questions."}, 
                {role: "user", content: answerJson}], model: "gpt-4"})
        setQuizResults(chatResponse.choices[0].message.content);
        setShowResults(true);
        //setLoading(false); 
        console.log(chatResponse.choices[0].message.content);
        console.log("Done");
        /*try {
            const results = await userRole(
                Object.values(responses),
                Object.keys(responses)
            );
            setQuizResults(results);
            setShowResults(true);
        } catch (error) {
            console.error("Error fetching quiz results:", error);
        }
        */
    };
    /*
    LOADING SCREEN FUNCTION (doesn't work)
    const loadingScreen = () => {
        if(quizLength === 0) {
            if(loading && !showResults) {
                <h1>Loading...</h1>
            } else {
                <DetailedResults quizResults={quizResults}/>
            }
        }
        else {
            return "";
        }
    }
    */
    return (
        <div className="basicForm">
            <form>
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
                {progress > 0 && progress < 100 && <ProgressBar progress={progress} max={100} color="#2c6fbb" />}
            </form>
            
            {/*quizLength === 0 ? (loading && !showResults ? <h1>Loading...</h1> : <DetailedResults quizResults={quizResults}/>) : ""*/}
            {showResults && <DetailedResults quizResults={quizResults}/>}
        </div>
    );
};

export default DetailedQuestions;
