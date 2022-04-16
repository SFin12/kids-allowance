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
    const navigate = useNavigate();

    useEffect(() => {
        if (activeFamilyMember === null) {
            navigate("/main");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeFamilyMember]);

    function handleClick(e) {
        const name = e.target.name;
        switch (name) {
            case "spend-money":
                return navigate("/main/spend");
            case "change-goal":
                return navigate("/main/addGoal");
            case "set-bonus":
                return navigate("/main/setBonus");
            case "edit-allowance":
                return navigate("/main/editAllowance");
            case "reset-allowance":
                // Add logic to target active users allowance and set it to 0.
                break;
            default:
                console.log("an error occured");
        }
    }

    return (
        <div className="edit-allowance-container">
            <div className="d-flex flex-column flex-grow-1 h-100">
                <button
                    className="flex-grow-1 align-middle"
                    style={{ backgroundColor: "gray", border: "none" }}
                    onClick={handleClick}
                    name="spend-money"
                >
                    Spend Money
                </button>
                <button
                    className="flex-grow-1"
                    style={{ backgroundColor: "white", border: "none" }}
                    name="change-goal"
                    onClick={handleClick}
                >
                    Change Goal
                </button>
                <button
                    className="flex-grow-1"
                    style={{ backgroundColor: "gray", border: "none" }}
                    name="set-bonus"
                    onClick={handleClick}
                >
                    Set Bonus
                </button>
                <button
                    className="flex-grow-1"
                    style={{ backgroundColor: "white", border: "none" }}
                    name="edit-allowance"
                    onClick={handleClick}
                >
                    Edit Money
                </button>
                <button
                    className="flex-grow-1"
                    style={{ backgroundColor: "gray", border: "none" }}
                    name="reset-allowance"
                    onClick={handleClick}
                >
                    Reset Allowance
                </button>
            </div>
        </div>
    );
}
