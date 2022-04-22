import React, { useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { SiTarget } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AllowanceContainer from "../../components/Allowance/AllowanceContainer";

import {
    selectAllowance,
    selectGoals,
    setAllowance,
    setGoal,
} from "../../features/allowance/allowanceSlice";
import { selectActiveFamilyMember } from "../../features/user/userSlice";
import { getAllowance, getGoals } from "../../utils/firestore";
import "./AllowancePage.css";

export default function AllowancePage() {
    const dispatch = useDispatch();
    const activeFamilyMember = useSelector(selectActiveFamilyMember);
    const goals = useSelector(selectGoals);
    const allowance = useSelector(selectAllowance);
    const navigate = useNavigate();

    useEffect(() => {
        if (!activeFamilyMember) {
            navigate("/main/chooseFamilyMember");
        }
        if (!goals[activeFamilyMember]) {
            navigate("/main/addGoal");
        }

        // get allowances and goals from db and set it to redux for faster interaction between members
        const getAllowances = async () => {
            const earnings = await getAllowance();
            const goals = await getGoals();

            // redux reducer fuction to update redux store
            dispatch(setAllowance(earnings));
            dispatch(setGoal(goals));
        };
        getAllowances();
    }, [activeFamilyMember]);

    function calculateGoalPercentage() {
        if (!allowance[activeFamilyMember]) {
            return 0;
        }
        if (!goals[activeFamilyMember]) {
            console.log("no value");

            return 0;
        }
        // gives the percentage of goal used fo fill allowance graph
        const percentage =
            (allowance[activeFamilyMember] / goals[activeFamilyMember].value) *
            100;

        return percentage;
    }

    // conditoinal target button added if an active member is clicked. Used to add / edit goal
    const EditIcon = (
        <Link className="target-icon" to={"/main/editAllowance"}>
            <AiOutlineEdit
                style={{ height: "2rem", width: "2rem", color: "teal" }}
            />
        </Link>
    );

    return (
        <div>
            <h3 className="mt-3">
                {goals[activeFamilyMember]
                    ? goals[activeFamilyMember].goal
                    : null}
            </h3>
            <AllowanceContainer
                className="allowance-bar"
                allowance={allowance}
                goal={goals}
                activeFamilyMember={activeFamilyMember}
                style={{ height: `${calculateGoalPercentage()}%` }}
            />
            {activeFamilyMember ? EditIcon : null}
        </div>
    );
}
