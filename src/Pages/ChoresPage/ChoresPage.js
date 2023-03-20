import { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useSelector } from "react-redux"
import ChoreCard from "../../components/Cards/ChoreCard"
import { selectChores } from "../../features/chores/choresSlice"

export default function ChoresPage() {
  const [sortedChores, setSortedChores] = useState([])
  const chores = useSelector(selectChores)

  useEffect(() => {
    // Creates sorted array of keys to look up chore info and display alphabetically
    setSortedChores(
      Object.keys(chores)
        .filter((chore) => chore !== "choresStats")
        .sort()
    )
  }, [chores])

  return (
    <>
      {sortedChores.length ? (
        <div className="w-100">
          <Container className="d-flex justify-content-center pt-3">
            <Row xs={1} md={2} lg={3} xl={3} xxl={4} className={"w-100"}>
              {/* Creates a card for each chore with value used for front and back of card */}
              {sortedChores.map((key, i) => {
                return (
                  <Col key={i + key} className="d-flex justify-content-center">
                    <ChoreCard chore={key} value={chores[key].value} dateCompleted={chores[key].dateCompleted} completedBy={chores[key].completedBy} />
                  </Col>
                )
              })}
            </Row>
          </Container>
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h4 className="w-75">You don't have any chores. Go to settings to create chores.</h4>
        </div>
      )}
    </>
  )
}
