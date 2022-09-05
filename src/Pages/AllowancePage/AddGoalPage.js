import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/Forms/FormInput";
import { selectPointsType, setGoal } from "../../features/allowance/allowanceSlice";
import {
    selectActiveFamilyMember,
    selectUserId,
} from "../../features/user/userSlice";
import { updateGoal } from "../../utils/firestore";

export default function AddGoalPage() {
    const activeFamilyMember = useSelector(selectActiveFamilyMember);
    const [currentFamilyMember] = useState(activeFamilyMember);
    const userId = useSelector(selectUserId);
    const pointsType = useSelector(selectPointsType)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (activeFamilyMember === null) {
            navigate("/main");
        }
        // if active member is switched, go back to main allowance page
        if (currentFamilyMember !== activeFamilyMember) {
            navigate("/main/allowance");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeFamilyMember]);

    function handleSubmit(e) {
        e.preventDefault();
        const goal = e.target.elements.Goal.value;
        const cost = e.target.elements.Cost.value;
        dispatch(
            setGoal({ [activeFamilyMember]: { goal: goal, value: cost } })
        );
        // saves new goal to db
        updateGoal(activeFamilyMember, goal, cost, userId).then(() => {
            navigate("/main/allowance");
        });
        // updates redux store
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
