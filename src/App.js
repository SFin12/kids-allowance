import React from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignInScreen from "./components/Sign-in";
import MainPage from "./Pages/MainPage/MainPage";
import firebase from "firebase/compat/app";

function App() {
    return (
        <div className="App">
            <h1>Kids Allowance App</h1>
            <div className="container">
                <Routes>
                    <Route path="/" element={<SignInScreen />}></Route>
                    <Route
                        path="/main"
                        element={
                            <MainPage user={firebase.auth().currentUser} />
                        }
                    ></Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
