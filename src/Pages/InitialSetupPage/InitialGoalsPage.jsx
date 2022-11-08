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
        <p>Chorzy uses an allowance meter to show progress so you must always have a default goal. This helps kids visualize their progress.</p>
        <p>If you don't have a goal in mind, we recommend you set a goal that's about four times their weekly earnings. Goals can be updated at anytime.</p>
        <Button onClick={handleCloseModal}>Got it!</Button>
      </MainModal>
      <AddGoalPage />
    </>
  )
}
