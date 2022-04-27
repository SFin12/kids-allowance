import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/Forms/FormInput";
import { selectAllowance } from "../../features/allowance/allowanceSlice";
import {
    selectActiveFamilyMember,
    selectUserId,
} from "../../features/user/userSlice";
import { createAllowance } from "../../utils/firestore";

export default function AdjustTotalPage() {
    const activeFamilyMember = useSelector(selectActiveFamilyMember);
    const [currentFamilyMember] = useState(activeFamilyMember);
    const userId = useSelector(selectUserId);
    const navigate = useNavigate();
    const currentAllowance = useSelector(selectAllowance);

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

        const newTotal = Number(e.target.elements.Amount.value);

        createAllowance(activeFamilyMember, newTotal, userId).then(() => {
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
                    ? `New total for ${activeFamilyMember}'s allowance?`
                    : null}
            </h4>

            <div className="w-75">
                <FormInput
                    titles={["Amount"]}
                    placeholder={currentAllowance[activeFamilyMember]}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}
