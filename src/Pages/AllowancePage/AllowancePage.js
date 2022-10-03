/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { act } from "react-dom/test-utils"
import { IconContext } from "react-icons"
import { AiOutlineEdit } from "react-icons/ai"
import { BsEmojiFrown, BsEmojiSmile, BsEmojiSmileFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import useSound from "use-sound"
import AllowanceContainer from "../../components/Allowance/AllowanceContainer"
import LoadingSpinner from "../../components/Loading/LoadingSpinner"
import { selectAllowance, selectBadAttitudeValue, selectChoresStats, selectGoals, selectGoodAttitudeValue, setAllowance, setChoresStats, setGoal } from "../../features/allowance/allowanceSlice"

import { selectActiveFamilyMember, selectPointsType } from "../../features/user/userSlice"
import { getAllowances, getChoreStats, getGoals, updateAllowance } from "../../utils/firestore"
import { convertDecimalsToDollarsAndCents } from "../../utils/helper"
import "./AllowancePage.css"

export default function AllowancePage() {
  const [percentageOfGoal, setPercentageOfGoal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch()
  const pointsType = useSelector(selectPointsType)
  const activeFamilyMember = useSelector(selectActiveFamilyMember)
  const goals = useSelector(selectGoals)
  const allowance = useSelector(selectAllowance)
  const choresStats = useSelector(selectChoresStats)
  const goodAttitudeValue = useSelector(selectGoodAttitudeValue)
  const badAttitudeValue = useSelector(selectBadAttitudeValue)
  const navigate = useNavigate()

  useEffect(() => {
    let unmounted = false

    // get allowances and goals from db and set it to redux for faster interaction between members
    const getAllAllowances = async () => {
      const earnings = await getAllowances()
      const goals = await getGoals()
      const choresStats = await getChoreStats()
      // redux reducer fuction to update redux store

      dispatch(setAllowance(earnings))
      dispatch(setGoal(goals))
      dispatch(setChoresStats(choresStats))

      return goals
    }

    getAllAllowances().then((goals) => {
      if (!unmounted) {
        setIsLoading(false)

        if ((activeFamilyMember && !goals) || !goals[activeFamilyMember] || !goals[activeFamilyMember].goal) {
          return navigate("/main/addGoal")
        }
      }
    })

    return () => {
      unmounted = true
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      if (goals[activeFamilyMember]) {
        if (activeFamilyMember && !goals[activeFamilyMember].goal) {
          return navigate("/main/addGoal")
        }
      } else if (!goals[activeFamilyMember]) {
        return navigate("/main/addGoal")
      }
    }
    // console.log(allowance["Donovan"])
    calculateGoalPercentage(allowance)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowance, activeFamilyMember, goals])

  function calculateGoalPercentage(allowance) {
    if (!allowance[activeFamilyMember]) {
      return setPercentageOfGoal(0)
    }
    if (!goals[activeFamilyMember]) {
      return setPercentageOfGoal(0)
    }

    // gives the percentage of goal used fo fill allowance graph
    let percentage = Math.floor((allowance[activeFamilyMember].currentTotal / goals[activeFamilyMember].value) * 100)

    percentage < 0 && (percentage = 0)

    setPercentageOfGoal(Math.floor(percentage))
  }

  function handleAttitude(e) {
    const attitude = e.currentTarget.id

    if (attitude === "good-emoji") {
      updateAllowance(activeFamilyMember, goodAttitudeValue)
        .then(() => getAllowances()) // get new allowances and update redux store with new values
        .then((earnings) => {
          return dispatch(setAllowance(earnings))
        })
    } else if (attitude === "bad-emoji") {
      updateAllowance(activeFamilyMember, -badAttitudeValue)
        .then(() => getAllowances()) // get new allowances and update redux store with new values
        .then((earnings) => {
          return dispatch(setAllowance(earnings))
        })
    }
  }

  // conditoinal edit icon button added if an active member is clicked. Used to add / edit goal
  const EditIcon = (
    <Link to={"/main/editAllowance"} style={{ height: 20 }}>
      <AiOutlineEdit style={{ height: "2rem", width: "2rem", color: "teal", marginTop: "1.25rem" }} />
    </Link>
  )

  return (
    <>
      {/* Show spinner while waiting on data from firebase */}
      {isLoading ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {/* Main page once data has been loaded */}
          {!activeFamilyMember ? (
            <div className="d-flex flex-column justify-content-center">
              <h3>Choose an active family member</h3>
            </div>
          ) : (
            <div className="d-flex flex-column justify-content-center">
              {choresStats[activeFamilyMember]?.lastChore && (
                <>
                  <div className="lifetime-earnings">
                    <Card>
                      <Card.Header>
                        <Card.Title>Lifetime Earnings</Card.Title>
                      </Card.Header>

                      <Card.Body>{pointsType.type === "money" ? <div>{convertDecimalsToDollarsAndCents(allowance[activeFamilyMember].lifetimeTotal)}</div> : <div>{allowance[activeFamilyMember].lifetimeTotal + " " + pointsType.icon}</div>}</Card.Body>
                    </Card>
                  </div>

                  <div className="lifetime-chores">
                    <Card>
                      <Card.Header>
                        <Card.Title>Last Chore</Card.Title>
                      </Card.Header>

                      <Card.Body>
                        <div>{choresStats[activeFamilyMember].lastChore}</div>
                        <div>{choresStats[activeFamilyMember].lastChoreCompleted}</div>
                      </Card.Body>
                    </Card>
                  </div>
                </>
              )}
              <h3 className="mt-3">
                {/* Check for money or points system and show symbol before or after value */}
                {goals[activeFamilyMember] ? `${goals[activeFamilyMember].goal} ` : null}
                {goals[activeFamilyMember] ? pointsType?.type === "money" ? <span>{pointsType.icon + goals[activeFamilyMember].value}</span> : <span>{goals[activeFamilyMember].value + " " + pointsType.icon}</span> : null}
              </h3>

              <AllowanceContainer className="allowance-bar" allowance={allowance} goal={goals} activeFamilyMember={activeFamilyMember} percentageOfGoal={percentageOfGoal} style={{ height: `${percentageOfGoal}%` }} />
              {activeFamilyMember ? (
                <div className="allowance-icons-container">
                  <div onClick={handleAttitude} name="good" id="good-emoji">
                    <BsEmojiSmile className="attitude-bonus" />
                  </div>
                  <div onClick={handleAttitude} name="bad" id="bad-emoji" style={{ marginTop: "1.25rem" }}>
                    <BsEmojiFrown className="attitude-bonus" />
                  </div>
                  {EditIcon}
                </div>
              ) : null}
            </div>
          )}
        </>
      )}
    </>
  )
}
