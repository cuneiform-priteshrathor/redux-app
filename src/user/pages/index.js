import React from 'react';
import { useEffect } from 'react';
import "./style.css";
import { shallowEqual, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getListAsync } from '../redux/userSlice';
import { Table } from 'react-bootstrap';
import BasicPagination from './pagination';
import { setUserBatchNumber } from "../redux/userSlice";
const User = () => {
    const dispatch = useDispatch();

    const { userList, skip, limit, isLoading, searchText, isReloadTable, } = useSelector((state) => state.user, shallowEqual);
    console.log('userList: ', userList);

    const onPageChange = (currentBatch) => {
        let count = currentBatch ? currentBatch - 1 : skip;
        dispatch(setUserBatchNumber(count))
    };
    useEffect(() => {
        dispatch(getListAsync(searchText));
    }, [dispatch, isReloadTable, searchText, skip, limit]);

    return (
        <center>

            <Table style={{ border: "2px solid black" }} hover className="mb-0 default_table with_hoverbtn mrpdng_tbl">
                <thead style={{ border: "2px solid black" }}>
                    <tr style={{ border: "2px solid black" }} className='Head_Row' >
                        <th style={{ border: "2px solid black" }} className='trBodyText thText'>Sr No.</th>
                        <th style={{ border: "2px solid black" }} className='thText'>Profile</th>
                        <th style={{ border: "2px solid black" }} className='thText'>Status</th>
                        <th style={{ border: "2px solid black" }} className='thText'>Created At</th>
                        {/* <th className='thText' >Action</th> */}
                    </tr>
                </thead>
                <tbody style={{ border: "2px solid black" }}>
                    {userList ? (
                        userList.map((userDetail, index) => (

                            <tr style={{ border: "2px solid black" }} key={index}>
                                <td style={{ border: "2px solid black" }} className='trBodyText'>
                                    <span>
                                        {skip * limit + (index + 1)}
                                    </span>
                                </td>
                                <td style={{ border: "2px solid black" }} className='boxForProfile'>
                                    <div className='BoxImgName' >
                                        {/* <span className='imgBox'>
                                            <img className="tableViewImage mr-1" src={userDetail.profilePicture} alt="profilePicture" />
                                        </span> */}
                                        <div className='nameEmailBox'>
                                            <span className="f-w-600 name-table tableFontSize">{userDetail?.name ? userDetail.name : "-"}</span>
                                            <span className="f-w-600 email-table tableFontSize">{userDetail?.email ? userDetail.email : "-"}</span>
                                        </div>
                                    </div>
                                </td>
                                {/* <td style={{ border: "2px solid black", textAlign: "center" }} >
                                    <span className="f-w-600 tableFontSize">{userDetail?.status ? userDetail.status : "-"}</span>
                                </td>
                                <td style={{ border: "2px solid black", textAlign: "center" }} >
                                    <span className="f-w-600 tableFontSize">
                                        {userDetail?.createdOn ? new Date(userDetail.createdOn).toLocaleString() : "-"}
                                    </span>
                                </td> */}


                            </tr>
                        ))
                    ) : (
                        <tr style={{ border: "2px solid black" }}>
                            <td style={{ border: "2px solid black" }} colSpan={7} className="text-center">
                                No Record Found
                            </td>
                        </tr>
                    )}
                    {isLoading && (
                        <tr style={{ border: "2px solid black" }}>
                            <td style={{ border: "2px solid black" }} colSpan={8} className="text-center">
                                <div className="basic-verification-loader text-center">
                                    {/* <CircularProgress /> */}<h1>Loading......</h1>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div style={{ display: 'flex', justifyContent: "space-between" }} className={userList?.recordsTotal > 10 ? 'forSpaceBetween' : "forEndPosition"}  >
                <BasicPagination
                    totalRecords={userList && userList.recordsTotal}
                    limit={limit}
                    batch={skip + 1}
                    onBatchChange={onPageChange} />
                <div className='displayingRecord'>
                    Displaying {skip * limit + 1} -{" "} {skip * limit + limit} of{" "} {userList && userList.recordsTotal} Records 	&nbsp; 	&nbsp;                                </div>
            </div>
        </center>
    )
}

export default User

