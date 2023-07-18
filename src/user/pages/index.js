import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { getListAsync } from '../redux/userSlice';


const User = () => {
    const dispatch = useDispatch();

    const { userList, isLoading } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getListAsync());
    }, [dispatch]);

    return (
        <center>
            <Table style={{ border: "2px solid black" }} hover className="mb-0 default_table with_hoverbtn mrpdng_tbl">
                <thead style={{ border: "2px solid black" }}>
                    <tr style={{ border: "2px solid black" }} className='Head_Row' >
                        <th style={{ border: "2px solid black" }} className='trBodyText thText'>Sr No.</th>
                        <th style={{ border: "2px solid black" }} className='thText'>Profile</th>
                        <th style={{ border: "2px solid black" }} className='thText'>Status</th>
                        <th style={{ border: "2px solid black" }} className='thText'>Created At</th>
                    </tr>
                </thead>
                <tbody style={{ border: "2px solid black" }}>
                    {userList && userList.length > 0 ? (
                        userList.map((userDetail, index) => (
                            <tr style={{ border: "2px solid black" }} key={index}>
                                <td style={{ border: "2px solid black" }} className='trBodyText'>
                                    <span>{index + 1}</span>
                                </td>
                                <td style={{ border: "2px solid black" }} className='boxForProfile'>
                                    <div className='BoxImgName'>
                                        {/* <span className='imgBox'>
                                            <img className="tableViewImage mr-1" src={userDetail.profilePicture} alt="profilePicture" />
                                        </span> */}
                                        <div className='nameEmailBox'>
                                            <span className="f-w-600 name-table tableFontSize">{userDetail.name ? userDetail.name : "-"}</span>
                                            <span className="f-w-600 email-table tableFontSize">{userDetail.email ? userDetail.email : "-"}</span>
                                        </div>
                                    </div>
                                </td>
                                {/* <td style={{ border: "2px solid black", textAlign: "center" }}>
                                    <span className="f-w-600 tableFontSize">{userDetail.status ? userDetail.status : "-"}</span>
                                </td>
                                <td style={{ border: "2px solid black", textAlign: "center" }}>
                                    <span className="f-w-600 tableFontSize">
                                        {userDetail.createdOn ? new Date(userDetail.createdOn).toLocaleString() : "-"}
                                    </span>
                                </td> */}
                            </tr>
                        ))
                    ) : (
                        <tr style={{ border: "2px solid black" }}>
                            <td style={{ border: "2px solid black" }} colSpan={4} className="text-center">
                                No Record Found
                            </td>
                        </tr>
                    )}
                    {isLoading && (
                        <tr style={{ border: "2px solid black" }}>
                            <td style={{ border: "2px solid black" }} colSpan={4} className="text-center">
                                <div className="basic-verification-loader text-center">
                                    <h1>Loading......</h1>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </center>
    );
};

export default User;
