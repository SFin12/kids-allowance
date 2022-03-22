import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    email: null,
    image: null,
    id: null,
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
    },
});

export const { setActiveUser, setUserLogout } = userSlice.actions;

export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserId = (state) => state.user.id;
export const selectUserImage = (state) => state.user.image;

export default userSlice.reducer;
