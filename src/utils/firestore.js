/* eslint-disable no-unused-vars */
import { db } from "../utils/firebaseConfig"
import firebase from "firebase/compat/app"
import { store } from "../app/store"
import { convertDollarsToPoints, convertPointsToDollars } from "./helper"

function getConversionRate() {
  if (store.getState().user.pointsType?.pointToDollarConversion) {
    return Number(store.getState().user.pointsType.pointToDollarConversion)
  }
}

export function getCurrentUserInfo() {
  return firebase.auth().currentUser
}

export const createUser = (user) => {
  db.collection("users")
    .doc(user.uid)
    .set(
      {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        pointsType: { type: "money", icon: "$", pointToDollarConversion: 1 },
        logins: 0,
        createdAt: new Date().toISOString(),
        tutorialOn: true,
        chores: {},
        storeItems: {},
      },
      { merge: true }
    )
    .then(() => console.log("created user in db"))
}

export const getUserInfo = async (userId) => {
  let uid = userId
  if (!uid) {
    try {
      uid = await getCurrentUserInfo().uid
    } catch (err) {
      console.log(err.message)
    }
  }
  const userRef = db.collection("users")
  const snapshot = await userRef.doc(`${uid}`).get()
  const userData = snapshot.data()

  if (userData?.goodAttitudeDollarValue && userData?.badAttitudeDollarValue) {
    userData.goodAttitudeDollarValue = convertDollarsToPoints(userData.goodAttitudeDollarValue, userData.pointsType.pointToDollarConversion)
    userData.badAttitudeDollarValue = convertDollarsToPoints(userData.badAttitudeDollarValue, userData.pointsType.pointToDollarConversion)
  }
  return userData
}

export const updateTutorial = async (booleanValue) => {
  const userId = getCurrentUserInfo().uid
  const userDataRef = await db.collection("users").doc(`${userId}`)
  userDataRef.update({
    tutorialOn: booleanValue,
  })
}

export const updateLogins = async () => {
  const userId = getCurrentUserInfo().uid
  const userDataRef = await db.collection("users").doc(`${userId}`)
  userDataRef.update({
    logins: firebase.firestore.FieldValue.increment(1),
  })
}

export const getLogins = async () => {
  const userId = getCurrentUserInfo().uid
  const snapshot = await db.collection("users").doc(`${userId}`).get()
  return snapshot.data().logins
}

export const createChore = async (title, value) => {
  const conversionRate = await getConversionRate()
  const dollarValue = convertPointsToDollars(Number(value), conversionRate)
  const userId = getCurrentUserInfo().uid
  const userDataRef = db.collection("users").doc(`${userId}`)
  userDataRef.update({
    [`chores.${title}`]: {
      value: dollarValue,
      completedBy: "",
      dateCompleted: "",
    },
  })
}

export const updateChore = async (title, value, completedBy, dateCompleted) => {
  const conversionRate = getConversionRate()
  const dollarValue = convertPointsToDollars(Number(value), conversionRate)
  const userId = getCurrentUserInfo().uid
  const userDataRef = await db.collection("users").doc(`${userId}`)
  userDataRef.update({
    [`chores.${title}`]: {
      value: dollarValue,
      completedBy,
      dateCompleted,
    },
  })
  if (completedBy && title && dollarValue && dateCompleted) {
    updateChoreStats(completedBy, title, dollarValue, dateCompleted)
  }
  return userDataRef
}

export const updateChoreStats = async (member, title, value, dateCompleted) => {
  const userId = getCurrentUserInfo().uid
  const userDataRef = await db.collection("users").doc(`${userId}`)
  const date = new Date()
  const dateString = date.toString()
  const choresStats = await userDataRef.collection("choresStats")
  if (member && title && value && dateCompleted) {
    //If a chore is completed (not resetting chore), add it to chores stats

    choresStats.doc("choresStats").set(
      {
        [member]: {
          choresCompleted: firebase.firestore.FieldValue.increment(1),
          lastChore: title,
          lastChoreCompleted: dateCompleted,
          choresCompletedData: firebase.firestore.FieldValue.arrayUnion({
            title,
            date: dateString,
            value: value,
          }),
        },
      },
      { merge: true }
    )
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
    )
  }
}

