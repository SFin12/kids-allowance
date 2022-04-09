import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/Forms/FormInput";
import { setGoal } from "../../features/allowance/allowanceSlice";
import {
    selectActiveFamilyMember,
    selectUserId,
} from "../../features/user/userSlice";
import { updateGoal } from "../../utils/firestore";

export default function AddGoalPage() {
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
        const goal = e.target.elements.Goal.value;
        const cost = e.target.elements.Cost.value;
        // saves new goal to db
        updateGoal(activeFamilyMember, goal, cost, userId).then(() => {
            navigate("/main/allowance");
        });
        // updates redux store
        setGoal({ [activeFamilyMember]: { goal: goal, value: cost } });
    }

    return (
        <div
            className="d-flex justify-content-center w-100 flex-column align-items-center"
            style={{ height: "70vh" }}
        >
            <h4 className="title">
                {activeFamilyMember
                    ? `Set a goal for ${activeFamilyMember}`
                    : null}
            </h4>

            <div className="w-75">
                <FormInput
                    titles={["Goal", "Cost"]}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}
