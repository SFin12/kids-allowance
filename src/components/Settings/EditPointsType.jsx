import React from "react"
import { FormLabel, FormSelect } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { selectPointsType, setPointsType } from "../../features/allowance/allowanceSlice"

export default function EditPointsType() {

  const dispatch = useDispatch()

  function handleSelect(e) {
    const pointsType = e.target.value
    dispatch(setPointsType(pointsType))
  }

  return (
    <div>
      {/* <FormLabel htmlFor="select-device">Choose a rewards system</FormLabel> */}
      <FormSelect aria-label="Select device" onChange={handleSelect} id="select">
        <option value={""}>Select a reward </option>
        <option value={"stars"}>Stars ⭐️</option>
        <option value={"tickets"}>Tickets 🎟</option>
        <option value={"money"}>Money 💵</option>
      </FormSelect>
    </div>
  )
}
