/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { Form, FormGroup, FormControl, FormLabel, Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { selectPointsType } from "../../features/user/userSlice"
import { setChores } from "../../features/chores/choresSlice"
import { createChore, deleteChore, getChores } from "../../utils/firestore"

export default function EditChores() {
  const [displayChores, setDisplayChores] = useState([])
  const [update, setUpdate] = useState(false)
  const pointsType = useSelector(selectPointsType)
  const dispatch = useDispatch()

  useEffect(() => {
    getChores()
      .then((chores) => {
        setDisplayChores(Object.keys(chores))
        console.log("updating chores display")
        dispatch(setChores(chores))
      })
      .catch((err) => console.error(err))
  }, [update])

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const { text: title, value } = Object.fromEntries(formData.entries())

    createChore(title, value).then((results) => {
      setUpdate(!update)
      setDisplayChores((prevState) => [...prevState, title])
    })

    e.currentTarget.reset()
  }

  function handleDelete(e) {
    e.preventDefault()
    const name = e.currentTarget.name

    if (name) {
      deleteChore(name).then(() => setUpdate(!update))
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormGroup className="mb-3 position-relative" controlId="titleInput">
            <FormLabel>Title (you can add emojis 😁)</FormLabel>
            {/* div to match dollar sign spacing below*/}
            <div className="d-flex">
              {/* <span style={{ paddingRight: 15.5 }}></span> */}
              <FormControl type="text" placeholder="Example: Wash Dishes 🍽" name="text" maxLength={18} defaultValue="" required />
            </div>
          </FormGroup>
          <FormGroup className="mb-3 position-relative" controlId="valueArea">
            <FormLabel>Value</FormLabel>
            {/* div to allow dollar sign in front of input */}
            <div className="d-flex align-items-center">
              <span style={{ fontSize: 30, paddingRight: 5 }}>{pointsType?.icon}</span>

              <FormControl type="number" max={10000} maxLength={5} placeholder={pointsType?.type !== "money" ? "Example: 10" : "Example: 1 or .25"} name="value" defaultValue="" min={0} step={pointsType?.type !== "money" ? 1 : 0.25} required />
            </div>
          </FormGroup>
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="mb-3">
              Save
            </Button>
          </div>
        </FormGroup>
      </Form>
      <section className="d-flex family-members">
        {displayChores.map((name, i) => (
          <div key={i + name}>
            <button className="m-1 family-member-button" onClick={handleDelete} name={name}>
              x {name}
            </button>
          </div>
        ))}
      </section>
    </>
  )
}
