import React, { useEffect, useState } from "react";
import "./Navbar.css";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";

export default function Navbar({ logout }) {
    return (
        <nav className="navbar">
            <div className="nav-logo">Logo</div>
            <div className="nav-links">
                <a href="#" onClick={logout}>
                    Logout
                </a>
                <a href="#">Choirs</a>
            </div>
        </nav>
    );
}
