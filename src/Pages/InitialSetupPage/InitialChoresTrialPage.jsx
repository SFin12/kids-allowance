import React from "react"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import EditAttitudeRewards from "../../components/Settings/EditAttitudeRewards"
import AllowancePage from "../AllowancePage/AllowancePage"
import ChoresPage from "../ChoresPage/ChoresPage"

export default function InitialChoresTrialPage() {
  return (
    <>
      <ChoresPage />
      <div className="front-layer-chores-tutorial p-4">
        <h3 className="text-center">Complete Chores</h3>
        <p>Select a name at the bottom, tap anywhere on the white section of the chore. You will be prompted to select an attitude (good 😁, neutral 😐, or bad 😡) to give a bonus or deduction. Neutral doesn't change the original value. (You can reset their earnings after this!)</p>
        <p>"Daily" allows you to remove values from a chore (You already feed them!). You may still give a bonus or deduction based on attitude.</p>
        <Link to={"/main/initialGoals"}>
          <Button>Next</Button>
        </Link>
      </div>
    </>
  )
}
