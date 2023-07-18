import { createSlice } from "@reduxjs/toolkit";

const matchSlice = createSlice({
    name: "auth",
    initialState: null,
    reducers: {
        match: (state, action) => state = action.payload.data.accessToken,
    }
})

export const { match } = matchSlice.actions;
export default matchSlice.reducer;