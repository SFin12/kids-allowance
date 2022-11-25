import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import useSound from "use-sound"
import { selectAllowance, setAllowance } from "../../features/allowance/allowanceSlice"
import { selectPointsType } from "../../features/user/userSlice"
import { convertDecimalsToDollarsAndCents, isFloat } from "../../utils/helper"
import trumpetSound from "../../assets/goal-achieved.mp3"
import "./AllowanceContainer.css"
import { getAllowances, updateAllowanceBarColor } from "../../utils/firestore"
import { useDispatch } from "react-redux"

export default function AllowanceContainer({ allowance, activeFamilyMember, percentageOfGoal }) {
  const [barColor, setBarColor] = useState(allowance[activeFamilyMember].color || "theme-color")
  const [playSound] = useSound(trumpetSound)
  const dispatch = useDispatch()
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

  useEffect(() => {
    if (allowance[activeFamilyMember].color) {
      setBarColor(allowance[activeFamilyMember].color)
    }
  }, [activeFamilyMember])

  useEffect(() => {
    updateAllowanceBarColor(activeFamilyMember, barColor).then(() => {
      getAllowances().then((earnings) => dispatch(setAllowance(earnings)))
    })
  }, [barColor])

  function handleBarClick(e) {
    switch (barColor) {
      case "theme-color":
        setBarColor("coral-color")
        break
      case "coral-color":
        setBarColor("red-color")
        break
      case "red-color":
        setBarColor("red-gradient-color")
        break
      case "red-gradient-color":
        setBarColor("black-color")
        break
      case "black-color":
        setBarColor("pink-color")
        break
      case "pink-color":
        setBarColor("blue-color")
        break
      case "blue-color":
        setBarColor("blue-gradient-color")
        break
      case "blue-gradient-color":
        setBarColor("yellow-color")
        break
      case "yellow-color":
        setBarColor("teal-gradient-color")
        break
      case "teal-gradient-color":
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
