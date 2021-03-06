import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { selectActiveFamilyMember } from "../../features/user/userSlice";

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

    return (
        <div className="edit-allowance-container">
            <div className="d-flex flex-column flex-grow-1 h-100">
                <Link to={"/main/spend"} className="d-flex flex-grow-1">
                    <button
                        className="flex-grow-1 align-middle edit-allowance-button"
                        name="spend-money"
                    >
                        Spend Money
                    </button>
                </Link>

                <Link to={"/main/addGoal"} className="d-flex flex-grow-1">
                    <button
                        className="flex-grow-1 edit-allowance-button"
                        name="change-goal"
                    >
                        Change Goal
                    </button>
                </Link>
                <Link to={"/main/setBonus"} className="d-flex flex-grow-1">
                    <button
                        className="flex-grow-1 edit-allowance-button"
                        name="set-bonus"
                    >
                        Set Bonus
                    </button>
                </Link>
                <Link
                    to={"/main/adjustAllowance"}
                    className="d-flex flex-grow-1"
                >
                    <button
                        className="flex-grow-1 edit-allowance-button"
                        name="adjust-allowance"
                    >
                        Adjust Total
                    </button>
                </Link>
                <Link
                    to={"/main/resetAllowance"}
                    className="d-flex flex-grow-1"
                >
                    <button
                        className="flex-grow-1 edit-allowance-button"
                        name="reset-allowance"
                    >
                        Reset Allowance
                    </button>
                </Link>
            </div>
        </div>
    );
}