export const getChores = async () => {
  const userId = getCurrentUserInfo().uid
  const userRef = await db.collection("users")
  const snapshot = await userRef.doc(`${userId}`).get()
  let choresObj = snapshot.data().chores
  if (store.getState().user.pointsType?.type !== "money") {
    Object.keys(choresObj).forEach((key) => {
      choresObj[key].value = convertDollarsToPoints(choresObj[key].value, getConversionRate())
    })
  }

  return choresObj
}

export const deleteChore = async (title) => {
  const userId = getCurrentUserInfo().uid
  const userDataRef = db.collection("users").doc(`${userId}`)
  userDataRef.update({
    [`chores.${title}`]: firebase.firestore.FieldValue.delete(),
  })
}

export const getChoreStats = async () => {
  let uid = ""
  if (!uid) {
    try {
      uid = await getCurrentUserInfo().uid
    } catch (err) {
      console.log(err.message)
    }
  }
  const userRef = db.collection("users")
  const snapshot = await userRef.doc(`${uid}`).collection("choresStats").doc("choresStats").get()
  const choresStats = snapshot.data()
  return choresStats
}

export const deleteChoreStats = async (uid, name) => {}

export const createFamily = async (namesArr) => {
  const userId = getCurrentUserInfo().uid
  const userDataRef = db.collection("users").doc(`${userId}`)
  userDataRef.update({
    family: firebase.firestore.FieldValue.arrayUnion(...namesArr),
  })
}

export const getFamily = async (userId) => {
  let uid = userId
  if (!uid) {
    try {
      uid = getCurrentUserInfo().uid
    } catch (err) {
      return console.error(err.message + " in getCurrentUserInfo()")
    }
  }
  const userRef = db.collection("users")
  const snapshot = await userRef.doc(`${uid}`).get()
  return snapshot.data().family
}

export const deleteFamily = async (name) => {
  const userId = getCurrentUserInfo().uid
  const userDataRef = db.collection("users").doc(`${userId}`)
  // const choresRef = userDataRef.collection("choresStats").doc("choresStats")
  // const goalsRef = userDataRef.collection("goals").doc("goals")
  // const earningsRef = userDataRef.collection("earnings").doc("earnings")
  userDataRef.update({
    family: firebase.firestore.FieldValue.arrayRemove(name),
  })

  // Adding lines below will delete all data for a family member. Without them, their name is deleted and doesn't appear to the user but their data will still remain incase the member is restored or created again.
  // choresRef.update({
  //   [name]: firebase.firestore.FieldValue.delete(),
  // })
  // goalsRef.update({
  //   [name]: firebase.firestore.FieldValue.delete(),
  // })
  // earningsRef.update({
  //   [name]: firebase.firestore.FieldValue.delete(),
  // })
  return
}

export const createAllowance = async (member, value = 0, userId = getCurrentUserInfo().uid) => {
  if (member === isNaN || member === null || typeof member === "number") {
    return console.error("Must provide string value for first argument")
  }
  const conversionRate = await getConversionRate()
  let currentTotal = convertPointsToDollars(Number(value), conversionRate)

  const userRef = db.collection("users").doc(userId)
  const earnings = userRef.collection("earnings")
  earnings.doc("earnings").set(
    {
      [member]: {
        currentTotal: currentTotal,
        lifetimeTotal: currentTotal,
      },
    },
    { merge: true }
  )
  return console.log("created allowance")
}

export const updateLifetimeTotal = async (member, value) => {
  try {
    const conversionRate = getConversionRate()
    let newLifetimeTotal = convertPointsToDollars(Number(value), conversionRate)
    let uid = getCurrentUserInfo().uid
    const userRef = await db.collection("users").doc(uid)
    const earnings = await userRef.collection("earnings")
    earnings.doc("earnings").update({
      [`${member}.lifetimeTotal`]: newLifetimeTotal,
    })
  } catch (error) {
    alert(error)
  }
}

