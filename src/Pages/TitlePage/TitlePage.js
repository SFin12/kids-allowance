import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectChores } from "../../features/chores/choresSlice";
import {
    selectFamilyMembers,
    selectUserId,
} from "../../features/user/userSlice";
import { getFamily } from "../../utils/firestore";
import "./TitlePage.css";

export default function TitlePage() {
    const [dataExists, setDataExists] = useState(false);

    const family = useSelector(selectFamilyMembers);
    const chores = useSelector(selectChores);

    useEffect(() => {
        if (family && chores) {
            // if family and chores exist, say data exists to change what is returned
            family.length > 0 && chores.length > 0 && setDataExists(true);
        }
    }, [family, chores]);
    return (
        <div className="title-page-container container">
            {dataExists ? (
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
