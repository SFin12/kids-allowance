import { Accordion, Button, Card, Collapse } from "react-bootstrap"

import EditFamily from "../../components/Settings/EditFamily"
import "./SettingsPage.css"
import EditChores from "../../components/Settings/EditChores"
import EditPointsType from "../../components/Settings/EditPointsType"
import EditAttitudeRewards from "../../components/Settings/EditAttitudeRewards"
import { useState } from "react"
import AccordionBody from "react-bootstrap/esm/AccordionBody"
import { useDispatch, useSelector } from "react-redux"
import { selectTutorialOn, setTutorialOn } from "../../features/user/userSlice"
import { updateTutorial } from "../../utils/firestore"
import { useNavigate } from "react-router-dom"

export default function SettingsPage() {
  const [showPointsType, setShowPointsType] = useState(false)
  const [showAttitudeValues, setShowAttideValues] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function toggleShowEditPoints() {
    setShowPointsType(!showPointsType)
  }

  function toggleShowAttitude() {
    setShowAttideValues(!showAttitudeValues)
  }

  function handleTutorial() {
    updateTutorial(true)
    dispatch(setTutorialOn(true))
    navigate("/main/initialIntro")
  }

  return (
    <div className="d-block w-100">
      <Accordion>
        <Accordion.Item eventKey="0" className="">
          <Accordion.Header>Edit Family</Accordion.Header>
          <Accordion.Body>
            <EditFamily />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Edit Chores</Accordion.Header>
          {/* Add chores section */}
          <Accordion.Body>
            <EditChores />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header onClick={toggleShowEditPoints}>Edit Points Type</Accordion.Header>
          <Collapse in={showPointsType}>
            <Card.Body>
              <EditPointsType closeAccordian={toggleShowEditPoints} />
            </Card.Body>
          </Collapse>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header onClick={toggleShowAttitude}>Edit Attitude Values</Accordion.Header>
          <Collapse in={showAttitudeValues}>
            <Card.Body>
              <EditAttitudeRewards closeAccordian={toggleShowAttitude} />
            </Card.Body>
          </Collapse>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Tutorial</Accordion.Header>

          <Accordion.Body>
            <Button size="lg" onClick={handleTutorial}>
              Start Tutorial / Setup
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
