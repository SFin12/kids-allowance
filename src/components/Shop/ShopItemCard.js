/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateChore } from "../../features/chores/choresSlice"
import { getAllowances, updateAllowance, updateChore as updateDbChore } from "../../utils/firestore"
import { selectActiveFamilyMember, selectPointsType } from "../../features/user/userSlice"
import { convertDecimalsToDollarsAndCents } from "../../utils/helper"
import { selectBadAttitudeValue, selectGoodAttitudeValue, setAllowance } from "../../features/allowance/allowanceSlice"
import MainModal from "../Modal/MainModal"
import "./ChoreCard.css"
import { Button } from "react-bootstrap"

// WIP

export default function ShopItemCard({ value, boughtBy }) {
  const [flip, setFlip] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currentValue, setCurrentValue] = useState(value)

  const dispatch = useDispatch()
  const numVal = Number(value)
  const date = new Date().toDateString().slice(0, -5)
  const activeFamilyMember = useSelector(selectActiveFamilyMember)
  const pType = useSelector(selectPointsType)

  useEffect(() => {
    // if db shows completed (parent fetches from db), flip to completed side
    if (boughtBy) {
      setFlip(true)
    }
  }, [])

  function handleClick(e) {
    if (!flip) {
      // update Redux to show completed w/out waiting for db

      dispatch(
        updateShopItem({
          shopItem,
          value,
          completedBy: activeFamilyMember,
          dateCompleted: date,
        })
      )
      // updated firestore to show completed
      updateDbShopItem(shopItem, value, activeFamilyMember, date)
    } else {
      // update redux store to show not completed w/out waiting for db
      dispatch(
        updateShopItem({
          shopItem,
          value,
          completedBy: "",
          dateCompleted: "",
        })
      )
      // updated firestore to show not completed
      updateDbShopItem(shopItem, value, "", "")
    }

    setFlip(!flip)
    if (!flip) {
      setTimeout(() => {
        setShowModal(true)
      }, 500)
    }
    setLastShopItem({
      shopItem,
      value: currentValue,
      completedBy: activeFamilyMember,
      dateCompleted: date,
    })
  }

  function handleClose(e) {
    setShowModal(false)
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
              <div>{date}</div>
            </div>
          </div>
        </div>
      </div>
      <MainModal title={`Spend ${activeFamilyMember}'s ${pType.type}?`} show={showModal} onHide={handleClose}>
        {/* <Button>Yes</Button> */}
      </MainModal>
    </>
  )
}
