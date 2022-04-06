import React, { useEffect } from "react";
import { SiTarget } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AllowanceContainer from "../../components/Allowance/AllowanceContainer";

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

    useEffect(() => {
        // get allowances from db and set it to redux for faster interaction between members
        const getAllowances = async () => {
            const earnings = await getAllowance();
            // redux reducer fuction
            dispatch(setAllowance(earnings));
        };
        getAllowances();
    }, []);

    function calculateGoalPercentage() {
        if (!allowance[activeFamilyMember]) {
            return 0;
        }
        // gives the percentage of goal used fo fill allowance graph
        const percentage = (allowance[activeFamilyMember] / 10) * 100;
        return percentage;
    }
    function targetClickHandler() {}

    // conditoinal target button added if an active member is clicked. Used to add / edit goal
    const AddGoalIcon = (
        <Link className="target-icon" to={"/main/addGoal"}>
            <SiTarget
                style={{ height: "2rem", width: "2rem", color: "teal" }}
            />
        </Link>
    );

    return (
        <div>
            <AllowanceContainer
                className="allowance-bar"
                allowance={allowance}
                activeFamilyMember={activeFamilyMember}
                style={{ height: `${calculateGoalPercentage()}%` }}
            />
            {activeFamilyMember ? AddGoalIcon : null}
        </div>
    );
}
