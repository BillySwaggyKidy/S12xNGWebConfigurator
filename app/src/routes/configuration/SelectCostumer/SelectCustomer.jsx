import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllCustomers } from "../../../actions/rootActions.js";
import CustomerList from "./CustomerList/CustomerList.jsx";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from '@mui/icons-material/Refresh';

export default function SelectCustomer() {
    const { online, userInfo } = useSelector((state) => state.authentification); // we get the online and userInfo var from the authentification reducer
    const { customersList, loading } = useSelector((state) => state.configuration); // we get the userList var from the configuration reducer
    const navigate = useNavigate(); // useNavigate is a React Router Hooks to navigate programmatically trougth route
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCustomers({host: userInfo._id}));
        // redirect user to the main page if is not logged or not an admin
        if (!online) {
            navigate("/");
        }
    }, []);

    // this function refresh the list of customers
    const refreshCustomersList = () => {
        dispatch(getAllCustomers({host: userInfo._id}));
    };

    return(
        <div className='flex flex-col min-w-full items-center min-h-full'>
            <div className="flex flex-col items-center w-full">
                <div className="flex flex-col items-center bg-black rounded-md p-1 m-2">
                    <h1 className="text-[3em] text-orange-500 font-bold">Select Customer</h1>
                </div>
            </div>
            <div className="w-full flex flex-row items-center justify-end pr-8">
                <IconButton title="refresh" className="bg-cyan-400 hover:bg-cyan-300 border-2 border-cyan-900" size="large" onClick={refreshCustomersList}>
                    <RefreshIcon className="hover:animate-spin" sx={{ width: 30, height: 30 }} fontSize="inherit" />
                </IconButton>
            </div>
            <CustomerList customerList={customersList} loading={loading} userProfile={userInfo.profile}/>
        </div>
    );
}