import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"
import "./Navigation.css"
import { GiBroom } from "react-icons/gi"
import { FiSettings } from "react-icons/fi"
import { BsCurrencyDollar } from "react-icons/bs"
import { AiOutlineLogout } from "react-icons/ai"
import { HiOutlineTicket } from "react-icons/hi"
import { FaRegStar } from "react-icons/fa"
import { BsShop } from "react-icons/bs"
import { useSelector } from "react-redux"
import { selectLogins, selectPointsType } from "../../features/user/userSlice"

export default function Navigation({ logout, lastName }) {
  const pointsType = useSelector(selectPointsType)
  const location = useLocation()
  const logins = useSelector(selectLogins)
  const inTutorial = location.pathname.includes("initial")

  return (
    <Navbar fixed="top" className="custom-navbar">
      {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
      <Link to="/main" style={{ textDecoration: "none", color: "black" }}>
        <span className="nav-logo">{lastName} Family</span>
      </Link>

      <Nav className="">
        <Nav.Link as={Link} to="/main/chores" disabled={inTutorial && logins < 10} href="/main/chores" className="link d-flex align-items-center non-icon">
          <GiBroom className="mx-1 icon" />
          <span className="non-icon">Chores</span>
        </Nav.Link>

        <Nav.Link as={Link} to="/main/allowance" disabled={inTutorial && logins < 10} href="/main/allowance" className="link d-flex align-items-center non-icon">
          {pointsType?.type && pointsType?.type !== "money" ? (
            <>
              {pointsType.type === "tickets" ? <HiOutlineTicket className="mx-1 icon" /> : <FaRegStar className="mx-1 icon" />}
              <span className="non-icon">{`${pointsType.type}`}</span>
            </>
          ) : (
            <>
              {" "}
              <BsCurrencyDollar className="mx-1 icon" />
              <span className="non-icon">Allowance</span>
            </>
          )}
        </Nav.Link>
        <Nav.Link as={Link} to="/main/shop" disabled={inTutorial && logins < 10} href="/main/shop" className="link d-flex align-items-center">
          <BsShop className="mx-1 icon" />
          <span className="non-icon">Shop</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/main/settings" disabled={inTutorial && logins < 10} href="/main/settings" className="link d-flex align-items-center">
          <FiSettings className="mx-1 icon" />
          <span className="non-icon">Settings</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/" href="/" onClick={logout} className="link d-flex align-items-center non-icon">
          <AiOutlineLogout className="mx-1 icon" />
          <span className="non-icon">Logout</span>
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}
