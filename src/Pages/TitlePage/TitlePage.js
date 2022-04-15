import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    selectFamilyMembers,
    selectUserId,
} from "../../features/user/userSlice";
import { getFamily } from "../../utils/firestore";
import "./TitlePage.css";

export default function TitlePage() {
    const [isFamCreated, setIsFamCreated] = useState(false);
    const [isChoresCreated, setIsChoresCreated] = useState(false);
    const family = useSelector(selectFamilyMembers);

    useEffect(() => {
        if (family) {
            family.length > 0 && setIsFamCreated(true);
        }
    }, [family]);
    return (
        <div className="title-page-container container">
            {isFamCreated ? (
                <Link to="/main/chores" className="logo-link">
                    <div className="logo">
                        <h1>Chorzy</h1>
                    </div>
                </Link>
            ) : (
                <Link to="/main/settings" className="logo-link">
                    <div className="logo">
                        <h1>Chorzy</h1>
                    </div>
                </Link>
            )}
        </div>
    );
}
