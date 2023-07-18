import { combineReducers } from "@reduxjs/toolkit";

import matchSlice from "../authentication/redux/matchSlice";
import userSlice from "../user/redux/userSlice";
export const rootReducer = combineReducers({
    auth: matchSlice,
    user: userSlice,
});