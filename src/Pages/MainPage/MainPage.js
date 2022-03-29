import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import firebase from "firebase/compat/app";
import Navigation from "../../components/Nav/Navigation";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    setUserLogout,
    selectUserEmail,
    selectUserId,
    selectUserImage,
    selectUserName,
    setActiveUser,
} from "../../features/user/userSlice";
import SettingsPage from "../SettingsPage/SettingsPage";
import ChoresPage from "../ChoresPage/ChoresPage";

export default function MainPage(props) {
    const [lastName, setLastName] = useState("");

    const [isSignedIn, setIsSignedIn] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const unregisterAuthObserver = firebase
            .auth()
            .onAuthStateChanged(async (user) => {
                if (user) {
                    setIsSignedIn(true);
                    const splitNames = user.displayName.split(" ");
                    setLastName(splitNames[splitNames.length - 1]);
                    dispatch(
                        setActiveUser({
                            name: user.displayName,
                            email: user.email,
                            image: user.photoURL,
                            id: user.uid,
                        })
                    );
                } else {
                    setIsSignedIn(false);
                }
            });
        return () => unregisterAuthObserver();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleLogout() {
        // Reset user, sign out, redirect back to sign-in page
        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch(setUserLogout());
                navigate("/");
            })
            .catch((err) => alert(err.message));
    }

    return (
        <div className="">
            {isSignedIn ? (
                <Navigation
                    logout={handleLogout}
                    lastName={lastName}
                    // uid={uid}
                />
            ) : null}

            <Routes>
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/chores" element={<ChoresPage />} />
            </Routes>
        </div>
    );
}
