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
            state.img = action.payload.img;
        },
        setUserLogout: (state) => {
            state.name = null;
            state.email = null;
            state.id = null;
            state.img = null;
        },
    },
});

export const { setActiveUser, setUserLogout } = userSlice.actions;

export const selectUserName = (state) => state.name;
export const selectUserEmail = (state) => state.email;
export const selectUserId = (state) => state.id;
export const selectUserImage = (state) => state.img;

export default userSlice.reducer;
