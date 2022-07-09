import { useState } from "react";
import { convertDecimalsToDollarsAndCents, isFloat } from "../../utils/helper";
import "./AllowanceContainer.css";

export default function AllowanceContainer({
    allowance,
    activeFamilyMember,
    percentageOfGoal,
}) {
    const [barColor, setBarColor] = useState("theme-color");

    const isGreaterThanZero = percentageOfGoal > 3 ? true : false;
    const familyMembersAllowance = allowance[activeFamilyMember].currentTotal;
    const borderRadius = percentageOfGoal > 98 ? 15 : 0;

    function handleBarClick(e) {
        switch (barColor) {
            case "theme-color":
                setBarColor("coral-color");
                break;
            case "coral-color":
                setBarColor("red-color");
                break;
            case "red-color":
                setBarColor("black-color");
                break;
            case "black-color":
                setBarColor("pink-color");
                break;
            case "pink-color":
                setBarColor("blue-color");
                break;
            case "blue-color":
                setBarColor("yellow-color");
                break;
            case "yellow-color":
                setBarColor("theme-color");
                break;
            default:
                break;
        }
    }

    return (
        <div className="allowance-container">
            <div
                className={`allowance-bar ${barColor}`}
                onClick={handleBarClick}
                style={{
                    height: `${percentageOfGoal}%`,
                    borderTopLeftRadius: borderRadius,
                    borderTopRightRadius: borderRadius,
                    animation: "progress-bar 2s",
                }}
            >
                {/* Check if the total is higher than 3% of goal before displaying dollar amount */}
                {isGreaterThanZero
                    ? isFloat(familyMembersAllowance)
                        ? convertDecimalsToDollarsAndCents(
                              familyMembersAllowance
                          )
                        : `$${allowance[activeFamilyMember].currentTotal}`
                    : null}
            </div>
        </div>
    );
}
