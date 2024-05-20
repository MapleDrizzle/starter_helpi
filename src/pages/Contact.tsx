import React from "react";
import seaweed from "../images/homePageImages/seaweed.png";
import seaweed2 from "../images/homePageImages/seaweed2.png";

// Contact Page
interface ContactProp {
    handlePage: (page: string) => void;
}

const Contact: React.FC<ContactProp> = ({handlePage}) => {
    return (
    <div>
        <img src={seaweed} alt="Seaweed decoration" id="seaweed" />
        <img src={seaweed2} alt="Seaweed decoration" id="seaweed2" />
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
                    <a href="https://github.com/Larissa-Chelius" className= "rounded-button blue-gradient" target="_blank" rel="noopener noreferrer">Visit my GitHub</a>
                </p>
            </div>
            <div className="box">
                <h2 >Sophia Romero</h2>
                <p style={{ color: "#2c6fbb"}}>
                    Sophomore Computer Science Major with interest in the both programming and the arts. Creator of all the art presented in the website.
                </p>
                <br></br>
                <p style={{ color: "#2c6fbb"}}>
                    <a href="https://github.com/MapleDrizzle" className= "rounded-button blue-gradient" target="_blank" rel="noopener noreferrer">Visit my GitHub</a>
                </p>
            </div>
            <div className="box">
                <h2 >Rue Lin</h2>
                <p style={{ color: "#2c6fbb"}}>
                    Sophomore Computer Science Major with interests in gaming, project management, and the arts. 
                </p>
                <br></br>
                <p style={{ color: "#2c6fbb"}}>
                    <a href="https://github.com/ruelin3" className= "rounded-button blue-gradient" target="_blank" rel="noopener noreferrer">Visit my GitHub</a>
                </p>
            </div>
        </div>
        </div>
    </div>
    );
}
export default Contact;