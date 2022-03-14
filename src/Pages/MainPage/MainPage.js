import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import Navbar from "../../components/Nav/Navbar";
import { useNavigate } from "react-router-dom";
import { db } from "../../utils/firebaseConfig";

export default function MainPage(props) {
    const [user, setUser] = useState({});
    const [data, setData] = useState({});

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
            }
        });
    }, []);

    function handleLogout() {
        setUser({});
        firebase
            .auth()
            .signOut()
            .then(() => navigate("/"));
    }

    function getData() {
        const database = db
            .collection("choirs")
            .get()
            .then((snapshot) => {
                setData(snapshot.docs);
                snapshot.docs.forEach((doc) => {
                    const choir = doc.data();
                    console.log(choir.title);
                });
            });
    }

    return (
        <div className="container">
            <Navbar logout={handleLogout} />
            <h2>{user.name}</h2>
            <button onClick={getData}>Get Data</button>
            <p>hello</p>
            <img src={user.image} alt="user pic" />
        </div>
    );
}
