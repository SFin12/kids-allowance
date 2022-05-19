import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/Forms/FormInput";
import {
    selectActiveFamilyMember,
    selectUserId,
} from "../../features/user/userSlice";
import { updateAllowance } from "../../utils/firestore";

export default function SpendPage() {
    const activeFamilyMember = useSelector(selectActiveFamilyMember);
    const [currentFamilyMember] = useState(activeFamilyMember);
    const userId = useSelector(selectUserId);
    const navigate = useNavigate();

    useEffect(() => {
        if (activeFamilyMember === null) {
            navigate("/main");
        }
        // if active member is switched, go back to main allowance page
        if (currentFamilyMember !== activeFamilyMember) {
            navigate("/main/allowance");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeFamilyMember]);

    function handleSubmit(e) {
        e.preventDefault();

        const spent = e.target.elements.Amount.value * -1;

        updateAllowance(activeFamilyMember, spent, userId).then(() => {
            navigate("/main/allowance");
        });
    }

    return (
        <div
            className="d-flex justify-content-center w-100 flex-column align-items-center"
            style={{ height: "70vh" }}
        >
            <h4 className="title">
                {activeFamilyMember
                    ? `How much did ${activeFamilyMember} spend?`
                    : null}
            </h4>

            <div className="w-75">
                <FormInput titles={["Amount"]} handleSubmit={handleSubmit} />
            </div>
        </div>
    );
}
