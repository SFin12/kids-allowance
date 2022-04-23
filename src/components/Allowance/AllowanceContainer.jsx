import { useState } from "react";
import "./AllowanceContainer.css";

export default function AllowanceContainer({
    allowance,
    activeFamilyMember,
    percentageOfGoal,
    style,
}) {
    const isGreaterThanZero = percentageOfGoal > 3 ? true : false;

    return (
        <div className="allowance-container">
            <div
                className="allowance-bar"
                style={{
                    height: `${percentageOfGoal}%`,
                    animation: "progress-bar 2s",
                }}
            >
                {isGreaterThanZero && `$${allowance[activeFamilyMember]}`}
            </div>
        </div>
    );
}
