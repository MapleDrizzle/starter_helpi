import React, { useState } from "react";
import "./App.css";
import { Button, Form } from "react-bootstrap";
import NavigationBar from "./components/homePageComp/navigation-bar/navigationBar";
import shorepathlogo from "./images/homePageImages/shorepathlogo.png";
import DetailedQuestions from './pages/DetailedQuestions';
import BasicQuestions from './pages/BasicQuestions';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Canvas from "./components/homePageComp/waves/waveComponents/canvas";

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
    keyData = JSON.parse(prevKey);
}

function App() {
    const [key, setKey] = useState<string>(keyData); //for api key input
    const [currPg, setCurrPg] = useState<string>("Home"); // switches pages

    const handleTabChange = (page: string) => {
        setCurrPg(page);
    }

    //sets the local storage item to the api key the user inputed
    function handleSubmit() {
        localStorage.setItem(saveKeyData, JSON.stringify(key));
        window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
    }

    //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
    function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
        setKey(event.target.value);
    }
    // changes pages
    const updatePageState = () => {
        switch (currPg) {
            case 'Basic':
                return <BasicQuestions handlePage={handleTabChange} />; // switches to Basic 
            case 'Detailed':
                return <DetailedQuestions handlePage={handleTabChange} />; // switches to Detailed 
            case 'Contact':
                return <Contact handlePage={handleTabChange} />; // switches to Contact 
            case 'Home':
            default:
                return <Home handlePage={handleTabChange} />; // switches to Home 
        }
    }

    return (
        <div
            className="App"
            style={{
                backgroundColor: "#f6d7b0",
                minHeight: "100vh",
                color: "#fff"
            }}
        >
            <div className = "ShorePath">ShorePath</div>
            {/* Navigation Bar*/}
            <NavigationBar activeTab={currPg} handlePage={setCurrPg}/>
            {updatePageState()}
            {/*adds the ShorePath Logo*/}
            <img src={shorepathlogo} alt="ShorePath Logo" className="logo" />
            <div className = "footer">
            <div>
                <Form>
                    <Form.Label id = "api">API Key:</Form.Label>
                    <Form.Control id = "input"
                        type="password"
                        placeholder="Insert API Key Here"
                        onChange={changeKey}
                        style={{ borderRadius: '20px', width: '250px', height: '25px', padding: '5px'}}
                    ></Form.Control>
                    <Button className="Submit-Button" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form>
            </div>
            </div>
            <div id = "waves">
                <Canvas />
            </div>
        </div>
    );
}

export default App;
