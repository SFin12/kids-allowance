import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    email: null,
    image: null,
    id: null,
    familyMembers: null,
    activeFamilyMember: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {
        setActiveUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.image = action.payload.image;
        },
        setUserLogout: (state) => {
            state.name = null;
            state.email = null;
            state.id = null;
            state.image = null;
        },
        setFamilyMembers: (state, action) => {
            state.familyMembers = action.payload.familyMembers;
        },

        setActiveFamilyMember: (state, action) => {
            state.activeFamilyMember = action.payload.activeFamilyMember;
        },
    },
});

export const {
    setActiveUser,
    setUserLogout,
    setFamilyMembers,
    setActiveFamilyMember,
} = userSlice.actions;

export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserId = (state) => state.user.id;
export const selectUserImage = (state) => state.user.image;
export const selectFamilyMembers = (state) => state.user.familyMembers;
export const selectActiveFamilyMember = (state) =>
    state.user.activeFamilyMember;

export default userSlice.reducer;
