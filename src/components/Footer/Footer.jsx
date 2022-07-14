import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectFamilyMembers,
    setActiveFamilyMember,
} from "../../features/user/userSlice";
import "./Footer.css";

export default function Footer() {
    const [activeMember, setActiveMember] = useState("");
    const dispatch = useDispatch();
    const familyMembers = useSelector(selectFamilyMembers);

    function handleActiveFamilyMember(e) {
        const member = e.currentTarget.id;
        setActiveMember(member);
        dispatch(setActiveFamilyMember({ activeFamilyMember: member }));
    }
    return (
        <div className="footer">
            {familyMembers.length > 0 ? (
                familyMembers.map((member, i) => {
                    // Change the color shade for each family  member button
                    const bgModifier = i * 25;
                    let r = 127 - bgModifier;
                    let g = 255 - bgModifier;
                    let b = 212 - bgModifier;
                    if (member === activeMember) {
                        r = 255;
                        g = 255;
                        b = 0;
                    }
                    return (
                        <div
                            key={i + member}
                            className="member"
                            id={member}
                            name={member}
                            style={{
                                background: `rgb(${r}, ${g}, ${b})`,
                            }}
                            onClick={handleActiveFamilyMember}
                        >
                            {member}
                        </div>
                    );
                })
            ) : (
                <h5 className="d-flex w-100 justify-content-center align-items-center">
                    Go to Settings to add Family Members
                </h5>
            )}
        </div>
    );
}
