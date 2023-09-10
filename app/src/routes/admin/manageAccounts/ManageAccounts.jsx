import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { UserStatus } from "../../../../utils/enums-utils.js";
import AccountsList from "./accountsList/AccountsList.jsx";
import { getAccounts } from "../../../actions/rootActions.js";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from '@mui/icons-material/Refresh';

export default function ManageAccounts() {
    const { online, userInfo } = useSelector((state) => state.authentification); // we get the online and userInfo var from the authentification reducer
    const { userList, loading } = useSelector((state) => state.accounts); // we get the userList var from the account reducer
    const navigate = useNavigate(); // useNavigate is a React Router Hooks to navigate programmatically trougth route
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAccounts({id: userInfo._id}));
        // redirect user to the main page if is not logged or not an admin
        if (!online || userInfo.profile != UserStatus.Admin) {
            navigate("/");
        }
    }, []);

    // this function refresh the list of accounts
    const refreshUsersList = () => {
        dispatch(getAccounts({id: userInfo._id}));
    };

    return(
        <div className='flex flex-col min-w-full items-center min-h-full'>
            <div className="flex flex-col items-center w-full">
                <div className="flex flex-col items-center rounded-md p-1 m-2">
                    <h1 className="text-[3em] text-red-500 font-bold">Manage accounts</h1>
                </div>
            </div>
            <div className="w-full flex flex-row items-center justify-end pr-8">
                <IconButton title="refresh" className="bg-cyan-400 hover:bg-cyan-300 border-2 border-cyan-900" size="large" onClick={refreshUsersList}>
                    <RefreshIcon className="hover:animate-spin" sx={{ width: 30, height: 30 }} fontSize="inherit" />
                </IconButton>
            </div>
            <AccountsList accountList={userList ?? []} loading={loading}/>
        </div>
    );
}