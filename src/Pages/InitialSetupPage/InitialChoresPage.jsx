import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import EditChores from '../../components/Settings/EditChoirs'
import { selectPointsType } from '../../features/allowance/allowanceSlice'

export default function InitialChoresPage() {
  const pointsType = useSelector(selectPointsType)

  return (
    <>
      <div className="initial-container p-4">
        <h1 className="text-center">Add your first choir</h1>
        
        <br />
        <EditChores />

        <br />
        {pointsType && (
          <>
     

            <Link to={"/main/initialChores"} className="right-bottom-absolute">
              <Button>Next</Button>
            </Link>
          </>
        )}
      </div>
    </>
  )
}
