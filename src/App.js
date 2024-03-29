import { useEffect } from "react"
import "./App.css"
import { Routes, Route, useNavigate } from "react-router-dom"
import "firebase/compat/auth"
import MainPage from "./Pages/MainPage/MainPage"
import SignInPage from "./Pages/SignInPage/SignInPage"

import firebase from "firebase/compat/app"

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        navigate("/main")
      }
    })

    return () => unregisterAuthObserver()
  }, [])

  return (
    <div className="App">
      <div className="m-0 p-0  container-fluid ">
        <Routes>
          <Route path="/" element={<SignInPage />}></Route>
          <Route path="/main/*" element={<MainPage />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
