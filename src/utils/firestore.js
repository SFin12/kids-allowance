import { db } from "../utils/firebaseConfig";
import firebase from "firebase/compat/app";

export function getCurrentUserInfo() {
    return firebase.auth().currentUser;
}

export const createUser = (user) => {
    db.collection("users")
        .doc(user.uid)
        .set(
            {
                id: user.uid,
                name: user.displayName,
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
    const userDataRef = await db.collection("users").doc(`${userId}`);
    userDataRef.update({
        [`chores.${title}`]: {
            value,
            completedBy,
            dateCompleted,
        },
    });
    if (completedBy && title && value && dateCompleted) {
        updateChoreStats(completedBy, title, value, dateCompleted);
    }
};

export const updateChoreStats = async (member, title, value, dateCompleted) => {
    const userId = getCurrentUserInfo().uid;
    const userDataRef = await db.collection("users").doc(`${userId}`);
    const date = new Date();
    const dateString = date.toString();
    const choresStats = await userDataRef.collection("choresStats");
    if (member && title && value && dateCompleted) {
        //If a chore is completed (not resetting chore), add it to chores stats

        choresStats.doc("choresStats").set(
            {
                [member]: {
                    choresCompleted: firebase.firestore.FieldValue.increment(1),
                    lastChore: title,
                    lastChoreCompleted: dateCompleted,
                    choresCompletedData:
                        firebase.firestore.FieldValue.arrayUnion({
                            title,
                            date: dateString,
                            value: value,
                        }),
                },
            },
            { merge: true }
        );
    } else {
        choresStats.doc("choresStats").set(
            {
                [member]: {
                    choresCompleted: 0,
                    lastChore: "",
                    lastChoreCompleted: "",
                    choresCompletedData: [],
                },
            },
            { merge: true }
        );
        console.log("created choresStats");
    }
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

export const getChoreStats = async () => {
    let uid = "";
    if (!uid) {
        try {
            uid = await getCurrentUserInfo().uid;
        } catch (err) {}
    }
    const userRef = await db.collection("users");
    const snapshot = await userRef
        .doc(`${uid}`)
        .collection("choresStats")
        .doc("choresStats")
        .get();
    const choresStats = await snapshot.data();
    return choresStats;
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
            return console.error(err.message + " in getCurrentUserInfo()");
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

export const createAllowance = async (
    member,
    value = 0,
    userId = getCurrentUserInfo().uid
) => {
    if (member === isNaN || member === null || typeof member === "number") {
        return console.error("Must provide string value for first argument");
    }
    let currentTotal = Number(value);

    const userRef = await db.collection("users").doc(userId);
    const earnings = await userRef.collection("earnings");
    earnings.doc("earnings").set(
        {
            [member]: {
                currentTotal: currentTotal,
                lifetimeTotal: currentTotal,
            },
        },
        { merge: true }
    );
    console.log("created allowance");
};

export const updateAllowance = async (
    member,
    value = 0,
    userId = getCurrentUserInfo().uid
) => {
    if (member === isNaN || member === null || typeof member === "number") {
        return console.error("Must provide string value for first argument");
    }
    let newTotal = Number(value);
    let lifetimeTotal = newTotal;
    const allowanceExists = await getAllowances();
    console.log(allowanceExists);
    // if an allowance exists and family member exists w/ value greater than zero, add to total.
    if (allowanceExists) {
        if (allowanceExists[member]?.currentTotal) {
            let currentTotal = Number(allowanceExists[member].currentTotal);
            lifetimeTotal =
                newTotal <= 0
                    ? Number(allowanceExists[member].lifetimeTotal)
                    : Number(allowanceExists[member].lifetimeTotal) + newTotal;
            newTotal += currentTotal; // old allowance
        }
    } else {
        return alert("Allowance doesen't exist yet.");
    }
    const userRef = await db.collection("users").doc(userId);
    const earnings = await userRef.collection("earnings");
    earnings.doc("earnings").set(
        {
            [member]: {
                currentTotal: newTotal,
                lifetimeTotal: lifetimeTotal,
            },
        },
        { merge: true }
    );
};

export const getAllowances = async () => {
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
    goalName = "",
    goalValue = 0,
    userId = getCurrentUserInfo().uid
) => {
    const userRef = db.collection("users").doc(userId);
    const earnings = userRef.collection("goals");
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
// not currently used
export const queryChores = async (member) => {
    const choresCompletedMember = [];
    const userId = getCurrentUserInfo().uid;
    const userRef = await db.collection("users");
    const snapshot = await userRef.doc(`${userId}`).get();
    const chores = await snapshot.data().chores;
    const filteredChores = Object.keys(chores);
    filteredChores.forEach((chore) => {
        if (chores[chore].completedBy === member) {
            choresCompletedMember.push({ [chore]: chores[chore] });
        }
    });
    return choresCompletedMember;
};
