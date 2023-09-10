import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { getAllConfigurationsFromCustomer } from "../../../actions/rootActions.js";
import ConfigurationList from "./ConfigurationList/ConfigurationList.jsx";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from '@mui/icons-material/Refresh';

export default function SelectConfiguration() {
    const { online, userInfo } = useSelector((state) => state.authentification); // we get the online and userInfo var from the authentification reducer
    const { configurationsList, customerData, loading } = useSelector((state) => state.configuration); // we get the userList var from the account reducer
    const navigate = useNavigate(); // useNavigate is a React Router Hooks to navigate programmatically trougth route
    const dispatch = useDispatch();
    const {state} = useLocation();
    const {paramObject} = state;

    useEffect(() => {
        dispatch(getAllConfigurationsFromCustomer({customerId: paramObject.id}));
        // redirect user to the main page if is not logged or not an admin
        if (!online) {
            navigate("/");
        }
    }, []);

    // this function refresh the list of configurations
    const refreshCongigurationsList = () => {
        dispatch(getAllConfigurationsFromCustomer({customerId: paramObject.id}));
    };

    return(
        <div className='flex flex-col min-w-full items-center min-h-full'>
            <div className="flex flex-col items-center w-full">
                <div className="flex flex-col items-center rounded-md p-1 m-2">
                    <h1 className="text-[3em] text-yellow-500 font-bold">Select configurations</h1>
                    {customerData && <h2 className="text-[1.5em] text-yellow-600 font-bold underline">{customerData.name}</h2>}
                </div>
            </div>
            <div className="w-full flex flex-row items-center justify-end pr-8">
                <IconButton title="refresh" className="bg-cyan-400 hover:bg-cyan-300 border-2 border-cyan-900" size="large" onClick={refreshCongigurationsList}>
                    <RefreshIcon className="hover:animate-spin" sx={{ width: 30, height: 30 }} fontSize="inherit" />
                </IconButton>
            </div>
            <ConfigurationList configurationList={configurationsList} loading={loading} userProfile={userInfo.profile}/>
        </div>
    );
}