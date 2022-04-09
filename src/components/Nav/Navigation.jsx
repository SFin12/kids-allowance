import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { GiBroom } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";

export default function Navigation({ logout, lastName }) {
    return (
        <Navbar fixed="top" className="custom-navbar">
            {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
            <Link to="/main" style={{ textDecoration: "none", color: "black" }}>
                <span className="nav-logo">{lastName} Family</span>
            </Link>

            <Nav className="">
                <Nav.Link
                    as={Link}
                    to="/main/chores"
                    href="/main/chores"
                    className="link d-flex align-items-center non-icon"
                >
                    <GiBroom className="mx-1 icon" />
                    <span className="non-icon">Chores</span>
                </Nav.Link>
                <Nav.Link
                    as={Link}
                    to="/main/allowance"
                    href="/main/allowance"
                    className="link d-flex align-items-center non-icon"
                >
                    <BsCurrencyDollar className="mx-1 icon" />
                    <span className="non-icon">Allowance</span>
                </Nav.Link>
                <Nav.Link
                    as={Link}
                    to="/main/settings"
                    href="/main/settings"
                    className="link d-flex align-items-center"
                >
                    <FiSettings className="mx-1 icon" />
                    <span className="non-icon">Settings</span>
                </Nav.Link>
                <Nav.Link
                    as={Link}
                    to="/"
                    href="/"
                    onClick={logout}
                    className="link d-flex align-items-center non-icon"
                >
                    <AiOutlineLogout className="mx-1 icon" />
                    <span className="non-icon">Logout</span>
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}
