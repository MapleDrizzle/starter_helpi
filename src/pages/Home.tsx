import React from "react";
import starfish from "../images/homePageImages/starfish.png";
import shell from "../images/homePageImages/shell.png";

interface HomeProp {
    handlePage: (page: string) => void;
}

// Home Page Format
const home: React.FC<HomeProp> = ({handlePage}) => {
    return (
    <div>
        <img src={starfish} alt="Starfish" className="starfish" />
        <img src={shell} alt="Shell" className="shell" />
        <div className="bigBox">
        <h1>ShorePath</h1>
        <h2>In the ocean of opportunities find which career suits you best</h2>
        <div className="container">
            <div className="box">
                <h2 style={{ color: "#2c6fbb"}}>Basic Quiz</h2>
                <p style={{ color: "#2c6fbb"}}>
                    The Basic Quiz is a short questionaire designed
                    to gauge your knowledge with simple
                    questions. With immediate feedback, you will know which
                    career is right for you in a matter of a few minutes!{" "}
                </p>
                <button className="rounded-button blue-gradient" onClick={() => handlePage('Basic')}> Start Basic Quiz</button>
            </div>
            <div className="box">
                <h2 style={{ color: "#2c6fbb"}}>Detailed Quiz</h2>
                <p style={{ color: "#2c6fbb"}}>
                    The Detailed Quiz is a longer assessment consisting of more questions with more detailed choices. It
                    will give you a more accurate and detailed assesment of what
                    carreer you should choose.
                </p>
                <button className="rounded-button blue-gradient" onClick={() => handlePage('Detailed')}> Start Detailed Quiz</button>
            </div>
        </div>
        </div>
    </div>
    );
};
export default home;