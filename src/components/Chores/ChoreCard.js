import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChore } from "../../features/chores/choresSlice";
import {
    updateAllowance,
    updateChore as updateDbChore,
} from "../../utils/firestore";
import { selectActiveFamilyMember } from "../../features/user/userSlice";
import "./ChoreCard.css";

export default function ChoreCard({ chore, value, completedBy }) {
    const [flip, setFlip] = useState(false);
    const dispatch = useDispatch();
    // Convert value to number
    const numVal = Number(value);
    const date = new Date().toDateString().slice(0, -5);
    const activeFamilyMember = useSelector(selectActiveFamilyMember);

    useEffect(() => {
        // if db shows completed (parent fetches from db), flip to completed side
        if (completedBy) {
            setFlip(true);
        }
    }, []);

    function convertToCents() {
        if (numVal < 1) {
            const centValue = value + "0";
            return centValue.slice(0, 3);
        }
    }

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
            updateAllowance(activeFamilyMember, value);
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
                        {numVal >= 1 ? `$${value}` : `${convertToCents()}¢`}
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
