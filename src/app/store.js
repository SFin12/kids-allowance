import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import choresReducer from "../features/chores/choresSlice";
import allowanceReducer from "../features/allowance/allowanceSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        chores: choresReducer,
        allowance: allowanceReducer,
    },
});
