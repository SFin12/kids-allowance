import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectActiveFamilyMember, selectUserId } from "../../features/user/userSlice"
import { createAllowance } from "../../utils/firestore"

export default function ResetAllowancePage() {
  const activeFamilyMember = useSelector(selectActiveFamilyMember)
  const [currentFamilyMember] = useState(activeFamilyMember)
  const userId = useSelector(selectUserId)
  const navigate = useNavigate()

  useEffect(() => {
    if (activeFamilyMember === null) {
      navigate("/main")
    }
    // if active member is switched, go back to main allowance page
    if (currentFamilyMember !== activeFamilyMember) {
      navigate("/main/allowance")
    }
  }, [activeFamilyMember])

  function handleReset() {
    createAllowance(activeFamilyMember, 0, userId).then(() => {
      navigate("/main/allowance")
    })
  }

  return (
    <div className="d-flex justify-content-center w-100 flex-column align-items-center" style={{ height: "70vh" }}>
      <h4 className="title">{activeFamilyMember ? `Are you sure you want to reset ${activeFamilyMember}'s earnings? This will also reset their lifetime total!` : null}</h4>

      <div className="w-75 d-flex flex-column justify-content-around">
        <Button className="main-button" onClick={handleReset}>
          Yes
        </Button>
        <Button variant="secondary" className="" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
