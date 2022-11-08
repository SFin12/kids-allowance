import React from "react"
import EditAttitudeRewards from "../../components/Settings/EditAttitudeRewards"


export default function InitialAttitudePage() {
  
  return (
    <>
      <div className="initial-container p-4">
        <h1 className="text-center">Attitude Adjustment</h1>
        <p>When chores are completed by family members, a pop-up will allow you to mark their attitude. You can choose a happy, neutral, or angry emoji. You can set bonus values or deductions based on their attitude. You can also reward attitude bonuses seperate from chores.</p>
        <br />
        <EditAttitudeRewards />
      </div>
    </>
  )
}
