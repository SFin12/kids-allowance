import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/Forms/FormInput";
import {
    selectActiveFamilyMember,
    selectUserId,
} from "../../features/user/userSlice";
import { createAllowance } from "../../utils/firestore";

export default function SetBonusPage() {
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
                Coming Soon
                {false // Replace false with activeFamilyMember when ready to fnish
                    ? `Set a target amount and bonus if ${activeFamilyMember} reaches the target ?`
                    : null}
            </h4>
            <p className="w-75">
                You will soon be able to set a target amount and reward bonus
                money for exercising patience when saving. For example, every
                $10 saved earns a $1 bonus.
            </p>

            {/* <div className="w-75">
                <FormInput titles={["Amount"]} handleSubmit={handleSubmit} />
            </div> */}
        </div>
    );
}
