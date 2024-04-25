import React, {useState} from "react";
import { fetchQuizQuestions } from "./detailedComponents/API";
//Components
import QuestionCard from "./detailedComponents/QuestionCard";
//Types
import { QuestionState, Difficulty } from "./detailedComponents/API";


type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const DetailedPage = () => {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionState[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true); 

    console.log(questions)

    const startQuiz = async () => {
        setLoading(true);
        setGameOver(false);

        const newQuestions = await fetchQuizQuestions(
            TOTAL_QUESTIONS,
            Difficulty.EASY
        );

        setQuestions(newQuestions);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
    };

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!gameOver) {
            // user answer
            const answer = e.currentTarget.value;
            // check if correct
            const correct = questions[number].correct_answer === answer;
            // add score if answer is correct
            if (correct) setScore(prev => prev + 1);
            // save answer in the array for user answers
            const answerObject = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer,
            };
            setUserAnswers(prev => [...prev.slice(0, number), answerObject, ...prev.slice(number + 1)]);
        }
    }
    

    const nextQuestion = () => {
        //move onto next question unless last
        const nextQuestion = number + 1;

        if (nextQuestion === TOTAL_QUESTIONS){
            setGameOver(true);
        }
        else{
            setNumber(nextQuestion);
        }
    }

const prevQuestion = () => {
    // Move to the previous question unless it's the first question
    const prevQuestion = number - 1;

    if (prevQuestion >= 0) {
        setNumber(prevQuestion);
    }
}


return(
    <div className = 'DetailedPage'>
        <h1 className = "detailedHeader"> Detailed Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ?(
        <button className="Start" onClick={startQuiz}>
            Start
        </button>
        ) : null}
        {!gameOver ? <p className="score"> Score: {score} </p> : null}
        {loading && <p>Loading Questions...</p>}
        <p> Score: {score}</p>
        {!loading && !gameOver && (
        <QuestionCard
            questionNr = {number +1}
            totalQuestions = {TOTAL_QUESTIONS}
            question = {questions[number].question}
            answers = {questions[number].answers}
            userAnswer = {userAnswers ? userAnswers[number] : undefined}
            callBack = {checkAnswer}

        />
        )}
    {!gameOver &&
                !loading &&
                number !== 0 && (
                    <button className="prev" onClick={prevQuestion}>
                        Previous Question
                    </button>
                )}
            {!gameOver &&
                !loading &&
                userAnswers.length > number && // Show if user has answered the current question
                number !== TOTAL_QUESTIONS - 1 && (
                    <button className="next" onClick={nextQuestion}>
                        Next Question
                    </button>
                )}
        </div>
    );
}

export default DetailedPage;