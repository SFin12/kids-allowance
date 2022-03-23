import React from "react";
import { useSelector } from "react-redux";

export default function ChoirsPage() {
    const sampleChoirs = {
        poop: 10,
        dishes: 5,
    };

    return (
        <div>
            {Object.keys(sampleChoirs).map((key, i) => (
                <>
                    <div className="card w-25">
                        {key + "\n $" + sampleChoirs[key]}
                    </div>
                </>
            ))}
        </div>
    );
}
