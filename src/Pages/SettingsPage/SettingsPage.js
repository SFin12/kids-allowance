import { Accordion, Button, Card, Collapse } from "react-bootstrap"

import EditFamily from "../../components/Settings/EditFamily"
import EditChores from "../../components/Settings/EditChores"
import EditPointsType from "../../components/Settings/EditPointsType"
import EditAttitudeRewards from "../../components/Settings/EditAttitudeRewards"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setTutorialOn } from "../../features/user/userSlice"
import { updateTutorial } from "../../utils/firestore"
import { useNavigate } from "react-router-dom"
import "./SettingsPage.css"

export default function SettingsPage() {
  const [showPointsType, setShowPointsType] = useState(false)
  const [showAttitudeValues, setShowAttideValues] = useState(false)
  const [showTutorialOptions, setShowTutorialOptions] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function toggleShowEditPoints() {
    setShowPointsType(!showPointsType)
  }

  function toggleShowAttitude() {
    setShowAttideValues(!showAttitudeValues)
  }

  function toggleShowwTutorialOptions() {
    setShowTutorialOptions(!showTutorialOptions)
  }

  function handleTutorialOn() {
    updateTutorial(true)
    dispatch(setTutorialOn(true))
    navigate("/main/initialIntro")
  }
  function handleTutorialOff() {
    updateTutorial(false)
    dispatch(setTutorialOn(false))
    setShowTutorialOptions(false)
  }

  return (
    <div className="d-block w-100">
      <Accordion>
        <Accordion.Item eventKey="0" className="settings-item">
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
              <EditPointsType closeAccordion={toggleShowEditPoints} />
            </Card.Body>
          </Collapse>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header onClick={toggleShowAttitude}>Edit Attitude Values</Accordion.Header>
          <Collapse in={showAttitudeValues}>
            <Card.Body>
              <EditAttitudeRewards closeAccordion={toggleShowAttitude} />
            </Card.Body>
          </Collapse>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header onClick={toggleShowwTutorialOptions}>Tutorial</Accordion.Header>
          <Collapse in={showTutorialOptions}>
            <Card.Body>
              <div className="d-grid gap-1">
                <Button size="lg" onClick={handleTutorialOn} className="reset-button">
                  Start Tutorial / Setup
                </Button>

                <Button size="lg" onClick={handleTutorialOff} className="" variant="secondary">
                  Turn Off Tutorial
                </Button>
              </div>
            </Card.Body>
          </Collapse>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
