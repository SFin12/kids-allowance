import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/Forms/FormInput";
import {
    selectActiveFamilyMember,
    selectUserId,
} from "../../features/user/userSlice";
import {
    getAllowance,
    updateAllowance,
    updateGoal,
} from "../../utils/firestore";

export default function SpendPage() {
    const activeFamilyMember = useSelector(selectActiveFamilyMember);
    const userId = useSelector(selectUserId);
    const navigate = useNavigate();

    useEffect(() => {
        if (activeFamilyMember === null) {
            navigate("/main");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeFamilyMember]);

    function handleSubmit(e) {
        e.preventDefault();
        const spent = e.target.value * -1;
        updateAllowance(spent);
    }

    return (
        <div
            className="d-flex justify-content-center w-100 flex-column align-items-center"
            style={{ height: "70vh" }}
        >
            <h4 className="title">
                {activeFamilyMember
                    ? `How much did ${activeFamilyMember} spend?`
                    : null}
            </h4>

            <div className="w-75">
                <FormInput titles={["Amount"]} handleSubmit={handleSubmit} />
            </div>
        </div>
    );
}
