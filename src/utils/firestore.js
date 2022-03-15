import { db } from "../utils/firebaseConfig";

export const getChoirs = async () => {
    const snapshot = await db.collection("choirs").get();
    const items = snapshot.docs.map((doc) => {
        return doc.data();
    });
    return items;
};

export const createChoir = async (title, value) => {
    db.collection("choirs").add({
        title,
        value,
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
