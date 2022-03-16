import { db } from "../utils/firebaseConfig";
import firebase from "firebase/compat/app";

export function getCurrentUserInfo() {
    return firebase.auth().currentUser;
}

export const getChoirs = async () => {
    const userId = getCurrentUserInfo().uid;
    const userRef = await db.collection("users");
    const snapshot = userRef.doc(`${userId}`).get();
    console.log((await snapshot).data()["name"]);
};

export const createChoir = async (title, value) => {
    const userId = getCurrentUserInfo().uid;
    console.log("current user: ", userId);
    const userDataRef = db.collection("users").doc(`${userId}`);
    userDataRef.update({
        choirs: firebase.firestore.FieldValue.arrayUnion({
            [title]: value,
        }),
    });
};

export const createUser = (name, email, id) => {
    db.collection("users")
        .doc(id)
        .set({
            name,
            email,
        })
        .then(() => console.log(db.collection));
};
