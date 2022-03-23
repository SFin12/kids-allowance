import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import firebase from "firebase/compat/app";
import Navbar from "../../components/Nav/Navbar";
import { useNavigate } from "react-router-dom";
import { getChoirs } from "../../utils/firestore";
import AddChoirs from "../../components/Choirs/AddChoirs";
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
import ChoirsPage from "../ChoirsPage/ChoirsPage";

export default function MainPage(props) {
    const [lastName, setLastName] = useState("");
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userName = useSelector(selectUserName);
    const userEmail = useSelector(selectUserEmail);
    const userImage = useSelector(selectUserImage);
    const userId = useSelector(selectUserId);

    useEffect(() => {
        const unregisterAuthObserver = firebase
            .auth()
            .onAuthStateChanged((user) => {
                if (user) {
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
                }
            });
        return () => unregisterAuthObserver();
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

    async function getData() {
        const choirs = await getChoirs();
        console.log(choirs);
        setData(choirs);
    }

    return (
        <div className="container">
            <Navbar logout={handleLogout} lastName={lastName} />
            <h2>{userName}</h2>
            <Routes>
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/choirs" element={<ChoirsPage />} />
            </Routes>
            <div>
                {Object.keys(data).map((choir, i) => (
                    <div key={i + "choir"}>
                        <h4>{choir}</h4>
                        <p>{data[choir]}</p>
                    </div>
                ))}
            </div>

            <img src={userImage} alt="user pic" />
        </div>
    );
}
