// // import axios from "axios";
// // import { loadingTrue, loadingFalse, getUserList } from "./userSlice";

// // export const getListAsync = (searchText) => {
// //     return async (dispatch, getState) => {
// //         try {
// //             dispatch(loadingTrue);
// //             let { skip, limit } = getState().user;
// //             const response = await axios({
// //                 method: "GET",
// //                 url: `http://localhost:3301/api/admin/user/getList?skip=${skip}&limit=${limit}&search=${searchText}`,
// //                 headers: {
// //                     "Content-Type": "application/json",
// //                 },
// //             });

// //             if (response.data.code === 200) {
// //                 console.log(response.data.message);
// //                 return (
// //                     dispatch(getUserList(response.data.data)),
// //                     dispatch(loadingFalse)
// //                 )
// //             } else {
// //                 return (
// //                     console.error(response.data.message),
// //                     dispatch(loadingFalse)
// //                 )
// //             }
// //         } catch (error) {
// //             return (
// //                 console.error(error.response.data.message),
// //                 dispatch(loadingFalse)
// //             )
// //         }
// //     };
// // };


// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { loadingTrue, loadingFalse, getUserList } from "./userSlice";

// export const getListAsync = createAsyncThunk(
//     "user/getList",
//     async (searchText, { dispatch, getState }) => {
//         try {
//             dispatch(loadingTrue());
//             let { skip, limit } = getState().user;
//             const response = await axios({
//                 method: "GET",
//                 url: `http://localhost:3301/api/admin/user/getList?skip=${skip}&limit=${limit}&search=${searchText}`,
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (response.data.code === 200) {
//                 console.log(response.data.message);
//                 dispatch(getUserList(response.data.data));
//                 dispatch(loadingFalse());
//             } else {
//                 console.error(response.data.message);
//                 dispatch(loadingFalse());
//             }
//         } catch (error) {
//             console.error(error.response.data.message);
//             dispatch(loadingFalse());
//         }
//     }
// );