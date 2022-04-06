import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { GiBroom } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";

export default function Navigation({ logout, lastName }) {
    return (
        <Navbar
            collapseOnSelect
            fixed="top"
            expand="lg"
            className="custom-navbar"
        >
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <span className="nav-logo">{lastName} Family</span>
            </Link>
            <Navbar.Collapse id="responsive-navbar-nav justify-content-end mr-3">
                <Nav className="nav-links">
                    <Nav.Link
                        as={Link}
                        to="/main/chores"
                        href="/main/chores"
                        className="link"
                    >
                        Chores
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/main/allowance"
                        href="/main/allowance"
                        className="link"
                    >
                        Allowance
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/main/settings"
                        href="/main/settings"
                        className="link"
                    >
                        Settings
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
            </Navbar.Collapse>
        </Navbar>
    );
}
