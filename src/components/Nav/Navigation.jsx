import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navigation.css";

export default function Navigation({ logout, lastName }) {
    return (
        <Navbar
            collapseOnSelect
            fixed="top"
            expand="md"
            className="custom-navbar"
        >
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <span className="nav-logo">{lastName} Family</span>
            </Link>
            <Navbar.Collapse id="responsive-navbar-nav justify-content-end">
                <Nav className="nav-links">
                    <Nav.Link
                        as={Link}
                        to="/main/chores"
                        href="/main/chores"
                        className=""
                    >
                        chores
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/main/allowance"
                        href="/main/allowance"
                        className=""
                    >
                        Allowance
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/main/settings"
                        href="/main/settings"
                        className=""
                    >
                        Settings
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/"
                        href="/"
                        onClick={logout}
                        className=""
                    >
                        Logout
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
