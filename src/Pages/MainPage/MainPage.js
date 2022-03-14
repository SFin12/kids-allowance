import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";

export default function MainPage(props) {
    const [user, setUser] = useState({});
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) =>
            setUser({
                name: user.displayName,
                email: user.email,
                image: user.photoURL,
                id: user.uid,
            })
        );
    }, []);

    return (
        <div className="container">
            <h2>{user.name}</h2>
            <p></p>
            <img src={user.image} alt="user pic" />
        </div>
    );
}