export const updateAllowance = async (member, value = 0, userId = getCurrentUserInfo().uid) => {
  if (member === isNaN || member === null || typeof member === "number") {
    return console.error("Must provide string value for first argument")
  }
  if (value === isNaN) {
    return console.error("value isNaN")
  }

  const conversionRate = getConversionRate()
  let newTotal = convertPointsToDollars(Number(value), conversionRate)
  let lifetimeTotal = Number(newTotal)
  const allowanceExists = await getAllowances()

  // if an allowance exists and family member exists w/ value greater than zero, add to total.
  if (allowanceExists) {
    if (allowanceExists[member]?.currentTotal) {
      let currentTotal = convertPointsToDollars(Number(allowanceExists[member].currentTotal), conversionRate)
      lifetimeTotal = newTotal <= 0 ? convertPointsToDollars(Number(allowanceExists[member].lifetimeTotal), conversionRate) : convertPointsToDollars(Number(allowanceExists[member].lifetimeTotal), conversionRate) + newTotal
      newTotal += currentTotal // old allowance
    }
  } else {
    console.log(`Allowance doesn't exist yet for ${member}.`)
  }
  const userRef = db.collection("users").doc(userId)
  const earnings = userRef.collection("earnings")
  const setEarnings = await earnings.doc("earnings").set(
    {
      [member]: {
        currentTotal: newTotal,
        lifetimeTotal: lifetimeTotal,
      },
    },
    { merge: true }
  )
  return console.log(setEarnings)
}

export const updateAllowanceBarColor = async (member, colorString, userId = getCurrentUserInfo().uid) => {
  if (member === isNaN || member === null || typeof member === "number") {
    return console.error("Must provide string value of active member for first argument")
  }
  if (colorString === isNaN || colorString === null || typeof colorString === "number") {
    return console.error("Must provide string value of color for second argument")
  }
  const userRef = db.collection("users").doc(userId)
  const earnings = userRef.collection("earnings")
  earnings.doc("earnings").set(
    {
      [member]: {
        color: colorString,
      },
    },
    { merge: true }
  )
  return console.log(`updated bar color for ${member}.`)
}

export const updateAttitudeValues = async (goodAttitudeValue, badAttitudeValue) => {
  const conversionRate = getConversionRate()
  let goodAttitudeDollarValue = Number(convertPointsToDollars(goodAttitudeValue, conversionRate))
  let badAttitudeDollarValue = Number(convertPointsToDollars(badAttitudeValue, conversionRate))

  try {
    const userId = getCurrentUserInfo().uid
    const userRef = db.collection("users").doc(userId)
    userRef.set({ goodAttitudeDollarValue, badAttitudeDollarValue }, { merge: true })
    return "success"
  } catch (error) {
    alert(error)
  }
}

export const getAllowances = async () => {
  let uid = ""
  if (!uid) {
    try {
      uid = await getCurrentUserInfo().uid
    } catch (err) {
      console.log("error getting uid", err)
    }
  }
  let conversionRate = getConversionRate()
  const userRef = db.collection("users")
  const snapshot = await userRef.doc(`${uid}`).collection("earnings").doc("earnings").get()
  let earningsObj = snapshot.data()
  if (earningsObj && store.getState().user.pointsType.type !== "money") {
    Object.keys(earningsObj).forEach((key) => {
      earningsObj[key].currentTotal = convertDollarsToPoints(earningsObj[key].currentTotal, conversionRate)
      earningsObj[key].lifetimeTotal = convertDollarsToPoints(earningsObj[key].lifetimeTotal, conversionRate)
    })
  }
  return earningsObj
}

export const deleteAllowance = async (member) => {
  let uid = ""
  if (!uid) {
    try {
      uid = await getCurrentUserInfo().uid
    } catch (err) {
      console.log("error getting uid", err)
    }
  }
  const userRef = await db.collection("users")
  const snapshot = await userRef.doc(`${uid}`).collection("earnings").doc("earnings")
  snapshot.update({
    [member]: firebase.firestore.FieldValue.delete(),
  })
}

export const updatePointsType = async (pointsType) => {
  try {
    const userId = getCurrentUserInfo().uid
    const userRef = db.collection("users").doc(userId)
    userRef.set({ pointsType }, { merge: true })
    return "success"
  } catch (error) {
    alert(error)
  }
}

