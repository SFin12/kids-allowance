import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/Forms/FormInput";
import {
    selectActiveFamilyMember,
    selectUserId,
} from "../../features/user/userSlice";
import { createAllowance, updateAllowance } from "../../utils/firestore";

export default function AdjustTotalPage() {
    const activeFamilyMember = useSelector(selectActiveFamilyMember);
    const userId = useSelector(selectUserId);
    const navigate = useNavigate();

    useEffect(() => {
        if (activeFamilyMember === null) {
            navigate("/main");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeFamilyMember]);

    function handleSubmit(e) {
        e.preventDefault();

        const newTotal = Number(e.target.elements.Amount.value);
        console.log(newTotal);
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
                <FormInput titles={["Amount"]} handleSubmit={handleSubmit} />
            </div>
        </div>
    );
}
