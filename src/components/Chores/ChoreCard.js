/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateChore } from "../../features/chores/choresSlice"
import { getAllowances, updateAllowance, updateChore as updateDbChore } from "../../utils/firestore"
import { selectActiveFamilyMember } from "../../features/user/userSlice"
import "./ChoreCard.css"
import { convertDecimalsToDollarsAndCents } from "../../utils/helper"
import { selectBadAttitudeValue, selectGoodAttitudeValue, selectPointsType, setAllowance } from "../../features/allowance/allowanceSlice"
import MainModal from "../Modal/MainModal"

export default function ChoreCard({ chore, value, completedBy }) {
  const [flip, setFlip] = useState(false)
  const [lastChore, setLastChore] = useState()
  const [dailyChore, setDailyChore] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currentValue, setCurrentValue] = useState(value)

  const goodAttitudeValue = useSelector(selectGoodAttitudeValue);
  const badAttitudeValue = useSelector(selectBadAttitudeValue);
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

  function handleClick(e) {
    if (!flip) {
      // update Redux to show completed w/out waiting for db
   
      dispatch(
        updateChore({
          chore,
          value: currentValue,
          completedBy: activeFamilyMember,
          dateCompleted: date,
        })
      )
      // updated firestore to show completed
      updateDbChore(chore, currentValue, activeFamilyMember, date)
      updateAllowance(activeFamilyMember, currentValue)
        .then(() => getAllowances()) // get new allowances and update redux store with new values
        .then((earnings) => dispatch(setAllowance(earnings)))
      
 
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
    if (!flip) setShowModal(true)
    setFlip(!flip)
    setLastChore({
      chore,
      value: currentValue,
      completedBy: activeFamilyMember,
      dateCompleted: date,
    })
  }

  function handleAttitude(e) {
    let attitude = e.target.id
    console.log(goodAttitudeValue)
    if(attitude === 'good-emoji'){
      updateAllowance(activeFamilyMember, goodAttitudeValue)
          .then(() => getAllowances()) // get new allowances and update redux store with new values
          .then((earnings) => dispatch(setAllowance(earnings)))
    } else if (attitude === 'bad-emoji'){
      updateAllowance(activeFamilyMember, -badAttitudeValue)
          .then(() => getAllowances()) // get new allowances and update redux store with new values
          .then((earnings) => dispatch(setAllowance(earnings)))
    }
    setShowModal(false)
    
  }

  function handleClose(e) {
    
    setShowModal(false)
  }

  function handleDailyChore(e) {
    e.stopPropagation()
    if(!dailyChore){
      setCurrentValue(0)
    } else {
      setCurrentValue(value)
    }
    setDailyChore(!dailyChore)
  }

  return (
    <>
      {/* flip card on mouse up */}
      <div className="chore-card" onClick={handleClick} id={chore}>
        <div className={flip ? "main-card flip-card" : "main-card"}>
          <div className="card-front">
            <div>{`${chore}`}</div>
            {currentValue ?  pType?.type === "money" ? (
              <div>
                {/* Check if numVal is a whole number or decimal */}
                {numVal % 1 === 0 ? `$${value}` : `${convertDecimalsToDollarsAndCents(numVal)}`}
              </div>
            ) : (
              <div>{`${value} ${pType.icon}`}</div>
            ): null }
            <div className={dailyChore ? "daily-chore-active" : "daily-chore"} onClick={handleDailyChore}>Chore</div>
          </div>

          <div className="card-back">
            <div className="completed">{chore}</div>
            <div>{`${completedBy ? completedBy : "Anonymous"}:`}</div>
            <div>{date}</div>
          </div>
        </div>
      </div>
      <MainModal title={`${activeFamilyMember}'s Attitude`} show={showModal} onHide={handleClose}>
        <div onClick={handleAttitude} className="attitude-emoji-container">
          <span className="attitude-emoji" name="good" id="good-emoji">😁</span>
          <span className="attitude-emoji" name="neutral" id="neutral-emoji">
            😐
          </span>
          <span className="attitude-emoji" name="bad" id="bad-emoji">😡</span>
        </div>
      </MainModal>
    </>
  )
}