export const getPointsType = async () => {
  try {
    const uid = getCurrentUserInfo().uid
    const userRef = db.collection("users")
    const snapshot = await userRef.doc(`${uid}`).get()
    return snapshot.data().pointsType
  } catch (error) {
    alert(error)
  }
}

export const updateGoal = async (member, goalName = "", goalValue = 0, userId = getCurrentUserInfo().uid) => {
  const conversionRate = getConversionRate()
  const goalDollarValue = convertPointsToDollars(Number(goalValue), conversionRate)
  const userRef = db.collection("users").doc(userId)
  const earnings = userRef.collection("goals")
  earnings.doc("goals").set(
    {
      [member]: {
        goal: goalName,
        value: goalDollarValue,
      },
    },
    { merge: true }
  )
}

export const getGoals = async () => {
  const uid = getCurrentUserInfo().uid
  const userRef = await db.collection("users")
  const snapshot = await userRef.doc(`${uid}`).collection("goals").doc("goals").get()
  const goalsObj = await snapshot.data()
  if (goalsObj && store.getState().allowance.pointsType.type !== "money") {
    Object.keys(goalsObj).forEach((key) => {
      goalsObj[key].value = convertDollarsToPoints(goalsObj[key].value, getConversionRate())
    })
  }
  return goalsObj
}

export const deleteGoal = async (member, goal, userId = getCurrentUserInfo().uid) => {
  const userRef = await db.collection("users").doc(userId)
  const earnings = await userRef.collection("goals")
  earnings.doc("goals").update({
    [`${member}.${goal}`]: firebase.firestore.FieldValue.delete(),
  })
}

export const getStoreItems = async () => {
  const userId = getCurrentUserInfo().uid
  const userDataRef = await db.collection("users").doc(`${userId}`)
  const snapshot = await userDataRef.get()
  let storeItems = snapshot.data().storeItems
  if (store.getState().user.pointsType?.type !== "money") {
    Object.keys(storeItems).forEach((key) => {
      storeItems[key].itemPrice = convertDollarsToPoints(storeItems[key].itemPrice, getConversionRate())
    })
  }
  return storeItems
}

export const updateStoreItems = async (storeItem) => {
  const { itemId, itemName, itemPrice: itemPrice, itemDescription: description = "", itemLink: link = "", itemImageUrl: itemImageUrl = "", lastPurchasedBy: lastPurchasedBy = "", purchasedOn: purchasedOn = "" } = storeItem

  const date = new Date()
  const dateString = date.toISOString()
  const userId = getCurrentUserInfo().uid
  const conversionRate = await getConversionRate()
  const dollarValue = convertPointsToDollars(Number(itemPrice), conversionRate)
  const userDataRef = db.collection("users").doc(`${userId}`)
  try {
    userDataRef.update({
      [`storeItems.${itemId}`]: {
        createdAt: dateString,
        itemName: itemName,
        itemPrice: dollarValue,
        itemLink: link,
        itemId: itemId,
        itemDescription: description,
        itemImageUrl: itemImageUrl,
        lastPurchasedBy: lastPurchasedBy,
        purchasedOn: purchasedOn,
      },
    })
    return "success"
  } catch (error) {
    console.error(error)
    alert(error.message)
    return error
  }
}

export const deleteStoreItem = async (itemId) => {
  const userId = getCurrentUserInfo().uid
  const userDataRef = db.collection("users").doc(`${userId}`)
  try {
    userDataRef.update({
      [`storeItems.${itemId}`]: firebase.firestore.FieldValue.delete(),
    })
    return "success"
  } catch (error) {
    return error
  }
}

// not currently used
export const queryChores = async (member) => {
  const choresCompletedMember = []
  const userId = getCurrentUserInfo().uid
  const userRef = await db.collection("users")
  const snapshot = await userRef.doc(`${userId}`).get()
  const chores = await snapshot.data().chores
  const filteredChores = Object.keys(chores)
  filteredChores.forEach((chore) => {
    if (chores[chore].completedBy === member) {
      choresCompletedMember.push({ [chore]: chores[chore] })
    }
  })
  return choresCompletedMember
}

