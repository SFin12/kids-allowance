/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AllowanceContainer from "../../components/Allowance/AllowanceContainer";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import {
    selectAllowance,
    selectGoals,
    setAllowance,
    setGoal,
} from "../../features/allowance/allowanceSlice";
import { selectActiveFamilyMember } from "../../features/user/userSlice";
import { getAllowances, getGoals } from "../../utils/firestore";
import { convertDecimalsToDollarsAndCents } from "../../utils/helper";
import "./AllowancePage.css";

export default function AllowancePage() {
    const [percentageOfGoal, setPercentageOfGoal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const activeFamilyMember = useSelector(selectActiveFamilyMember);
    const goals = useSelector(selectGoals);
    const allowance = useSelector(selectAllowance);
    const navigate = useNavigate();

    useEffect(() => {
        let unmounted = false;

        // get allowances and goals from db and set it to redux for faster interaction between members
        const getAllAllowances = async () => {
            const earnings = await getAllowances();
            const goals = await getGoals();
            // redux reducer fuction to update redux store
            dispatch(setAllowance(earnings));
            dispatch(setGoal(goals));
            return goals;
        };
        getAllAllowances().then((goals) => {
            if (!unmounted) {
                setIsLoading(false);
                if (activeFamilyMember && !goals[activeFamilyMember]) {
                    return navigate("/main/addGoal");
                }
            }
        });
        return () => {
            unmounted = false;
        };
    }, []);

    useEffect(() => {
        if (allowance) {
            calculateGoalPercentage(allowance);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allowance, goals, activeFamilyMember]);

    function calculateGoalPercentage(allowance) {
        if (!allowance[activeFamilyMember]) {
            return setPercentageOfGoal(0);
        }
        if (!goals[activeFamilyMember]) {
            return setPercentageOfGoal(0);
        }

        // gives the percentage of goal used fo fill allowance graph
        let percentage =
            (allowance[activeFamilyMember].currentTotal /
                goals[activeFamilyMember].value) *
            100;

        percentage < 0 && (percentage = 0);
        setPercentageOfGoal(percentage);
    }

    // conditoinal edit icon button added if an active member is clicked. Used to add / edit goal
    const EditIcon = (
        <Link className="target-icon" to={"/main/editAllowance"}>
            <AiOutlineEdit
                style={{ height: "2rem", width: "2rem", color: "teal" }}
            />
        </Link>
    );

    return (
        <>
            {/* Show spinner while waiting on data from firebase */}
            {isLoading ? (
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <LoadingSpinner />
                </div>
            ) : (
                <>
                    {/* Main page once data has been loaded */}
                    {!activeFamilyMember ? (
                        <div className="d-flex flex-column justify-content-center">
                            <h3>Choose an active family member</h3>
                        </div>
                    ) : (
                        <div className="d-flex flex-column justify-content-center">
                            <div className="lifetime-stats">
                                {convertDecimalsToDollarsAndCents(
                                    allowance[activeFamilyMember].lifetimeTotal
                                )}
                            </div>
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
            )}
        </>
    );
}
