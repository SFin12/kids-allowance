import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignInScreen from "./components/Sign-in";
import MainPage from "./Pages/MainPage/MainPage";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import {
    setActiveUser,
    setUserLogout,
    selectUserName,
    selectUserEmail,
    selectUserId,
    selectUserImage,
} from "./features/user/userSlice";

function App() {
    const [signedIn, setSignedIn] = useState(false);

    return (
        <div className="App">
            <div className="container">
                <Routes>
                    <Route path="/" element={<SignInScreen />}></Route>
                    <Route path="/main" element={<MainPage />}></Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
