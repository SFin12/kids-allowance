import React, { useEffect, useState } from "react";
import "./Navbar.css";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";

export default function Navbar({ logout, lastName }) {
    return (
        <nav className="navbar">
            <div className="nav-logo">{lastName + " Family"}</div>
            <div className="nav-links">
                <a href="#" onClick={logout}>
                    Logout
                </a>
                <a href="/choirs">Choirs</a>
                <a href="/settings">Settings</a>
            </div>
        </nav>
    );
}
