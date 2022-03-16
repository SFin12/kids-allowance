import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import Navbar from "../../components/Nav/Navbar";
import { useNavigate } from "react-router-dom";
import { createUser, getChoirs } from "../../utils/firestore";
import AddChoirs from "../../components/Choirs/AddChoirs";

export default function MainPage(props) {
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Get user info after user is logged in.
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser({
                    name: user.displayName,
                    email: user.email,
                    image: user.photoURL,
                    id: user.uid,
                });
                // creates user in firestore db
                createUser(user.displayName, user.email, user.uid);
            }
        });
    }, []);

    function handleLogout() {
        // Reset user, sign out, redirect back to sign-in page
        setUser({});
        firebase
            .auth()
            .signOut()
            .then(() => navigate("/"));
    }

    async function getData() {
        const choirs = await getChoirs();
        setData(choirs);
    }

    return (
        <div className="container">
            <Navbar logout={handleLogout} />
            <h2>{user.name}</h2>
            <button onClick={getData}>Get Data</button>
            <AddChoirs />

            <div>
                <p>{data.name}</p>
                <p>{data.email}</p>
            </div>

            <img src={user.image} alt="user pic" />
        </div>
    );
}
