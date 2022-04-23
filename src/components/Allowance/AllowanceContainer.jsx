import { convertDecimalsToDollarsAndCents, isFloat } from "../../utils/helper";
import "./AllowanceContainer.css";

export default function AllowanceContainer({
    allowance,
    activeFamilyMember,
    percentageOfGoal,
}) {
    const isGreaterThanZero = percentageOfGoal > 3 ? true : false;
    const familyMembersAllowance = allowance[activeFamilyMember];

    return (
        <div className="allowance-container">
            <div
                className="allowance-bar"
                style={{
                    height: `${percentageOfGoal}%`,
                    animation: "progress-bar 2s",
                }}
            >
                {/* Check if the total is higher than 3% of goal before displaying dollar amount */}
                {isGreaterThanZero
                    ? isFloat(familyMembersAllowance)
                        ? convertDecimalsToDollarsAndCents(
                              familyMembersAllowance
                          )
                        : `$${allowance[activeFamilyMember]}`
                    : null}
            </div>
        </div>
    );
}
