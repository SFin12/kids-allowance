import React from "react";
import "./ChoreCard.css";

export default function ChoreCard({ key, chore, value }) {
    return (
        <div className="chore-card">
            <div>{chore}</div>
            <div>{value}</div>
        </div>
    );
}
