import React from 'react';
import { useState, useEffect } from 'react';
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Table } from 'react-bootstrap';
import BasicPagination from 'modules/BasicPagination';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getListAsync, deleteAdminAsync } from '../redux/adminApi';
import { setAdminBatchNumber } from "../redux/adminSlice";

// Material Dashboard 2 React components
import MDBox from "materialUi/components/MDBox";
import MDTypography from "materialUi/components/MDTypography";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { searchTextChange } from '../redux/adminSlice';
const Admin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isDialog, setIsDialog] = useState(false)
    const [isAdminDeleteId, setIsAdminDeleteId] = useState('')

    const { adminList, skip, limit, isLoading, searchText, isReloadTable, } = useSelector((state) => state.admin, shallowEqual);

    const onPageChange = (currentBatch) => {
        let count = currentBatch ? currentBatch - 1 : skip;
        dispatch(setAdminBatchNumber(count))
    };

    useEffect(() => {
        dispatch(getListAsync(searchText));
    }, [dispatch, isReloadTable, searchText, skip, limit]);


    const onEditClick = (admin) => {
        navigate(`/admin-management/edit-admin/${admin?._id}`);
    };
    const handleOpenDialogBox = (id) => {
        setIsAdminDeleteId(id);
        setIsDialog(true)

    }
    const hadnleCloseDialog = () => {
        setIsDialog(false)
        setIsAdminDeleteId('id');
    }
    const handleSubmitDialog = () => {
        dispatch(deleteAdminAsync(isAdminDeleteId));
        setIsDialog(false);
        dispatch(getListAsync(searchText));
    }
    const onSearchTextChange = (e) => {
        dispatch(searchTextChange(e.target.value));
    };


    return (
        <>
            <MDBox pt={2} pb={1}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={1}
                                mt={-3}
                                py={2}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                                className="Md_Box_Div"
                            >
                                <MDTypography variant="h6" color="white" >   Admin Management      </MDTypography>
                                <div className='Title_Search_div'>
                                    <div className="form-group mr-5 mb-1 mt-2">
                                        <button className="btn_new btn-sm create_btn" type="button"
                                            onClick={() => navigate("/admin-management/add-admin")}> Create Admin  </button>
                                    </div>
                                    <form className="subheader_filter"          >
                                        <div className="form-row">
                                            <div className="form-group mr-3 mb-1">
                                                <input name="Search" placeholder="Search. . ." type="text" className="form-control"
                                                    value={searchText}
                                                    autoComplete="off"
                                                    onChange={onSearchTextChange} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </MDBox>
                            <div className='tableData' id='specific-scrollbar'>
                                <Table hover className="mb-0 default_table with_hoverbtn mrpdng_tbl">
                                    <thead>
                                        <tr className='Head_Row' >
                                            <th className='thText'>Sr No.</th>
                                            <th className='thText'>Authors</th>
                                            <th className='thText'>Status</th>
                                            <th className='thText'>Created At</th>
                                            <th className='thText' >Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {adminList.records && adminList.records.length ? (
                                            adminList.records.map((adminDetail, index) => (

                                                <tr key={index}>
                                                    <td>
                                                        <span className='srText FontTableData'>
                                                            {skip * limit + (index + 1)}
                                                        </span>
                                                    </td>
                                                    <td className='boxForProfile'>
                                                        <div className='BoxImgName' >
                                                            <span className='imgBox'>
                                                                <img className="tableViewImage mr-1" src={adminDetail.profilePicture} alt="profilePicture" />
                                                            </span>
                                                            <div className='nameEmailBox'>
                                                                <span className="f-w-600 name-table">{adminDetail?.name ? adminDetail.name : "-"}</span>
                                                                <span className="f-w-600 email-table">{adminDetail?.email ? adminDetail.email : "-"}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td >

                                                        <span className={adminDetail?.status === "Inactive" ? "css_inactive f-w-500" : "css_active f-w-500"}>{adminDetail?.status ? adminDetail.status : "-"}</span>
                                                    </td>
                                                    <td >
                                                        <div className='DateTimeFormate'>

                                                            <span className="f-w-600 FontTableData DateTimeFormateFirst">
                                                                {adminDetail?.createdAt ? new Date(adminDetail.createdAt).toLocaleDateString() : "-"}
                                                            </span>
                                                            <span className="f-w-600 FontTableData DateTimeFormateSecond">
                                                                {adminDetail?.createdAt ? new Date(adminDetail.createdAt).toLocaleTimeString() : "-"}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className='actionBox'>
                                                            <div className='actionBoxChild' onClick={() => onEditClick(adminDetail)}>
                                                                <span className="material-icons editIcon">edit</span>
                                                                <span className='editBtnText'>Edit</span>
                                                            </div>
                                                            <div className='actionBoxChild' onClick={() => handleOpenDialogBox(adminDetail._id)}>
                                                                <span className="material-icons deleteIcon"> delete </span>
                                                                <span className='deleteBtnText'>Delete</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={7} className="text-center">
                                                    <span className='record_not_found'>
                                                        No Record Found
                                                    </span>
                                                </td>
                                            </tr>
                                        )}
                                        {isLoading && (
                                            <tr>
                                                <td colSpan={8} className="text-center">
                                                    <div className="basic-verification-loader text-center">
                                                        <CircularProgress color='white' />
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                            <div className={adminList?.recordsTotal > 10 ? 'forSpaceBetween' : "forEndPosition"}  >
                                <BasicPagination totalRecords={adminList && adminList.recordsTotal} limit={limit} batch={skip + 1} onBatchChange={onPageChange} />
                                <div className='displayingRecord'>
                                    Displaying {skip * limit + 1} -{" "} {skip * limit + limit} of{" "} {adminList && adminList.recordsTotal} Records 	&nbsp; 	&nbsp;
                                </div>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox >
            {/* -----------------------Delete Icon Dialog Box -------------------------------- */}
            <Dialog Dialog open={isDialog} onClose={() => hadnleCloseDialog()} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title" className='Dialog_Title'>
                    Delete
                </DialogTitle>
                <DialogContent >
                    <p className='Dialog_Content' >  Are you sure want you to delete?</p>
                </DialogContent>
                <DialogActions className='Dialog_Action_Box'>
                    <button className='Common_Close_Button' autoFocus onClick={() => hadnleCloseDialog()}>
                        Keep
                    </button>
                    <button className='Common_Submit_Button' onClick={() => handleSubmitDialog()} autoFocus>
                        Delete
                    </button>
                </DialogActions>
            </Dialog >
        </>
    )
}

export default Admin

