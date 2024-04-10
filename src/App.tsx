import React, { useState } from "react";
import "./App.css";
import { Button, Form } from "react-bootstrap";
// MOVED THE IMPORT STATEMENTS TO HOME PAGE FILE
import BasicQuestions from './pages/BasicQuestions';
import DetailedQuestions from './pages/DetailedQuestions';
import Home from './pages/Home';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
    keyData = JSON.parse(prevKey);
}


function App() {
    const [page, setPage] = useState(0);
    const [key, setKey] = useState<string>(keyData); //for api key input

    //sets the local storage item to the api key the user inputed
    function handleSubmit() {
        localStorage.setItem(saveKeyData, JSON.stringify(key));
        window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
    }

    //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
    function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
        setKey(event.target.value);
    }
    return (
        <div className="App" style={{ backgroundColor: '#6b2737', minHeight: '100vh', color: '#fff' }}>
             {/* Buttons to switch states*/}
             <div style={{ textAlign: 'center'}}>
                <Button onClick={() => setPage(0)}>Home</Button>
                <Button onClick={() => setPage(1)}>Basic Quiz</Button>
                <Button onClick={() => setPage(2)}>Detailed Quiz</Button>
                {page === 0 ? <Home /> : page === 1 ? <BasicQuestions /> : <DetailedQuestions />}
            </div>
            
            {/* UNEDIT THIS IF NECESSARY vv
            <div>
                <h1 style={{ textAlign: 'center'}}> Home Page</h1>
                <img src={branchTop} alt="Branch" style={{ position: 'absolute', top: 0, left: 0, width: '100px', height: '100px', zIndex: 1, transform: 'rotate(90deg)'}} />
                <img src={branchTop} alt="Branch" style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', zIndex: 1, transform: 'rotate(-90deg)' }} />
                <NavigationBar />
                <DescriptionTable />
            </div>
        {/*
        {currentState === 1 && (
            <div>
                <h2> Basic Page</h2>
                <p>This is the basic page.</p>
            </div>
        )}
        */}

        <div style={{ textAlign: 'center'}}>
                 <Form>
                <Form.Label>API Key:</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Insert API Key Here"
                    onChange={changeKey}
                ></Form.Control>
                <br></br>
                <Button className="Submit-Button" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    </div>
    );
}

export default App;
