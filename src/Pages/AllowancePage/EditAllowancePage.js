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
import "./EditAllowancePage.css";

export default function EditAllowancePage(props) {
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
        <div className="edit-allowance-container">
            <div className="d-flex flex-column flex-grow-1">
                <section
                    className="flex-grow-1"
                    style={{ backgroundColor: "gray" }}
                >
                    Spend Money
                </section>
                <section
                    className="flex-grow-1"
                    style={{ backgroundColor: "white" }}
                >
                    Change Goal
                </section>
                <section
                    className="flex-grow-1"
                    style={{ backgroundColor: "gray" }}
                >
                    Set Bonus
                </section>
                <section
                    className="flex-grow-1"
                    style={{ backgroundColor: "white" }}
                >
                    Edit Money
                </section>
                <section
                    className="flex-grow-1"
                    style={{ backgroundColor: "gray" }}
                >
                    Reset Allowance
                </section>
            </div>
        </div>
    );
}
