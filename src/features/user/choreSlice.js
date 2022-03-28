import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    email: null,
    image: null,
    id: null,
};

export const choreSlice = createSlice({
    name: "chore",
    initialState,

    reducers: {
        setChore: (state, action) => {
            state.chore = state.chore.push(action.payload.chore);
        },
        deleteChore: (state, action) => {
            state.chore = null;
        },
    },
});

export const { setChore, deleteChore } = choreSlice.actions;

export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserId = (state) => state.user.id;
export const selectUserImage = (state) => state.user.image;

export default choreSlice.reducer;
