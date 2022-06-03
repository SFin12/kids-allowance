import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectChores } from "../../features/chores/choresSlice";
import {
    selectFamilyMembers,
    selectUserEmail,
} from "../../features/user/userSlice";
import "./TitlePage.css";

export default function TitlePage() {
    const [dataExists, setDataExists] = useState(false);
    const family = useSelector(selectFamilyMembers);
    const chores = useSelector(selectChores);
    const email = useSelector(selectUserEmail);
    const fullDate = new Date();
    const year = fullDate.getFullYear();
    const day = fullDate.getDate();
    const month = fullDate.getMonth() + 1;
    const yearsOld = year - 1985;
    const time = fullDate.getHours();

    const birthdayMessage =
        month === 6 &&
        day === 2 &&
        email === "rachelfinegan@gmail.com" &&
        time >= 10;

    useEffect(() => {
        if (family && chores) {
            // if family and chores exist, say data exists to change what is returned

            family.length > 0 && setDataExists(true);
        }
    }, [family, chores]);
    return (
        <div className="title-page-container container">
            {birthdayMessage && (
                <a
                    href="https://m.media-amazon.com/images/I/71lKlhpUAPL._AC_SX425_.jpg"
                    className="birthdayMessage"
                >
                    <div className="">
                        Happy Birthday Wonder Woman!{" "}
                        <div>
                            You're {yearsOld} years young and look better than
                            ever!
                        </div>
                    </div>
                </a>
            )}
            {dataExists ? (
                <Link to="/main/chores" className="logo-link">
                    <div className="logo">
                        <div>Chorzy</div>
                    </div>
                </Link>
            ) : (
                <Link to="/main/settings" className="logo-link">
                    <div className="logo">
                        <div>Chorzy</div>
                    </div>
                </Link>
            )}
        </div>
    );
}
