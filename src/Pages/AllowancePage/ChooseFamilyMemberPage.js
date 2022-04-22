import React, { useEffect } from "react";
import { act } from "react-dom/test-utils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectActiveFamilyMember } from "../../features/user/userSlice";

export default function ChooseFamilyMemberPage() {
    const navigate = useNavigate();
    const activeFamilyMember = useSelector(selectActiveFamilyMember);

    useEffect(() => {
        if (activeFamilyMember) {
            navigate("/main/allowance");
        }
    }, [activeFamilyMember]);

    return (
        <div className="d-flex flex-column justify-content-center">
            <h3>Choose an active family member</h3>
        </div>
    );
}
