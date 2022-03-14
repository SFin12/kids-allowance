import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { uiConfig } from "../utils/firebaseConfig";

function SignInScreen() {
    return (
        <div>
            <h1>Kids Allowance App</h1>
            <p>Please sign-in:</p>
            <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
            />
            <p>hello</p>
        </div>
    );
}

export default SignInScreen;
