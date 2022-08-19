import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import { createFamily, createUser, getUserInfo, updateLogins } from "../../utils/firestore";
import { setChores } from "../../features/chores/choresSlice";
import AllowancePage from "../AllowancePage/AllowancePage";
import Footer from "../../components/Footer/Footer";
import AddGoalPage from "../AllowancePage/AddGoalPage";
import TitlePage from "../TitlePage/TitlePage";
import EditAllowancePage from "../AllowancePage/EditAllowancePage";
import SpendPage from "../AllowancePage/SpendPage";
import AdjustTotalPage from "../AllowancePage/AdjustTotalPage";
import ResetAllowancePage from "../AllowancePage/ResetAllowancePage";
import SetBonusPage from "../AllowancePage/SetBonusPage";

export default function MainPage(props) {
    const [lastName, setLastName] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    // setup initial redux state from firebase
    useEffect(() => {
        // firebase listener that changes when user signs in or out
        const unregisterAuthObserver = firebase
            .auth()
            .onAuthStateChanged(async (user) => {
                if (user) {
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
                    // sets family members, chores, and logins for current user from firestore db and updates Redux.
                    const setInitialRedux = async () => {
                        
                        const dbData = await getUserInfo(user.uid);
                        if (dbData) {
                            // set redux family info from db
                            dispatch(
                                setFamilyMembers({
                                    familyMembers: dbData.family,
                                })
                            );
                            // set redux chores from db
                            dispatch(setChores(dbData.chores));
                            updateLogins();
                        } else {
                            // If getUserInfo is undefined, add new user to database.
                            createUser(user);
                            updateLogins();
                            createFamily([]);

                        }
                    };
                    setInitialRedux();
                    
                } else {
                    alert("You are not logged in.");
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
        <div className="main">
            <Navigation logout={handleLogout} lastName={lastName} />

            <div className="d-flex justify-content-center w-100 h-100">
                <Routes>
                    <Route path="/" element={<TitlePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/chores" element={<ChoresPage />} />
                    <Route path="/allowance" element={<AllowancePage />} />
                    <Route
                        path="/editAllowance"
                        element={<EditAllowancePage />}
                    />
                    <Route path="/spend" element={<SpendPage />} />
                    <Route path="/addGoal" element={<AddGoalPage />} />
                    <Route path="/setBonus" element={<SetBonusPage />} />
                    <Route
                        path="/adjustAllowance"
                        element={<AdjustTotalPage />}
                    />

                    <Route
                        path="/resetAllowance"
                        element={<ResetAllowancePage />}
                    />
                </Routes>

                {location.pathname !== "/main/settings" ? <Footer /> : null}
            </div>
        </div>
    );
}
