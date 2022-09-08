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
        <h1 className="text-center">Complete Chores</h1>
        <p>
          Select a name at the bottom, tap anywhere on the white section of the chore. You will be prompted to select an attitude. Select good 😁, neutral 😐, or bad 😡. Depending on what you choose, they will receive the bonus or deduction that you set. Neutral doesn't change the original value.
        </p>
        <p>If you click "Daily" on the right. You will notice that the rewarded value is removed. This can be used for daily chores that are expected without added rewards ("You already feed them!"). You may still give a bonus or deduction based on attitude.</p>
        <Link to={"/main/initialGoals"}>
          <Button>Next</Button>
        </Link>
      </div>
    </>
  )
}
