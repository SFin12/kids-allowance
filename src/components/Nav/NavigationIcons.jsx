import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navigation.css";

export default function NavigationIcons() {
    return (
        <nav className="custom-navbar">
            {" "}
            <Nav className="nav-links">
                <Nav.Link
                    as={Link}
                    to="/main/chores"
                    href="/main/chores"
                    className="link"
                >
                    <span>Chores</span>
                </Nav.Link>
                <Nav.Link
                    as={Link}
                    to="/main/allowance"
                    href="/main/allowance"
                    className="link"
                >
                    <span>Allowance</span>
                </Nav.Link>
                <Nav.Link
                    as={Link}
                    to="/main/settings"
                    href="/main/settings"
                    className="link"
                >
                    <span>Settings</span>
                </Nav.Link>
                <Nav.Link
                    as={Link}
                    to="/"
                    href="/"
                    onClick={logout}
                    className="link"
                >
                    <span>Logout</span>
                </Nav.Link>
            </Nav>
        </nav>
    );
}
