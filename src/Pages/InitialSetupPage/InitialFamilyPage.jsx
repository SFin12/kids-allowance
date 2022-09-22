import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import arrowDown from "../../assets/arrowDown.svg"
import EditFamily from "../../components/Settings/EditFamily"
import "./InitialStylePage.css"

export default function InititialFamilyPage() {
  const [showTip, setShowTip] = useState(false)

  function memberCount(count) {
    if (count) {
      setShowTip(true)
    } else {
      setShowTip(false)
    }
  }

  return (
    <>
      <div className="initial-container p-4">
        <h1 className="text-center">Who's participating?</h1>
        <p>Enter your family or anyone that will be participating. Seperate each name with a comma.</p>
        <br />
        <EditFamily memberCount={memberCount} />

        <br />
        {showTip && (
          <>
            <p>You can always remove a family member by clicking the "x" on their name (Just in case they start talking back!)</p>

            <p>You'll notice the names are now added below. This is how you'll switch between family members for chores or other information. Try selecting someone.</p>
            <div className="arrow-down-container">
              <img src={arrowDown} alt="Arrow down" />
            </div>
            <Link to={"/main/initialTypes"} className="center-bottom">
              <Button>Next</Button>
            </Link>
          </>
        )}
      </div>
    </>
  )
}
