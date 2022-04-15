import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { uiConfig } from "../../utils/firebaseConfig";
import "./SignInPage.css";
import { useEffect } from "react";

function SignInPage() {
    useEffect(() => {});
    return (
        <div className="d-flex flex-column justify-content-center align-items-center h-100 sign-in-background">
            <div className=" d-flex flex-column justify-content-center align-items-center sign-in">
                <h1>Chorzy</h1>

                {/* firebaseUi for react to style login components */}
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            </div>
            <br></br>
            <p
                className="w-50"
                style={{ color: "gray", fontSize: "12px", maxWidth: "250px" }}
            >
                You will be registered on your first sign-in.
            </p>
        </div>
    );
}

export default SignInPage;
