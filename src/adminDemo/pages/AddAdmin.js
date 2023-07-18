import React from "react";
import { useRef, useEffect, useState } from "react";
import { Icon } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { TextField, Select, InputLabel, MenuItem, FormControl } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import MDBox from "materialUi/components/MDBox";
import MDTypography from "materialUi/components/MDTypography";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createAdminAsync } from "../redux/adminApi";
import { useParams } from "react-router-dom";
import { getAdminDetailAsync, updateAdminAsync } from "../redux/adminApi";
import { useSelector, shallowEqual } from "react-redux";
import { CircularProgress } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { emailRegEx, passwordRegEx } from '../../../utils/RegEx';
const AddAdmin = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();
    const inputFile_1 = useRef(null);
    const dispatch = useDispatch();
    const params = useParams()

    useEffect(() => {
        if (params?.id) {
            dispatch(getAdminDetailAsync(params.id));
        }
    }, [dispatch, params.id]);
    const { adminDetail, isLoading } = useSelector((state) => state.admin, shallowEqual);

    const initialValues = {
        name: adminDetail?.name && params.id ? adminDetail.name : "",
        username: adminDetail?.username && params.id ? adminDetail.username : "",
        email: adminDetail?.email && params.id ? adminDetail.email : "",
        password: "",
        status: adminDetail?.status && params.id ? adminDetail.status : "Active",
        profilePicture: adminDetail?.profilePicture && params.id ? adminDetail.profilePicture : "",

    };
    const adminSchema = () =>
        Yup.object().shape({
            name: Yup.string()
                .trim()
                .notOneOf(["null", "NULL", "Null", "Undefined", "undefined"], "Please enter valid name ")
                .required("Please enter name"),
            email: Yup.string()
                .trim()
                .matches(emailRegEx, "Enter valid email")

                .required("Email Id is required"),
            password: Yup.string()
                .trim()
                .matches(passwordRegEx, 'Password is not valid')
                .required("Password Id is required"),
            status: Yup.string()
                .trim()
                .notOneOf(["null", "NULL", "Null", "Undefined", "undefined", "None"], "Status is required")
                .required("Status is required"),
            profilePicture: Yup.string().trim().required("image required"),
        });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: adminSchema,
        onSubmit: async (values) => {

            let data = {
                name: values.name,
                username: values.name,
                password: values.password,
                email: values.email,
                status: values.status,
                profilePicture: values.profilePicture,
            }
            if (params.id) {
                let responseUpdateApi = await dispatch(updateAdminAsync(data, params.id))
                if (responseUpdateApi.data.code === 200) {
                    navigate('/admin-management');
                }
            } else {
                let responseApi = await dispatch(createAdminAsync(data))
                if (responseApi.data.code === 200) {
                    navigate('/admin-management');
                }
            }


        },
    });
    return (
        <MDBox pt={6} pb={3}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <MDBox
                            mx={2}
                            mt={-3}
                            py={3}
                            px={2}
                            variant="gradient"
                            bgColor="info"
                            borderRadius="lg"
                            coloredShadow="info"
                            style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "flex-end",
                            }}>
                            <Icon sx={{ fontSize: "30px !important", cursor: "pointer", color: "white !important", marginRight: "10px" }}
                                onClick={() => navigate('/admin-management')}> west </Icon>
                            <MDTypography variant="h6" color="white">
                                Admin Management
                            </MDTypography>
                        </MDBox>
                        {isLoading && (
                            <div className="basic-verification-loader text-center">
                                <CircularProgress color="white" />
                            </div>
                        )}
                        <MDBox pt={3}>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="Create_Admin_Layout">
                                    <div className="Profile_Div"
                                        onClick={() => inputFile_1.current.click()}
                                        style={{
                                            background: `${typeof formik.values.profilePicture === typeof '' ? (
                                                formik.values.profilePicture
                                                    ? `url(${formik.values.profilePicture})`
                                                    : "url(https://www.transparentpng.com/thumb/user/blue-male-user-profile-transparent-png-2lbgMx.png)"
                                            ) : (
                                                formik.values.profilePicture
                                                    ? `url(${URL.createObjectURL(
                                                        formik.values.profilePicture
                                                    )})`
                                                    : "url(https://www.transparentpng.com/thumb/user/blue-male-user-profile-transparent-png-2lbgMx.png)"
                                            )}`,
                                        }}>
                                        <input
                                            type="file"
                                            accept=".png, .jpg, .jpeg"
                                            style={{ display: "none" }}
                                            ref={inputFile_1}
                                            name="profilePicture"
                                            id="profilePicture"
                                            onChange={(event) => {
                                                formik.setFieldValue(
                                                    "profilePicture",
                                                    event.currentTarget.files[0]
                                                );
                                            }} />
                                        <span
                                            className="material-icons Profile_Div_EditIcon"> edit</span>
                                        &nbsp;&nbsp;
                                        <span className="Profile_Div_Edit_Span" > EDIT</span>

                                    </div>
                                    {formik.errors.profilePicture &&
                                        formik.touched.profilePicture ? (
                                        <p className="form-error">
                                            {formik.errors.profilePicture}
                                        </p>
                                    ) : null}
                                    <div className="Profile_Div_Fields">
                                        <div className="Profile_Div_Fields_Input">
                                            <div className="Profile_Div_Fields_Actual_Input">
                                                <TextField type="text"
                                                    label="Name" name="name"
                                                    style={{ width: "-webkit-fill-available" }}
                                                    {...formik.getFieldProps("name")}
                                                />
                                                {formik.touched.name && formik.errors.name ? (
                                                    <div className="form-error">{formik.errors.name}</div>
                                                ) : null}
                                            </div>
                                            <div className="Profile_Div_Fields_Actual_Input">
                                                <TextField type="email"
                                                    label="Email" name="email"
                                                    style={{ width: "-webkit-fill-available" }}
                                                    {...formik.getFieldProps("email")} />
                                                {formik.touched.email && formik.errors.email ? (
                                                    <div className="form-error">{formik.errors.email}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="Profile_Div_Fields_Input">
                                            <div className="Profile_Div_Fields_Actual_Input">
                                                <TextField
                                                    type={showPassword ? 'text' : 'password'}
                                                    label="Password"
                                                    name="password"
                                                    style={{ width: '-webkit-fill-available' }}
                                                    {...formik.getFieldProps('password')}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer', fontSize: '20px', color: 'white' }}>
                                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                            </span>
                                                        ),
                                                    }} />
                                                {formik.touched.password && formik.errors.password ? (
                                                    <div className="form-error">{formik.errors.password}</div>
                                                ) : null}
                                            </div>
                                            <div className="Profile_Div_Fields_Actual_Input">
                                                <FormControl sx={{ m: 0, minWidth: 120 }} >

                                                    <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-helper-label"
                                                        id="demo-simple-select-helper"
                                                        value={formik.values.status}
                                                        label="Status"
                                                        name="status"
                                                        onChange={formik.handleChange}
                                                        style={{ height: "44px" }}
                                                    >
                                                        <MenuItem value={"Active"}>Active</MenuItem>
                                                        <MenuItem value={"Inactive"}>In actvie</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                {formik.touched.status && formik.errors.status ? (
                                                    <div className="form-error">{formik.errors.status}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Profile_Div_Actions">
                                        <Button className="Profile_Actions_Close" onClick={() => navigate('/admin-management')}>
                                            Close
                                        </Button>
                                        <Button type="submit" className="Profile_Actions_Submit">
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </form>
                            {/* </div> */}

                        </MDBox>


                    </Card>
                </Grid>
            </Grid>
        </MDBox>
    );
};

export default AddAdmin;
