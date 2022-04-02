import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    selectAllowance,
    selectGoals,
    setAllowance,
} from "../../features/allowance/allowanceSlice";
import { selectActiveFamilyMember } from "../../features/user/userSlice";
import { getAllowance } from "../../utils/firestore";
import "./AllowancePage.css";

export default function AllowancePage() {
    const dispatch = useDispatch();
    const activeFamilyMember = useSelector(selectActiveFamilyMember);
    const goals = useSelector(selectGoals);
    const allowance = useSelector(selectAllowance);

    function calculateGoalPercentage() {
        if (!allowance[activeFamilyMember]) {
            return 0;
        }
        const percentage = (allowance[activeFamilyMember] / 10) * 100;
        console.log(percentage);
        return percentage;
    }

    useEffect(() => {
        // get allowances from db and set it to redux for faster interaction between members
        const getAllowances = async () => {
            const earnings = await getAllowance();
            // redux reducer fuction
            dispatch(setAllowance(earnings));
        };
        getAllowances();
    }, []);

    return (
        <div className="allowance-container">
            <div
                className="allowance-bar"
                style={{ height: `${calculateGoalPercentage()}%` }}
            >
                ${allowance[activeFamilyMember]}
            </div>
        </div>
    );
}
