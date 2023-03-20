import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { selectPointsType } from "../../features/user/userSlice"
import { selectBadAttitudeValue, selectGoodAttitudeValue, setBadAttitudeValue, setGoodAttitudeValue } from "../../features/allowance/allowanceSlice"
import { updateAttitudeValues } from "../../utils/firestore"
import { useEffect } from "react"

export default function EditAttitudeRewards({ closeAccordion }) {
  const pointsType = useSelector(selectPointsType)
  const goodAttitudeValue = useSelector(selectGoodAttitudeValue)
  const badAttitudeValue = useSelector(selectBadAttitudeValue)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {}, [goodAttitudeValue, badAttitudeValue])

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const { bonus, deduction } = Object.fromEntries(formData.entries())
    let goodAttitudeValue = Number(bonus)
    let badAttitudeValue = Number(deduction)
    Number()
    dispatch(setGoodAttitudeValue(goodAttitudeValue))
    dispatch(setBadAttitudeValue(badAttitudeValue))
    updateAttitudeValues(goodAttitudeValue, badAttitudeValue)
    if (location.pathname === "/main/initialAttitude") {
      navigate("/main/initialChores")
    }
    if (closeAccordion) closeAccordion()
    if (location.pathname === "/main/settings") {
      navigate("/main/settings")
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormGroup className="mb-3 position-relative d-block text-start" controlId="valueArea">
            <FormLabel className="label">😁 Good Attitude Bonus</FormLabel>
            {/* div to allow dollar sign in front of input */}
            <div className="d-flex align-items-center">
              <span style={{ fontSize: 30, paddingRight: 5 }}>{pointsType?.icon}</span>

              <FormControl
                type="number"
                max={10000}
                maxLength={5}
                placeholder={pointsType?.type !== "money" ? "Example: 2" : "Example: .10 or .25"}
                key={goodAttitudeValue}
                name="bonus"
                defaultValue={goodAttitudeValue ? goodAttitudeValue : ""}
                min={0}
                step={pointsType?.type !== "money" ? 1 : 0.05}
                required
              />
            </div>
          </FormGroup>
          <FormGroup className="mb-3 position-relative d-block text-start" controlId="valueArea">
            <FormLabel className="label text-start">😡 Bad Attitude Deduction</FormLabel>
            {/* div to allow dollar sign in front of input */}
            <div className="d-flex align-items-center">
              <span style={{ fontSize: 30, paddingRight: 5 }}>{pointsType?.icon}</span>

              <FormControl
                type="number"
                max={10000}
                maxLength={5}
                placeholder={pointsType?.type !== "money" ? "Example: 1" : "Example: .10 or .05"}
                name="deduction"
                key={badAttitudeValue} // used to force defaultValue to update on state change
                defaultValue={badAttitudeValue ? badAttitudeValue : ""}
                min={0}
                step={pointsType?.type !== "money" ? 1 : 0.05}
                required
              />
            </div>
          </FormGroup>
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="mb-3">
              Save
            </Button>
          </div>
        </FormGroup>
      </Form>
    </div>
  )
}
