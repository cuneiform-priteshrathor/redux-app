import React from 'react'
// import { TextField, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { matchAsync } from '../redux/matchApi';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import { shallowEqual, useSelector } from "react-redux";
const MatchData = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthorized = useSelector((state) => state.auth, shallowEqual);
    const initialValues = {
        email: "",
        password: "",
    };
    const loginSchema = Yup.object({
        email: Yup.string()
            .trim()
            .matches(/^[A-Za-z\d._+-]{2,26}@[A-Za-z\d-]{1,256}\.[A-Za-z\d]+(\.[A-Za-z\d]+)?$/, "Enter valid email")
            .required("Email Id is required"),
        password: Yup.string()
            .trim()
            .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!-_.@#$%^&*]{7,15}$/, "Please enter valid password")
            .min(8, "Please enter valid password")
            .max(15, "Please enter valid password")
            .required("Password is required")
    });

    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            let data = values;
            let loginResponse = await dispatch(matchAsync(data));
            if (loginResponse?.payload?.code === 200) {
                formik.resetForm();
            }

        },
    });

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '90px' }}>

                <form onSubmit={formik.handleSubmit} style={{ display: "flex" }}>

                    <table>
                        <tr><td>Email</td><td>    <input type="email" label="Email" name="email"
                            {...formik.getFieldProps("email")} />
                            {formik.errors.email && formik.touched.email ? (
                                <p style={{ fontSize: "10px", color: "red", marginBottom: "1vh" }} className="form-error">{formik.errors.email}</p>
                            ) : null}</td></tr>
                        <tr><td>password</td><td><input type="password" label="Password" name="password"
                            {...formik.getFieldProps("password")} />
                            {formik.errors.password && formik.touched.password ? (
                                <p style={{ fontSize: "10px", color: "red", marginBottom: "1vh" }} className="form-error">{formik.errors.password}</p>
                            ) : null}</td></tr>
                        <tr><td></td><td>
                            <button type="submit">
                                Test
                            </button>
                        </td></tr>
                        <tr><td>Status</td><td> {!isAuthorized ? ('Unauthorize') : <Link to="/user">User</Link>}</td></tr>


                    </table >
                </form>
            </div>
        </>
    )
}

export default MatchData
