import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import firebase from "firebase/compat/app";
import Navigation from "../../components/Nav/Navigation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    setUserLogout,
    setActiveUser,
    setFamilyMembers,
} from "../../features/user/userSlice";
import SettingsPage from "../SettingsPage/SettingsPage";
import ChoresPage from "../ChoresPage/ChoresPage";
import "./MainPage.css";
import { getUserInfo } from "../../utils/firestore";
import { setChores } from "../../features/chores/choresSlice";
import AllowancePage from "../AllowancePage/AllowancePage";
import Footer from "../../components/Footer/Footer";

export default function MainPage(props) {
    const [lastName, setLastName] = useState("");

    const [isSignedIn, setIsSignedIn] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // firebase listener that changes when user signs in or out
        const unregisterAuthObserver = firebase
            .auth()
            .onAuthStateChanged(async (user) => {
                if (user) {
                    setIsSignedIn(true);
                    // Gets the users last name from display name
                    const splitNames = user.displayName.split(" ");
                    setLastName(splitNames[splitNames.length - 1]);
                    // updates redux state with uder info

                    dispatch(
                        setActiveUser({
                            name: user.displayName,
                            email: user.email,
                            image: user.photoURL,
                            id: user.uid,
                        })
                    );
                    // returns family members for current user from firestore db and updates Redux.
                    const family = async () => {
                        const dbData = await getUserInfo(user.uid);

                        dispatch(
                            setFamilyMembers({
                                familyMembers: dbData.family,
                            })
                        );
                        dispatch(setChores(dbData.chores));
                    };
                    family();
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
                <Navigation logout={handleLogout} lastName={lastName} />
            ) : null}
            <div className="spacer"></div>
            <Routes>
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/chores" element={<ChoresPage />} />
                <Route path="/allowance" element={<AllowancePage />} />
            </Routes>
            <Footer />
        </div>
    );
}
