import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
    const [percentageOfGoal, setPercentageOfGoal] = useState(0);
    const dispatch = useDispatch();
    const activeFamilyMember = useSelector(selectActiveFamilyMember);
    const goals = useSelector(selectGoals);
    const allowance = useSelector(selectAllowance);
    const navigate = useNavigate();

    useEffect(() => {
        // get allowances and goals from db and set it to redux for faster interaction between members
        const getAllowances = async () => {
            const earnings = await getAllowance();
            const goals = await getGoals();

            // redux reducer fuction to update redux store
            dispatch(setAllowance(earnings));
            dispatch(setGoal(goals));
        };
        getAllowances().then(() => {
            if (activeFamilyMember && !goals[activeFamilyMember]) {
                return navigate("/main/addGoal");
            } else {
                console.log("calculating");
                calculateGoalPercentage();
            }
        });
    }, [activeFamilyMember]);

    useEffect(() => {
        calculateGoalPercentage();
    }, [allowance]);

    function calculateGoalPercentage() {
        if (!allowance[activeFamilyMember]) {
            return 0;
        }
        if (!goals[activeFamilyMember]) {
            console.log("no value");

            return 0;
        }
        // gives the percentage of goal used fo fill allowance graph
        let percentage =
            (allowance[activeFamilyMember] / goals[activeFamilyMember].value) *
            100;

        percentage < 0 && (percentage = 0);
        setPercentageOfGoal(percentage);
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
        <>
            {console.log("percent", percentageOfGoal)}
            {!activeFamilyMember ? (
                <div className="d-flex flex-column justify-content-center">
                    <h3>Choose an active family member</h3>
                </div>
            ) : (
                <div>
                    <h3 className="mt-3">
                        {goals[activeFamilyMember]
                            ? goals[activeFamilyMember].goal +
                              " $" +
                              goals[activeFamilyMember].value
                            : null}
                    </h3>
                    <AllowanceContainer
                        className="allowance-bar"
                        allowance={allowance}
                        goal={goals}
                        activeFamilyMember={activeFamilyMember}
                        percentageOfGoal={percentageOfGoal}
                        style={{ height: `${percentageOfGoal}%` }}
                    />
                    {activeFamilyMember ? EditIcon : null}
                </div>
            )}
        </>
    );
}
