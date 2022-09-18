import React, { useEffect, useState } from "react";
import { selectUserId, setFamilyMembers } from "../../features/user/userSlice";
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import { createFamily, deleteFamily, getFamily, updateAllowance } from "../../utils/firestore"
import { useDispatch, useSelector } from "react-redux"
import { selectAllowance } from "../../features/allowance/allowanceSlice"
// import "./SettingsPage.css";

export default function SettingsPage(props) {
  const [family, setFamily] = useState("")
  const [displayFamily, setDisplayFamily] = useState([])
  const [update, setUpdate] = useState(false)
  const uid = useSelector(selectUserId)
  const dispatch = useDispatch()
  const allowance = useSelector(selectAllowance)

  useEffect(() => {
    const famData = async () => {
      const famArr = await getFamily(uid)
      if (famArr) {
        if (props.memberCount) props.memberCount(famArr.length) // for initial tutorial to trigger next tutorial

        // shows family members under input with option to delete
        setDisplayFamily(famArr)
        // set redux family members
        dispatch(setFamilyMembers({ familyMembers: famArr }))
        famArr.forEach((member) => {
          if (!allowance.hasOwnProperty(member)) {
            updateAllowance(member)
          }
        })
      }
    }

    famData()
  }, [update])

  function handleChange(e) {
    if (e.currentTarget.name === "family") {
      setFamily(e.currentTarget.value)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    //splits names into an array
    const famArr = family.split(",")
    const cleanfamArr = famArr.map((member) => member.trim())
    createFamily(cleanfamArr)
    setUpdate(!update)
    setFamily("")
  }

  function handleDelete(e) {
    e.preventDefault()
    const name = e.currentTarget.name

    deleteFamily(name)
    setUpdate(!update)
  }

  return (
    <div className="d-block w-100">
      {/* Add family members input section */}

      <Form onSubmit={handleSubmit} className="mx-3">
        <FormGroup className="d-block text-start">
          <FormLabel className="label">Add Family Member</FormLabel>
          <FormGroup className="d-flex">
            <FormControl type="text" className="family-input" onChange={handleChange} name="family" placeholder="Example: John, Jane" value={family} required />
            <Button variant="primary" type="submit">
              Save
            </Button>
          </FormGroup>
        </FormGroup>
      </Form>
      <section className="d-flex family-members">
        {displayFamily.map((name, i) => (
          <div key={i + name}>
            <button className="m-1 family-member-button" onClick={handleDelete} name={name}>
              x {name}
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}
