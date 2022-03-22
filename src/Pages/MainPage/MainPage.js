import React, { useEffect, useState } from "react";
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

export default function MainPage(props) {
    const [userInfo, setUserInfo] = useState({});
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
                console.log(user);
                if (user) {
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
            <Navbar logout={handleLogout} />
            <h2>{userName}</h2>
            <h2>Test</h2>
            <button onClick={getData}>Get Data</button>
            <AddChoirs />

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
