import React from "react";

type Props = {
    question: string;
    answers?: string[]; // Making answers prop optional
    callBack: any;
    userAnswer: any;
    questionNr: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
    question, 
    answers = [], // Defaulting answers to an empty array if it's undefined
    callBack,
    userAnswer,
    questionNr,
    totalQuestions
}) => (
    <div>
        <p className="number">
            Question: {questionNr} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{__html: question}} />
        <div>
            {answers.map((answer) => (
                <div key={answer}>
                    <button disabled={userAnswer} value={answer} onClick={callBack}>
                       <span dangerouslySetInnerHTML={{__html: answer}} />
                    </button>
                </div>
            ))}
        </div>
    </div>
);

export default QuestionCard;
