import React from "react";
import github from "../images/homePageImages/github.png";


interface ContactProp {
    handlePage: (page: string) => void;
}

const Contact: React.FC<ContactProp> = ({handlePage}) => {
    return (
    <div>
        <div className="bigBox">
        <h1>Contact</h1>
        <div className="container">
            <div className="box">
            <h2 >Larissa Chelius</h2>
                <p style={{ color: "#2c6fbb"}}>
                    Sophomore Computer Science Major
                </p>
                <br></br>
                <p style={{ color: "#2c6fbb"}}>
                    <a href="https://github.com/Larissa-Chelius" target="_blank" rel="noopener noreferrer">Visit my GitHub</a>
                </p>
            </div>
            <div className="box">
                <h2 >Sophia Romero</h2>
                <img src={github} alt="Github Logo" id="github1" />
                <p style={{ color: "#2c6fbb"}}>
                    Sophomore Computer Science Major with interest in the both programming and the arts. Creator of all the art presented in the website.
                </p>
                <br></br>
                <p style={{ color: "#2c6fbb"}}>
                    <a href="https://github.com/MapleDrizzle" target="_blank" rel="noopener noreferrer">Visit my GitHub</a>
                </p>
            </div>
            <div className="box">
                <h2 >Rue Lin</h2>
                <p style={{ color: "#2c6fbb"}}>
                    Sophomore Computer Science Major 
                </p>
                <br></br>
                <p style={{ color: "#2c6fbb"}}>
                    <a href="https://github.com/ruelin3" target="_blank" rel="noopener noreferrer">Visit my GitHub</a>
                </p>
            </div>
        </div>
        </div>
    </div>
    );
}
export default Contact;