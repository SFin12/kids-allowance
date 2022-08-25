import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    earnings: {},
    goals: {},
    choresStats: {},
    pointsType: "",
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
        setPointsType: (state, action) => {
          state.pointsType = action.payload // payload should be a string with "stars" , "tickets", or "points"
        }
    },
});

export const { setAllowance, setGoal, setChoresStats, setPointsType } = allowanceSlice.actions;

export const selectAllowance = (state) => state.allowance.earnings;
export const selectGoals = (state) => state.allowance.goals;
export const selectChoresStats = (state) => state.allowance.choresStats;
export const selectPointsType = (state) => state.allowance.pointsType;

export default allowanceSlice.reducer;
