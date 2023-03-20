import { Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import EditChores from "../../components/Settings/EditChores"
import { selectChores } from "../../features/chores/choresSlice"

export default function InitialChoresPage() {
  const chores = useSelector(selectChores)
  return (
    <>
      <div className="initial-container p-4">
        <h1 className="text-center">Add a Chore</h1>

        <br />
        <EditChores />

        <br />
        {chores && Object.keys(chores).length !== 0 && (
          <>
            <Link to={"/main/initialChoresTrial"} className="center-bottom">
              <Button>Next</Button>
            </Link>
          </>
        )}
      </div>
    </>
  )
}
