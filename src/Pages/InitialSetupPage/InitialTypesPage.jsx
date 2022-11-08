import React, { useState } from "react"
import { useEffect } from "react"
import { Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import EditPointsType from "../../components/Settings/EditPointsType"
import { selectPointsType } from "../../features/user/userSlice"

export default function InitialTypesPage() {
  const pointsType = useSelector(selectPointsType)
  const [pType, setPtype] = useState(pointsType)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {})

  function continueTutorial() {
    navigate("/main/initialAttitude")
  }

  function handleSelection(selection) {
    setPtype(selection)
  }

  return (
    <>
      <div className="initial-container p-4">
        <h1 className="text-center">Choose a Reward System</h1>
        <br />
        <EditPointsType continueTutorial={continueTutorial} currentSelection={handleSelection} />

        <br />
        {location.pathname !== "/main/settings" && pType?.type && pType?.type !== "money" ? (
          <section className="pt-4">
            <p>{`You may use ${pType?.type} how you see fit to motivate a family member.`}</p>
            <p>{`You may or may not want to attach a monetary value to ${pType?.type} but in order to allow for that option down the road you must choose a default conversion rate. This can be changed later in Settings.`}</p>
          </section>
        ) : (
          location.pathname !== "/main/settings" && ( // Only display this when in tutorial
            <div className="pt-4">
              <p>You can change the reward system later in settings.</p>
            </div>
          )
        )}
      </div>
    </>
  )
}
