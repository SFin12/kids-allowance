import { Accordion } from "react-bootstrap"

import EditFamily from "../../components/Settings/EditFamily"
import "./SettingsPage.css"
import EditChores from "../../components/Settings/EditChores"

export default function SettingsPage(props) {
  return (
    <div className="d-block w-100">
      <Accordion>
      <Accordion.Item eventKey="0" className="">
                    <Accordion.Header>Edit Family</Accordion.Header>
                    <Accordion.Body
                        style={{ backgroundColor: "rgb(255,255,255)" }}
                    >
        <EditFamily />
                      </Accordion.Body>
                    </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Edit Chores</Accordion.Header>
          {/* Add chores section */}
          <Accordion.Body style={{ backgroundColor: "rgb(255,255,255)" }}>
            <EditChores />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
