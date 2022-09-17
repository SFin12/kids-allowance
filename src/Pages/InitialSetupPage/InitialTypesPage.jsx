import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import EditPointsType from "../../components/Settings/EditPointsType"
import { selectPointsType } from "../../features/user/userSlice"

export default function InitialTypesPage() {

  const pointsType = useSelector(selectPointsType)

  return (
    <>
      <div className="initial-container p-4">
        <h1 className="text-center">Choose a points system</h1>
        
        <br />
        <EditPointsType />

        <br />
      </div>
        {pointsType?.type && (
          
            <Link to={"/main/initialAttitude"} className="right-bottom-absolute">
              <Button>Next</Button>
            </Link>
          
        )}
    </>
  )
}
