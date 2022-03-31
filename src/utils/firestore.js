import { db } from "../utils/firebaseConfig";
import firebase from "firebase/compat/app";

export function getCurrentUserInfo() {
    return firebase.auth().currentUser;
}

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

export const getUserInfo = async (userId) => {
    let uid = userId;
    if (!uid) {
        try {
            uid = await getCurrentUserInfo().uid;
        } catch (err) {
            console.log(err.message);
        }
    }
    const userRef = await db.collection("users");
    const snapshot = await userRef.doc(`${uid}`).get();
    const userData = await snapshot.data();

    return userData;
};

export const createChore = async (title, value) => {
    const userId = getCurrentUserInfo().uid;
    const userDataRef = db.collection("users").doc(`${userId}`);
    userDataRef.update({
        [`chores.${title}`]: {
            value,
            completedBy: "",
            dateCompleted: "",
        },
    });
};

export const updateChore = async (title, value, completedBy, dateCompleted) => {
    const userId = getCurrentUserInfo().uid;
    const userDataRef = db.collection("users").doc(`${userId}`);
    userDataRef.update({
        [`chores.${title}`]: {
            value,
            completedBy,
            dateCompleted,
        },
    });
};

export const getChores = async () => {
    const userId = getCurrentUserInfo().uid;
    const userRef = await db.collection("users");
    const snapshot = await userRef.doc(`${userId}`).get();
    return snapshot.data().chores;
};

export const deleteChore = (title) => {
    const userId = getCurrentUserInfo().uid;
    const userDataRef = db.collection("users").doc(`${userId}`);
    userDataRef.update({
        [`chores.${title}`]: firebase.firestore.FieldValue.delete(),
    });
};

export const createFamily = async (namesArr) => {
    const userId = getCurrentUserInfo().uid;
    const userDataRef = db.collection("users").doc(`${userId}`);
    userDataRef.update({
        family: firebase.firestore.FieldValue.arrayUnion(...namesArr),
    });
};

export const getFamily = async (userId) => {
    let uid = userId;
    if (!uid) {
        try {
            uid = await getCurrentUserInfo().uid;
        } catch (err) {
            console.log(err.message);
        }
    }
    const userRef = await db.collection("users");
    const snapshot = await userRef.doc(`${uid}`).get();
    return snapshot.data().family;
};

export const deleteFamily = (name) => {
    const userId = getCurrentUserInfo().uid;
    const userDataRef = db.collection("users").doc(`${userId}`);
    userDataRef.update({
        family: firebase.firestore.FieldValue.arrayRemove(name),
    });
};
