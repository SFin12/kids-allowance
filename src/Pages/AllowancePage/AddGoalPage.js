import React, { useState } from "react";
import FormInput from "../../components/Forms/FormInput";

export default function AddGoalPage() {
    function handleSubmit(e) {
        const goal = e.target.elements.Goal.value;
        const cost = e.target.elements.Cost.value;
        console.log(goal, cost);
        e.preventDefault();
    }

    return (
        <div className="w-75">
            <FormInput titles={["Goal", "Cost"]} handleSubmit={handleSubmit} />
        </div>
    );
}
