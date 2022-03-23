import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import "firebase/compat/auth";
import MainPage from "./Pages/MainPage/MainPage";
import SignInPage from "./Pages/SignInPage/SignInPage";

function App() {
    return (
        <div className="App">
            <div className="container">
                <Routes>
                    <Route path="/" element={<SignInPage />}></Route>
                    <Route path="/main/*" element={<MainPage />}></Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
