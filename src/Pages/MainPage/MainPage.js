import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import Navbar from "../../components/Nav/Navbar";
import { useNavigate } from "react-router-dom";
import { getChoirs } from "../../utils/firestore";
import AddChoirs from "../../components/Choirs/AddChoirs";

export default function MainPage(props) {
    const [userInfo, setUserInfo] = useState({});
    const [data, setData] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const user = firebase.auth().currentUser;
        if (user) {
            setUserInfo(user);
            console.log(user);
        }
    });

    // useEffect(() => {
    //     // Get user info after user is logged in.
    //     if (user) {
    //         console.log(user);
    //         setUserInfo({
    //             name: user.displayName,
    //             email: user.email,
    //             image: user.photoURL,
    //             id: user.uid,
    //         });
    //         // creates user in firestore db
    //     }
    // }, []);

    function handleLogout() {
        // Reset user, sign out, redirect back to sign-in page

        firebase
            .auth()
            .signOut()
            .then(() => navigate("/"));
    }

    async function getData() {
        const choirs = await getChoirs();
        console.log(choirs);
        setData(choirs);
    }

    return (
        <div className="container">
            <Navbar logout={handleLogout} />
            <h2>{userInfo.displayName}</h2>
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

            <img src={userInfo.photoURL} alt="user pic" />
        </div>
    );
}
