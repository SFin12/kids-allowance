import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const choresSlice = createSlice({
    name: "chores",
    initialState,

    reducers: {
        setChores: (state, action) => {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
        updateChore: (state, action) => {
            state[action.payload.chore] = {
                value: action.payload.value,
                completedBy: action.payload.completedBy,
                dateCompleted: action.payload.dateCompleted,
            };
        },
    },
});

export const { setChores, updateChore } = choresSlice.actions;

export const selectChores = (state) => state.chores;

export default choresSlice.reducer;
