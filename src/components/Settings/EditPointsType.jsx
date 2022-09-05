import React from "react"
import { FormLabel, FormSelect } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { selectPointsType, setPointsType } from "../../features/allowance/allowanceSlice"

export default function EditPointsType() {

  const dispatch = useDispatch()
  const pointsType = useSelector(selectPointsType)
  function handleSelect(e) {

    const selection = e.target.value
    let pointsType;
    if(selection){
      let icon;
      if(selection === "stars"){
        icon = '⭐️'
      } else if (selection === "tickets") {
        icon = '🎟'
      } else if (selection === "money") {
        icon = '﹩'
      }
      pointsType = {
        type: selection,
        icon: icon
      }
    }
    dispatch(setPointsType(pointsType))
  }

  return (
    <div>
      {/* <FormLabel htmlFor="select-device">Choose a rewards system</FormLabel> */}
      <FormSelect aria-label="Select device" onChange={handleSelect} id="select">
        <option value={""}>Select a reward </option>
        <option value={"stars"}>Stars ⭐️</option>
        <option value={"tickets"}>Tickets 🎟</option>
        <option value={"money"}>Dollars and Cents 💵</option>
      </FormSelect>
      {pointsType?.type && pointsType?.type !== "money" ? 
      <section className="pt-4">
        <p>{`You may use ${pointsType?.type} how you see fit to motivate a family member.`}</p>
        <p>{`Some examples include: screen time, prizes, candy or allowing them to eat! You will have an opportunity to create a shop later, where family members can purchase various rewards with their ${pointsType?.type}.`}</p>
        <p>{`You may or may not want to attach a monetary value to ${pointsType?.type} but in order to allow that option down the road, the default conversion rate for points to cash is 5¢ per ${pointsType?.type.slice(0,pointsType.type.length -1)}. This can be changed later in Settings.`}</p>
        <p>{`For example: 201 ${pointsType?.type} = $10.05`}</p>
    </section> : <div className="pt-4">
      <p>If you decide to change your points system later, the default conversion will be 1 point for every 5¢. This can be changed later in Settings.</p>
      <p>For example: $10.05 = 201 tickets</p>
      </div>
        }
        </div>

  )
}
