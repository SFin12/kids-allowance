import React from "react"
import { useState } from "react"
import { Button, FormGroup, FormLabel, FormSelect } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { setChores } from "../../features/chores/choresSlice"
import { selectPointsType, setPointsType } from "../../features/user/userSlice"
import { getChores, updatePointsType } from "../../utils/firestore"

export default function EditPointsType({ continueTutorial, closeAccordian }) {
  const pointsType = useSelector(selectPointsType)
  const [pType, setPType] = useState(pointsType)
  const dispatch = useDispatch()
  const location = useLocation()

  function handleRewardType(e) {
    const selection = e.target.value
    let pointsType
    if (selection) {
      let icon
      let pointToDollarConversion = 0.05
      if (selection === "stars") {
        icon = "⭐️"
      } else if (selection === "tickets") {
        icon = "🎟"
      } else if (selection === "money") {
        icon = "$"
        pointToDollarConversion = 1
      }
      pointsType = {
        type: selection,
        icon,
        pointToDollarConversion,
      }
    }
    setPType(pointsType) // local state
  }

  function handleConversionRate(e) {
    const conversionRate = e.target.value
    setPType((prevState) => ({ ...prevState, pointToDollarConversion: conversionRate }))
  }

  function handleSave() {
    if (pType?.type) {
      dispatch(setPointsType(pType)) // redux state
      updatePointsType(pType) // db
      if (location.pathname === "/main/settings") {
        getChores().then((chores) => dispatch(setChores(chores)))
      }
      continueTutorial() || closeAccordian()
    } else {
      alert("Choose a rewards type before saving.")
    }
  }

  return (
    <div>
      {/* <FormLabel htmlFor="select-device">Choose a rewards system</FormLabel> */}

      <FormGroup className="mb-3 d-block text-start">
        <FormLabel htmlFor="select" className="label">
          Reward Type
        </FormLabel>
        <FormSelect aria-label="Select" onChange={handleRewardType} id="select" required>
          <option value={pointsType?.type ? pointsType.type : ""}>Select a reward type</option>
          <option value={"stars"} selected={pointsType?.type === "stars"}>
            Stars ⭐️
          </option>
          <option value={"tickets"} selected={pointsType?.type === "tickets"}>
            Tickets 🎟
          </option>
          <option value={"money"} selected={pointsType?.type === "money"}>
            Dollars and Cents 💵
          </option>
        </FormSelect>
      </FormGroup>
      {pType && pType?.type !== "money" && (
        <FormGroup className="mb-3 d-block text-start">
          <FormLabel htmlFor="select" className="label">
            Conversion Rate
          </FormLabel>
          <FormSelect aria-label="Conversion Rate" onChange={handleConversionRate}>
            <option value={0.05}>1 {pType.icon} = 5¢ (default)</option>
            <option value={0.1}>1 {pType.icon} = 10¢</option>
            <option value={0.2}>1 {pType.icon} = 20¢</option>
            <option value={0.25}>1 {pType.icon} = 25¢</option>
          </FormSelect>
        </FormGroup>
      )}
      <div className="d-flex justify-content-center">
        <Button onClick={handleSave}>Save</Button>
      </div>

      {location.pathname !== "/main/settings" && pType?.type && pType?.type !== "money" ? (
        <section className="pt-4">
          <p>{`You may use ${pType?.type} how you see fit to motivate a family member.`}</p>
          <p>{`Some examples include: screen time, prizes, candy or allowing them to eat! You will have an opportunity to create a shop later, where family members can purchase various rewards with their ${pType?.type}.`}</p>
          <p>{`You may or may not want to attach a monetary value to ${pType?.type} but in order to allow for that option down the road you must choose a default conversion rate. This can be changed later in Settings.`}</p>
        </section>
      ) : (
        location.pathname !== "/main/settings" && ( // Only display this when in tutorial
          <div className="pt-4">
            <p>You can change the reward system later in settings.</p>
          </div>
        )
      )}
      {location.pathname === "/main/settings" && (
        <div className="text-start pt-2">
          <p>WARNING: This will change the earnings and chore values based on the conversion rate but can be changed back at anytime.</p>
        </div>
      )}
    </div>
  )
}
