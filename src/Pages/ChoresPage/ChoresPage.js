import React from "react";
import { useSelector } from "react-redux";
import ChoreCard from "../../components/Chores/ChoreCard";

export default function ChoresPage() {
    const sampleChores = {
        poop: 10,
        dishes: 5,
    };

    return (
        <div>
            <h2>Chores</h2>
            <div>
                {Object.keys(sampleChores).map((key, i) => (
                    <div key={i + key} className="d-grid">
                        <ChoreCard chore={key} value={sampleChores[key]} />
                    </div>
                ))}
            </div>
        </div>
    );
}
