import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    earnings: {},
    goals: {},
};

export const allowanceSlice = createSlice({
    name: "allowance",
    initialState,

    reducers: {
        setAllowance: (state, action) => {
            state.earnings = { ...state.earnings, ...action.payload };
        },
        setGoal: (state, action) => {
            state.goals = { ...state.goals, ...action.payload };
        },
    },
});

export const { setAllowance, setGoal } = allowanceSlice.actions;

export const selectAllowance = (state) => state.allowance.earnings;
export const selectGoals = (state) => state.allowance.goals;

export default allowanceSlice.reducer;
