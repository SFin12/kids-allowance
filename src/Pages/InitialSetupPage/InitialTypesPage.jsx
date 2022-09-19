import React, { useState } from "react"
import { useEffect } from "react"
import { Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import EditPointsType from "../../components/Settings/EditPointsType"
import { selectPointsType } from "../../features/user/userSlice"

export default function InitialTypesPage() {
  const navigate = useNavigate()
  const pointsType = useSelector(selectPointsType)

  function continueTutorial() {
    navigate("/main/initialAttitude")
  }

  return (
    <>
      <div className="initial-container p-4">
        <h1 className="text-center">Choose a reward system</h1>
        <br />
        <EditPointsType continueTutorial={continueTutorial} />

        <br />
      </div>
    </>
  )
}
