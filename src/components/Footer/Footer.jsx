import React, { useState } from "react";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectActiveFamilyMember, selectFamilyMembers, selectTutorialOn, setActiveFamilyMember } from "../../features/user/userSlice"
import "./Footer.css"

export default function Footer() {
  const [activeMember, setActiveMember] = useState()
  const dispatch = useDispatch()
  const familyMembers = useSelector(selectFamilyMembers)
  const activeFamilyMember = useSelector(selectActiveFamilyMember)
  const tutorialOn = useSelector(selectTutorialOn)

  useEffect(() => {
    setActiveMember(activeFamilyMember)
  }, [activeFamilyMember])

  function handleActiveFamilyMember(e) {
    const member = e.currentTarget.id
    // setActiveMember(member)
    dispatch(setActiveFamilyMember({ activeFamilyMember: member }))
  }

  return (
    <div className="footer">
      {familyMembers && familyMembers.length > 0 ? (
        familyMembers.map((member, i) => {
          // Change the color shade for each family  member button
          const bgModifier = i * 25
          let color = "black"
          let r = 127 - bgModifier
          let g = 255 - bgModifier
          let b = 212 - bgModifier
          // If there are a lot of members the background gets dark... turn the text color white
          if (i > 4) {
            color = "whitesmoke"
          }
          if (member === activeMember) {
            r = 255
            g = 255
            b = 0

            color = "black"
          }
          return (
            <div
              key={i + member}
              className="member"
              id={member}
              name={member}
              style={{
                background: `rgb(${r}, ${g}, ${b})`,
                color: color,
              }}
              onClick={handleActiveFamilyMember}
            >
              {member}
            </div>
          )
        })
      ) : tutorialOn ? null : (
        <h5 className="d-flex w-100 justify-content-center align-items-center">Go to Settings to add Family Members</h5>
      )}
    </div>
  )
}
