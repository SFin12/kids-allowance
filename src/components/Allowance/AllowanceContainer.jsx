import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import useSound from "use-sound"
import { selectAllowance } from "../../features/allowance/allowanceSlice"
import { selectPointsType } from "../../features/user/userSlice"
import { convertDecimalsToDollarsAndCents, isFloat } from "../../utils/helper"
import trumpetSound from "../../assets/goal-achieved.mp3"
import "./AllowanceContainer.css"

export default function AllowanceContainer({ allowance, activeFamilyMember, percentageOfGoal }) {
  const [barColor, setBarColor] = useState("theme-color")
  const [playSound] = useSound(trumpetSound)

  const pType = useSelector(selectPointsType)
  const isGreaterThanZero = percentageOfGoal > 3 ? true : false
  const allowanceObj = useSelector(selectAllowance)
  const familyMembersAllowance = allowanceObj[activeFamilyMember].currentTotal
  // const familyMembersAllowance = allowance[activeFamilyMember].currentTotal
  const borderRadius = percentageOfGoal > 98 ? 15 : 0
  const success = percentageOfGoal >= 100

  useEffect(() => {
    if (success) {
      playSound()
    }
  }, [success, playSound])

  function handleBarClick(e) {
    switch (barColor) {
      case "theme-color":
        setBarColor("coral-color")
        break
      case "coral-color":
        setBarColor("red-color")
        break
      case "red-color":
        setBarColor("black-color")
        break
      case "black-color":
        setBarColor("pink-color")
        break
      case "pink-color":
        setBarColor("blue-color")
        break
      case "blue-color":
        setBarColor("yellow-color")
        break
      case "yellow-color":
        setBarColor("theme-color")
        break
      default:
        break
    }
  }

  return (
    <div className="allowance-container">
      <div
        className={`allowance-bar ${barColor}`}
        onClick={handleBarClick}
        style={{
          height: `${percentageOfGoal}%`,
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
          // animation: "progress-bar 2s",
        }}
      >
        {/* Check if the total is higher than 3% of goal before displaying dollar amount */}
        {isGreaterThanZero && pType?.type === "money" ? (isFloat(familyMembersAllowance) ? convertDecimalsToDollarsAndCents(familyMembersAllowance) : `$${allowance[activeFamilyMember].currentTotal}`) : null}
        {isGreaterThanZero && pType?.type !== "money" ? `${allowance[activeFamilyMember].currentTotal}` : null}
      </div>
    </div>
  )
}
