import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  image: null,
  id: null,
  familyMembers: null,
  activeFamilyMember: null,
  tutorialOn: false,
  logins: 0,
  pointsType: {},
  storeItems: {},
}

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setActiveUser: (state, action) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.id = action.payload.id
      state.image = action.payload.image
    },
    setUserLogout: (state) => {
      state.name = null
      state.email = null
      state.id = null
      state.image = null
      state.logins = null
      state.pointsType = null
    },
    setFamilyMembers: (state, action) => {
      state.familyMembers = action.payload.familyMembers
    },

    setActiveFamilyMember: (state, action) => {
      state.activeFamilyMember = action.payload.activeFamilyMember
    },

    setLogins: (state, action) => {
      state.logins = action.payload // number
    },
    setPointsType: (state, action) => {
      state.pointsType = action.payload // payload should be an object with  type: "stars" , "tickets", or "points",  icon: ⭐️,  🎟, 💵, conversionRate: float
    },
    setTutorialOn: (state, action) => {
      state.tutorialOn = action.payload // true or false
    },
    setStoreItems: (state, action) => {
      state.storeItems = { ...state.storeItems, ...action.payload } // array of objects
    },
    deleteReduxStoreItem: (state, action) => {
      delete state.storeItems[action.payload]
      state.storeItems = { ...state.storeItems }
    },
  },
})

export const { setActiveUser, setUserLogout, setFamilyMembers, setActiveFamilyMember, tutorial, setLogins, setPointsType, setTutorialOn, setStoreItems, deleteReduxStoreItem } = userSlice.actions

export const selectUserName = (state) => state.user.name
export const selectUserEmail = (state) => state.user.email
export const selectUserId = (state) => state.user.id
export const selectUserImage = (state) => state.user.image
export const selectFamilyMembers = (state) => state.user.familyMembers
export const selectActiveFamilyMember = (state) => state.user.activeFamilyMember
// export const selectTutorial = (state) => state.user.tutorial
export const selectLogins = (state) => state.user.logins
export const selectPointsType = (state) => state.user.pointsType
export const selectTutorialOn = (state) => state.user.tutorialOn
export const selectStoreItems = (state) => state.user.storeItems

export default userSlice.reducer;
