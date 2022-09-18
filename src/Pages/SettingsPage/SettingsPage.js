import { Accordion, Card, Collapse } from "react-bootstrap"

import EditFamily from "../../components/Settings/EditFamily"
import "./SettingsPage.css"
import EditChores from "../../components/Settings/EditChores"
import EditPointsType from "../../components/Settings/EditPointsType"
import EditAttitudeRewards from "../../components/Settings/EditAttitudeRewards"
import { useState } from "react"

export default function SettingsPage() {
  const [showPointsType, setShowPointsType] = useState(false)
  const [showAttitudeValues, setShowAttideValues] = useState(false)

  function toggleShowEditPoints() {
    setShowPointsType(!showPointsType)
  }

  function toggleShowAttitude() {
    setShowAttideValues(!showAttitudeValues)
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
      </Accordion>
    </div>
  )
}
