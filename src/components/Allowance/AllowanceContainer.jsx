import { useState } from "react";
import "./AllowanceContainer.css";

export default function AllowanceContainer({
    allowance,
    activeFamilyMember,
    percentageOfGoal,
    style,
}) {
    const [percent, setPercent] = useState(0);

    return (
        <div className="allowance-container">
            <div
                className="allowance-bar"
                style={{
                    height: `${percentageOfGoal}%`,
                    animation: "progress-bar 2s",
                }}
            >
                ${allowance[activeFamilyMember]}
            </div>
        </div>
    );
}
