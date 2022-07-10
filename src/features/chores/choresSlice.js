import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    choresStats: {},
};

export const choresSlice = createSlice({
    name: "chores",
    initialState,

    reducers: {
        setChores: (state, action) => {
            return action.payload;
        },
        // shoes flipped or non-flipped card. If flipped back to non-complete, completedBy and datCompleted are set to "".
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
