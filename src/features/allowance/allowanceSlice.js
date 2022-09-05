import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    earnings: {},
    goals: {},
    choresStats: {},
    pointsType: {},
    conversionRate: .05,
    goodAttitudeValue: 0,
    badAttitudeValue: 0,
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
          state.pointsType = action.payload // payload should be an object with  type: "stars" , "tickets", or "points" and icon: ⭐️,  🎟, 💵
        },
        setGoodAttitudeValue: (state, action) => {
          state.goodAttitudeValue = action.payload // bonus value added to chore when completed with a good attitude.
        },
        setBadAttitudeValue: (state, action) => {
          state.badAttitudeValue = action.payload // reduction in stars when completing a chore witha bad attitude.
        },
        setConversionRate: (state, action) => {
          state.conversionRate = action.payload // decimal number to convert points to dollars and cents.
        }
    },
});

export const { setAllowance, setGoal, setChoresStats, setPointsType, setGoodAttitudeValue, setBadAttitudeValue } = allowanceSlice.actions;

export const selectAllowance = (state) => state.allowance.earnings;
export const selectGoals = (state) => state.allowance.goals;
export const selectChoresStats = (state) => state.allowance.choresStats;
export const selectPointsType = (state) => state.allowance.pointsType;
export const selectGoodAttitudeValue = (state) => state.allowance.goodAttitudeValue;
export const selectBadAttitudeValue = (state) => state.allowance.badAttitudeValue;
export const selectConversionRate = (state) => state.allowance.conversionRate;

export default allowanceSlice.reducer;
