import { db } from "../utils/firebaseConfig";
import firebase from "firebase/compat/app";

export function getCurrentUserInfo() {
    return firebase.auth().currentUser;
}

export const getChoirs = async () => {
    const userId = getCurrentUserInfo().uid;
    const userRef = await db.collection("users");
    const snapshot = await userRef.doc(`${userId}`).get();
    return snapshot.data().choirs;
};

export const getUserInfo = async () => {
    const userId = getCurrentUserInfo().uid;
    const userRef = await db.collection("users");
    const snapshot = userRef.doc(`${userId}`).get();
    const userData = await snapshot.data();
    return userData;
};

export const createChoir = async (title, value) => {
    const userId = getCurrentUserInfo().uid;
    const userDataRef = db.collection("users").doc(`${userId}`);
    userDataRef.update({
        [`choirs.${title}`]: value,
    });
};

export const deleteChoir = (title) => {
    const userId = getCurrentUserInfo().uid;
    const userDataRef = db.collection("users").doc(`${userId}`);
    userDataRef.update({
        [`choirs.${title}`]: firebase.firestore.FieldValue.delete(),
    });
};

export const createUser = () => {
    const user = getUserInfo();
    db.collection("users")
        .doc(user.uid)
        .set(
            {
                id: user.uid,
                name: user.name,
                email: user.email,
            },
            { merge: true }
        )
        .then(() => console.log("created user in db"));
};
