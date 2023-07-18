import axios from "axios";
import { loadingTrue, loadingFalse, getAdminList, getAdminDetail } from "./adminSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOptions } from "utils";

export const getListAsync = (searchText) => {
    return async (dispatch, getState) => {
        try {
            dispatch(loadingTrue());
            let { skip, limit } = getState().admin;
            const response = await axios({
                method: "GET",
                url: `${process.env.REACT_APP_AUTH_URL}/admin/getList?skip=${skip}&limit=${limit}&search=${searchText}`,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data.code === 200) {
                return (
                    dispatch(getAdminList(response.data.data)),
                    dispatch(loadingFalse())
                )
            } else {
                return (
                    dispatch(loadingFalse())
                )
            }
        } catch (error) {
            return (
                toast.error(error.response.data.message, toastOptions),
                dispatch(loadingFalse())
            )
        }
    };
};
export const createAdminAsync = (adminData) => {
    return async (dispatch, getState) => {
        try {
            dispatch(loadingTrue());
            let response = await axios({
                url: `${process.env.REACT_APP_AUTH_URL}/admin/createAdmin`,
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                data: adminData,
            });
            if (response.data.code === 200) {
                toast.success(response.data.message, toastOptions);
                dispatch(loadingFalse());
                return response
            } else {
                return (
                    toast.error(response.data.message, toastOptions),
                    dispatch(loadingFalse())
                )
            }
        } catch (error) {
            return (
                toast.error(error.response.data.message, toastOptions),
                dispatch(loadingFalse())
            )
        }
    };
};

export const getAdminDetailAsync = (adminId) => {
    return async (dispatch) => {
        try {
            dispatch(loadingTrue());
            const response = await axios({
                method: "Get",
                url: `${process.env.REACT_APP_AUTH_URL}/admin/getDetail/${adminId}`,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.data.code === 200) {
                dispatch(loadingFalse());
                dispatch(getAdminDetail(response.data.data))
                return response
            } else {
                return (
                    toast.error(response.data.message, toastOptions),
                    dispatch(loadingFalse())
                )
            }
        } catch (error) {
            return (
                toast.error(error.response.data.message, toastOptions),
                dispatch(loadingFalse())
            )
        }
    };
};

export const updateAdminAsync = (values, adminId) => {
    return async (dispatch) => {
        try {
            dispatch(loadingTrue());
            const response = await axios({
                method: "POST",
                url: `${process.env.REACT_APP_AUTH_URL}/admin/updateDetail/${adminId}`,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: values,
            });
            if (response.data.code === 200) {
                toast.success(response.data.message, toastOptions);
                dispatch(loadingFalse());
                return response
            } else {
                return (

                    toast.error(response.data.message, toastOptions),
                    dispatch(loadingFalse())
                )
            }
        } catch (error) {
            return (
                toast.error(error.response.data.message, toastOptions),
                dispatch(loadingFalse())
            )
        }
    };
};

export const deleteAdminAsync = (adminId) => {
    return async (dispatch) => {
        try {
            dispatch(loadingTrue());
            const response = await axios({
                method: "DELETE",
                url: `${process.env.REACT_APP_AUTH_URL}/admin/deleteDetail/${adminId}`,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.data.code === 200) {
                toast.success(response.data.message, toastOptions);
                dispatch(loadingFalse());
                return response
            } else {
                return (

                    toast.error(response.data.message, toastOptions),
                    dispatch(loadingFalse())
                )
            }
        } catch (error) {
            return (
                toast.error(error.response.data.message, toastOptions),
                dispatch(loadingFalse())
            )
        }
    };
};




