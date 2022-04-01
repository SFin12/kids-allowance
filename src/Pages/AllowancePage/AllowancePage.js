import React, { useEffect, useState } from "react";
import {
    updateAllowance,
    createGoal,
    getAllowance,
    deleteAllowance,
    deleteGoal,
} from "../../utils/firestore";

export default function AllowancePage() {
    const [allowances, setAllowances] = useState({ hello: "there" });

    useEffect(() => {
        const getAllowances = async () => {
            const earnings = await getAllowance();
            setAllowances(earnings);
        };
        getAllowances();
    }, []);

    return (
        <div>
            <div>
                Hello
                {Object.keys(allowances).map((member, i) => {
                    console.log("member", member);
                    return (
                        <>
                            <div key={i + member}>
                                Test
                                {member}:{allowances[member]}
                            </div>
                        </>
                    );
                })}
            </div>
        </div>
    );
}
