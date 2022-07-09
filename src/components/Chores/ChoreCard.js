/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChore } from "../../features/chores/choresSlice";
import {
    getAllowances,
    updateAllowance,
    updateChore as updateDbChore,
} from "../../utils/firestore";
import { selectActiveFamilyMember } from "../../features/user/userSlice";
import "./ChoreCard.css";
import { convertDecimalsToDollarsAndCents } from "../../utils/helper";
import { setAllowance } from "../../features/allowance/allowanceSlice";

export default function ChoreCard({ chore, value, completedBy }) {
    const [flip, setFlip] = useState(false);
    const dispatch = useDispatch();
    const numVal = Number(value);
    const date = new Date().toDateString().slice(0, -5);
    const activeFamilyMember = useSelector(selectActiveFamilyMember);

    useEffect(() => {
        // if db shows completed (parent fetches from db), flip to completed side
        if (completedBy) {
            setFlip(true);
        }
    }, []);

    function handleClick(e) {
        if (!flip) {
            // update Redux to show completed w/out waiting for db
            dispatch(
                updateChore({
                    chore,
                    value,
                    completedBy: activeFamilyMember,
                    dateCompleted: date,
                })
            );
            // updated firestore to show completed
            updateDbChore(chore, value, activeFamilyMember, date);
            updateAllowance(activeFamilyMember, value)
                .then(() => getAllowances()) // get new allowances and update redux store with new values
                .then((earnings) => dispatch(setAllowance(earnings)));
        } else {
            // update redux store to show not completed w/out waiting for db
            dispatch(
                updateChore({
                    chore,
                    value,
                    completedBy: "",
                    dateCompleted: "",
                })
            );
            // updated firestore to show not completed
            updateDbChore(chore, value, "", "");
        }
        setFlip(!flip);
    }

    return (
        //flip card on mouse up
        <div className="chore-card" onMouseUp={handleClick} id={chore}>
            <div className={flip ? "main-card flip-card" : "main-card"}>
                <div className="card-front">
                    <div>{chore}</div>
                    <div>
                        {/* Check if numVal is a whole number or decimal */}
                        {numVal % 1 === 0
                            ? `$${value}`
                            : `${convertDecimalsToDollarsAndCents(numVal)}`}
                    </div>
                </div>
                <div className="card-back">
                    <div className="completed">{chore}</div>
                    <div>{`${completedBy}:`}</div>
                    <div>{date}</div>
                </div>
            </div>
        </div>
    );
}
