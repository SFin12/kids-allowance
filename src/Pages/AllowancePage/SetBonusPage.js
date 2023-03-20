import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectActiveFamilyMember } from "../../features/user/userSlice"


export default function SetBonusPage() {
  const activeFamilyMember = useSelector(selectActiveFamilyMember)
  const [currentFamilyMember] = useState(activeFamilyMember)
  const navigate = useNavigate()

  useEffect(() => {
    if (activeFamilyMember === null) {
      navigate("/main")
    }

    // if active member is switched, go back to main allowance page
    if (currentFamilyMember !== activeFamilyMember) {
      navigate("/main/allowance")
    }

  }, [activeFamilyMember])

  return (
    <div className="d-flex justify-content-center w-100 flex-column align-items-center" style={{ height: "70vh" }}>
      <h4 className="title">
        Coming Soon
        {false // Replace false with activeFamilyMember when ready to fnish
          ? `Set a target amount and bonus if ${activeFamilyMember} reaches the target ?`
          : null}
      </h4>
      <p className="w-75">You will soon be able to set a target amount and reward a bonus for exercising patience when saving. For example, every 10 saved earns 1 bonus point.</p>
    </div>
  )
}
