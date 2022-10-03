import React from "react"
import { useState } from "react"
import { Button, FormControl, FormGroup, FormLabel, FormSelect } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { selectBadAttitudeValue, selectGoodAttitudeValue, setBadAttitudeValue, setGoodAttitudeValue } from "../../features/allowance/allowanceSlice"
import { setChores } from "../../features/chores/choresSlice"
import { selectPointsType, setPointsType } from "../../features/user/userSlice"
import { getChores, updatePointsType } from "../../utils/firestore"
import { convertDollarsToPoints, convertPointsToDollars } from "../../utils/helper"

export default function EditPointsType({ continueTutorial, currentSelection, closeAccordion }) {
  const pointsType = useSelector(selectPointsType)
  const [pType, setPType] = useState(pointsType)
  const goodAttitudeValue = useSelector(selectGoodAttitudeValue)
  const badAttitudeValue = useSelector(selectBadAttitudeValue)
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
    if (currentSelection) currentSelection(pointsType)
  }

  function handleConversionRate(e) {
    const conversionRate = e.target.value
    setPType((prevState) => ({ ...prevState, pointToDollarConversion: conversionRate }))
  }

  function handleSave() {
    if (pType?.type) {
      console.log(pType.type, pointsType.type)
      if (pointsType.type !== pType.type) {
        let goodAttitudeConverted
        let badAttitudeConverted
        if (pointsType.type === "money" && pType.type !== "money") {
          goodAttitudeConverted = convertDollarsToPoints(goodAttitudeValue, pType.pointToDollarConversion) // use new conversion rate to get points
          badAttitudeConverted = convertDollarsToPoints(badAttitudeValue, pType.pointToDollarConversion)

          dispatch(setGoodAttitudeValue(goodAttitudeConverted))
          dispatch(setBadAttitudeValue(badAttitudeConverted))
        } else if (pointsType.type !== "money" && pType.type === "money") {
          goodAttitudeConverted = convertPointsToDollars(goodAttitudeValue, pointsType.pointToDollarConversion) // use prev conversion rate to convert to dollars
          badAttitudeConverted = convertPointsToDollars(badAttitudeValue, pointsType.pointToDollarConversion)

          dispatch(setGoodAttitudeValue(goodAttitudeConverted))
          dispatch(setBadAttitudeValue(badAttitudeConverted))
        }
      }
      dispatch(setPointsType(pType)) // redux state
      updatePointsType(pType) // db
      if (location.pathname === "/main/settings") {
        getChores().then((chores) => dispatch(setChores(chores)))
      }

      if (continueTutorial) continueTutorial()
      if (closeAccordion) closeAccordion()
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
        <FormControl aria-label="Select" as="select" type="select" onChange={handleRewardType} id="select" required value={pType?.type ? pType.type : ""}>
          <option value={"stars"}>Stars ⭐️</option>
          <option value={"tickets"}>Tickets 🎟</option>
          <option value={"money"}>Dollars and Cents 💵</option>
          <option value={pointsType?.type ? pointsType.type : ""} hidden={pointsType?.type ? true : false}>
            Select a reward type
          </option>
        </FormControl>
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

      {location.pathname === "/main/settings" && (
        <div className="text-start pt-2">
          <p>WARNING: This will change the earnings and chore values based on the conversion rate but can be changed back at anytime.</p>
        </div>
      )}
    </div>
  )
}
