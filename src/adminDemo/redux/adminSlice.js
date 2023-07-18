import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        isLoading: false,
        isReloadTable: false,
        searchText: "",
        skip: 0,
        limit: 10,
        adminList: {},
        adminDetail: {},

        refreshSubAdminList: true,
        searchBy: "",
        searchStatus: "",
        subAdminSkip: 0,
        subAdminLimit: 10,
        column: "",
        dir: "",
        selectedSubAdmin: {},
        createSubAdminModal: false,
        rolePermissionList: {},
    },

    reducers: {
        loadingTrue: (state) =>
        (state = {
            ...state,
            isLoading: true,
        }),
        loadingFalse: (state) =>
        (state = {
            ...state,
            isLoading: false,
        }),
        getAdminList: (state, action) =>
        (state = {
            ...state,
            adminList: action.payload,
        }),
        setAdminBatchNumber: (state, action) =>
        (state = {
            ...state,
            skip: action.payload,
            isReloadTable: true,
        }),
        getAdminDetail: (state, action) =>
        (state = {
            ...state,
            adminDetail: action.payload,
        }),
        searchTextChange: (state, action) =>
        (state = {
            ...state,
            searchText: action.payload,
        }),
    },
});

export const {
    loadingTrue,
    loadingFalse,
    getAdminList,
    setAdminBatchNumber,
    getAdminDetail,
    searchTextChange
} = adminSlice.actions;
export default adminSlice.reducer;
