import React from "react"
import EditAttitudeRewards from "../../components/Settings/EditAttitudeRewards"
import AllowancePage from "../AllowancePage/AllowancePage"

export default function InitialGoalsPage() {
  return (
    <>
      <div className="front-layer-tutorial p-4">
        <h1 className="text-center">Set Initial Goals</h1>
        <p>Chorzy uses an allowance meter so family members can see their progress.  This is especially helpful for kids who don't fully understand the value of points or money. It's recommended to set a goal that is approximately four times their weekly earnings as an initial goal.</p>
        <p>Once a family member has something in the shop (or outside the shop) that they want to save for, they can update their goal.</p>
      </div>

      <AllowancePage />
    </>
  )
}
