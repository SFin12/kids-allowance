import React, { useState } from "react"
import { Button } from "react-bootstrap"
import MainModal from "../../components/Modal/MainModal"
import { updateTutorial } from "../../utils/firestore"
import AddGoalPage from "../AllowancePage/AddGoalPage"

export default function InitialGoalsPage() {
  const [showModal, setShowModal] = useState(true)

  function handleCloseModal() {
    setShowModal(false)
    updateTutorial(false)
  }

  return (
    <>
      <MainModal title={"Set Initial Goals"} show={showModal}>
        <p>Chorzy uses an allowance meter to show progress. You must always have a default goal. This is especially helpful for kids who don't fully understand the value of points or money but they can see the meter getting closer to their goal each chore they complete.</p>
        <p>If you don't have a goal in mind, We recommend you set a goal that's approximately four times their weekly earnings as an initial goal. Goals can be updated at anytime.</p>
        <Button onClick={handleCloseModal}>Got it!</Button>
      </MainModal>
      <AddGoalPage />
    </>
  )
}
