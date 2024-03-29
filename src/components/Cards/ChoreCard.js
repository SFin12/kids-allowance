/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateChore } from "../../features/chores/choresSlice"
import { getAllowances, updateAllowance, updateChore as updateDbChore } from "../../utils/firestore"
import { selectActiveFamilyMember, selectPointsType } from "../../features/user/userSlice"
import { convertDecimalsToDollarsAndCents } from "../../utils/helper"
import { selectBadAttitudeValue, selectGoodAttitudeValue, setAllowance } from "../../features/allowance/allowanceSlice"
import MainModal from "../Modal/MainModal"
import "./Card.css"

export default function ChoreCard({ chore, value, dateCompleted, completedBy }) {
  const [flip, setFlip] = useState(false)
  const [dailyChore, setDailyChore] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currentValue, setCurrentValue] = useState(value)

  const goodAttitudeValue = useSelector(selectGoodAttitudeValue)
  const badAttitudeValue = useSelector(selectBadAttitudeValue)
  const dispatch = useDispatch()
  const numVal = Number(value)
  const date = new Date().toDateString().slice(0, -5)
  const activeFamilyMember = useSelector(selectActiveFamilyMember)
  const pType = useSelector(selectPointsType)

  useEffect(() => {
    // if db shows completed (parent fetches from db), flip to completed side
    if (completedBy) {
      setFlip(true)
    }
  }, [])

  function handleClick() {
    if (!flip) {
      // update Redux to show completed w/out waiting for db
      dispatch(
        updateChore({
          chore,
          value,
          completedBy: activeFamilyMember,
          dateCompleted: date,
        })
      )
      // updated firestore to show completed
      updateDbChore(chore, value, activeFamilyMember, date)
    } else {
      // update redux store to show not completed w/out waiting for db
      dispatch(
        updateChore({
          chore,
          value,
          completedBy: "",
          dateCompleted: "",
        })
      )
      // updated firestore to show not completed
      updateDbChore(chore, value, "", "")
    }

    setFlip(!flip)
    if (!flip) {
      setTimeout(() => {
        setShowModal(true)
      }, 500)
    }
  }

  function handleAttitude(e) {
    let attitude = e.target.id
    if (attitude === "good-emoji") {
      updateAllowance(activeFamilyMember, currentValue + goodAttitudeValue)
        .then(() => getAllowances()) // get new allowances and update redux store with new values
        .then((earnings) => dispatch(setAllowance(earnings)))
    } else if (attitude === "bad-emoji") {
      updateAllowance(activeFamilyMember, currentValue - badAttitudeValue)
        .then(() => getAllowances()) // get new allowances and update redux store with new values
        .then((earnings) => dispatch(setAllowance(earnings)))
    } else {
      updateAllowance(activeFamilyMember, currentValue)
        .then(() => getAllowances()) // get new allowances and update redux store with new values
        .then((earnings) => dispatch(setAllowance(earnings)))
    }

    setShowModal(false)
  }

  function handleClose() {
    setShowModal(false)
  }

  function handleDailyChore(e) {
    e.stopPropagation()
    if (!dailyChore) {
      setCurrentValue(0)
    } else {
      setCurrentValue(value)
    }
    setDailyChore(!dailyChore)
  }

  return (
    <>
      {/* flip card on click */}
      <div className="chore-card" onClick={handleClick} id={chore}>
        <div className={flip ? "main-card flip-card" : "main-card"}>
          <div className="card-front">
            <div className="chore-name-value-container">
              <div className="chore-name">{`${chore}`}</div>
              {currentValue ? (
                pType?.type === "money" ? (
                  <div className="chore-value">
                    {/* Check if numVal is a whole number or decimal */}
                    {numVal % 1 === 0 ? `$${value}` : `${convertDecimalsToDollarsAndCents(numVal)}`}
                  </div>
                ) : (
                  <div>
                    <div className="chore-value">{value + " " + pType.icon}</div>
                    <div>{}</div>
                  </div>
                )
              ) : null}
            </div>
            <div className={dailyChore ? "daily-chore-active" : "daily-chore"} onClick={handleDailyChore}>
              Daily
            </div>
          </div>

          <div className="card-back">
            <div className="completed">{chore}</div>
            <div className="completed-info">
              <div>{`${completedBy ? completedBy : ""} `}</div>
              <div>{`${dateCompleted ? dateCompleted : ""}`}</div>
            </div>
          </div>
        </div>
      </div>
      <MainModal title={`${activeFamilyMember}'s Attitude`} show={showModal} onHide={handleClose}>
        <div onClick={handleAttitude} className="attitude-emoji-container">
          <span className="attitude-emoji" name="good" id="good-emoji">
            😁
          </span>
          <span className="attitude-emoji" name="neutral" id="neutral-emoji">
            😐
          </span>
          <span className="attitude-emoji" name="bad" id="bad-emoji">
            😡
          </span>
        </div>
      </MainModal>
    </>
  )
}
