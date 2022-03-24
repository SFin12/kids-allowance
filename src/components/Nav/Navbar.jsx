import React from "react";
import "./Navbar.css";

export default function Navbar({ logout, lastName }) {
    return (
        <nav className="custom-navbar">
            <div className="nav-logo">{lastName + " Family"}</div>
            <div className="nav-links">
                <a href="/" onClick={logout}>
                    Logout
                </a>
                <a href="/main/chores" className="">
                    chores
                </a>
                <a href="/main/settings" className="">
                    Settings
                </a>
            </div>
        </nav>
    );
}
