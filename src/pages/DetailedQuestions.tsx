import React, { useState } from "react";
import ProgressBar from "../components/progress-bar/progressBar";
import DetailedResults from './DetailedResults';
import {userRole} from '../components/apiFiles/api'

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

    const [quizResults, setQuizResults] = useState<string[]>([]);
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
    const [progress, setProgress] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setProgress(progress + (100 / questions.length));
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
        try {
            const results = await userRole(
                Object.values(responses),
                Object.keys(responses)
            );
            setQuizResults(results);
            setShowResults(true);
        } catch (error) {
            console.error("Error fetching quiz results:", error);
        }
    };

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
                                        value={index + 1}
                                        checked={responses[`question${currentQuestionIndex + 1}` as keyof Responses] === `${index + 1}`}
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
            {showResults && <DetailedResults quizResults={quizResults} />}
        </div>
    );
};

export default DetailedQuestions;
