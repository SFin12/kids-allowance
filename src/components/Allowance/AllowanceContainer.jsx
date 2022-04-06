import "./AllowanceContainer.css";

export default function AllowanceContainer({
    allowance,
    activeFamilyMember,
    style,
}) {
    return (
        <div className="allowance-container">
            <div className="allowance-bar" style={style}>
                ${allowance[activeFamilyMember]}
            </div>
        </div>
    );
}
