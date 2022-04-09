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

export const deleteChore = async (title) => {
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

export const updateAllowance = async (
    member,
    value = 0,
    userId = getCurrentUserInfo().uid
) => {
    let totalValue = Number(value);
    const allowanceExists = await getAllowance();
    if (allowanceExists[member]) {
        console.log("allowance exists:", allowanceExists[member]);
        totalValue += Number(allowanceExists[member]);
    }
    const userRef = await db.collection("users").doc(userId);
    const earnings = await userRef.collection("earnings");
    earnings.doc("earnings").set(
        {
            [member]: totalValue,
        },
        { merge: true }
    );
};

export const getAllowance = async () => {
    let uid = "";
    if (!uid) {
        try {
            uid = await getCurrentUserInfo().uid;
        } catch (err) {}
    }
    const userRef = await db.collection("users");
    const snapshot = await userRef
        .doc(`${uid}`)
        .collection("earnings")
        .doc("earnings")
        .get();
    const earnings = await snapshot.data();
    return earnings;
};

export const deleteAllowance = async (member) => {
    let uid = "";
    if (!uid) {
        try {
            uid = await getCurrentUserInfo().uid;
        } catch (err) {}
    }
    const userRef = await db.collection("users");
    const snapshot = await userRef
        .doc(`${uid}`)
        .collection("earnings")
        .doc("earnings");
    snapshot.update({
        [member]: firebase.firestore.FieldValue.delete(),
    });
};

export const updateGoal = async (
    member,
    goalName,
    goalValue,
    userId = getCurrentUserInfo().uid
) => {
    const userRef = await db.collection("users").doc(userId);
    const earnings = await userRef.collection("goals");
    earnings.doc("goals").set(
        {
            [member]: {
                goal: goalName,
                value: goalValue,
            },
        },
        { merge: true }
    );
};

export const getGoals = async () => {
    const uid = await getCurrentUserInfo().uid;
    const userRef = await db.collection("users");
    const snapshot = await userRef
        .doc(`${uid}`)
        .collection("goals")
        .doc("goals")
        .get();
    const goals = await snapshot.data();
    return goals;
};

export const deleteGoal = async (
    member,
    goal,
    userId = getCurrentUserInfo().uid
) => {
    const userRef = await db.collection("users").doc(userId);
    const earnings = await userRef.collection("goals");
    earnings.doc("goals").update({
        [`${member}.${goal}`]: firebase.firestore.FieldValue.delete(),
    });
};
