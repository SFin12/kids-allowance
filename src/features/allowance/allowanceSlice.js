import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    earnings: {},
    goals: {},
    choresStats: {},
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
        setChoresStats: (state, action) => {
            state.choresStats = { ...state.choresStats, ...action.payload };
        },
    },
});

export const { setAllowance, setGoal, setChoresStats } = allowanceSlice.actions;

export const selectAllowance = (state) => state.allowance.earnings;
export const selectGoals = (state) => state.allowance.goals;
export const selectChoresStats = (state) => state.allowance.choresStats;

export default allowanceSlice.reducer;
