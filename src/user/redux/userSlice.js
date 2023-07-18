import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getListAsync = createAsyncThunk(
    "user/getListAsync",
    async (searchText, { dispatch, getState }) => {
        try {
            // dispatch(loadingTrue());
            let { skip, limit } = getState().user;
            const response = await axios.get(
                `http://localhost:3301/api/admin/user/getList?skip=${skip}&limit=${limit}&search=${searchText}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.code === 200) {
                console.log(response.data.message);
                return response.data.data;
            } else {
                console.error(response.data.message);
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.error(error.response.data.message);
            throw error.response.data.message;
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoading: false,
        isReloadTable: false,
        searchText: "",
        skip: 0,
        limit: 10,
        userList: {},
    },
    reducers: {
        //     loadingTrue: (state) => {
        //         state.isLoading = true;
        //     },
        //     loadingFalse: (state) => {
        //         state.isLoading = false;
        //     },
        setUserBatchNumber: (state, action) => {
            state.skip = action.payload;
            state.isReloadTable = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListAsync.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(getListAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userList = action.payload;
            })
            .addCase(getListAsync.rejected, (state) => {
                state.isLoading = false;
                state.userList = {};
            });
    },
});

export const { loadingTrue, loadingFalse, setUserBatchNumber } = userSlice.actions;
export default userSlice.reducer;
