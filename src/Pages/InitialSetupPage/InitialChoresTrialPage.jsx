import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import ChoresPage from "../ChoresPage/ChoresPage"

export default function InitialChoresTrialPage() {
  return (
    <>
      <ChoresPage />
      <div className="front-layer-chores-tutorial p-4">
        <h3 className="text-center">Complete Chores</h3>
        <ol className="text-start">
          <li>Choose a family member below</li>
          <li>Tap or toggle Daily</li>
          <details>Turns awards on or off for a chore</details>
          <li>Tap white section of the chore</li>
          <details>The chosen member will be awarded allownce for completing the chore</details>
          <li>Choose an attitude 😁, 😐, 😡</li>
          <details>A bonus or deduction will be given based on attitude. Neutral doesn't affect value</details>
          <li>To reset a chore, tap it again</li>
        </ol>

        <Link to={"/main/initialGoals"}>
          <Button>Next</Button>
        </Link>
      </div>
    </>
  )
}
