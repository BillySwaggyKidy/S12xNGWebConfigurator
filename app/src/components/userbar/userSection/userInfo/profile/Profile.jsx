import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { disconnect, setUrlPath } from '../../../../../reducers/authentification';
import { resetAccount } from '../../../../../reducers/accounts';
import { resetNotification } from '../../../../../reducers/notification';
import { resetConfigurationReducer } from '../../../../../reducers/configuration';
import Paper from "@mui/material/Paper";
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Profile({name}) {
    const [checked, setChecked] = useState(false); // this state define if the profile button was opened or not
    const dispatch = useDispatch();
    const navigate = useNavigate(); // useNavigate is a React Router Hooks to navigate programmatically trougth route
    const location = useLocation();

    const toggleProfileMenu = () => {
        let profileDiv = typeof document !== 'undefined' ? document.getElementById("profile") : null;
        profileDiv.style.borderColor = !checked ? "black" : "";
        setChecked(!checked);
    };

    // this function redirect the user to the profile page
    const goToAccountInfo = () => {
        dispatch(setUrlPath(location.pathname));
        navigate('/profile');
    };

    const userDisconnect = () => { // this function disconnect the user from his account and redirect it to the main route
        dispatch(disconnect()); // we clear the authentification reducer
        dispatch(resetAccount()); // we clear the account reducer
        dispatch(resetNotification()); // we clear the notification reducer
        dispatch(resetConfigurationReducer()); // we clear the configuration reducer
        navigate("/"); // we redirect the user to the main page
    };

    return (
        <Paper>
            <div data-testid="profile" id="profile" className='w-[200px] flex flex-row items-center justify-around bg-slate-200 hover:bg-slate-100 border-2 p-0.5 m-0 rounded cursor-pointer' onClick={toggleProfileMenu}>
                <Avatar className='mr-3'>{name.charAt(0)}</Avatar>
                <p className='select-none'>{name}</p>
            </div>
            {
                checked &&
                <div className="absolute w-[200px] dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-2 mr-2 transition-[border-color] linear delay-75 animate-fade-in-down">
                    <ul className="dark:text-white">
                        <li className="font-medium hover:bg-gray-300 cursor-pointer rounded-t-lg" onClick={goToAccountInfo}>
                            <a className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700">
                                <div className="mr-3">
                                    <PersonIcon/>
                                </div>
                                Account
                            </a>
                        </li>
                        <li className="font-medium hover:bg-gray-300 cursor-pointer">
                            <a className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700">
                                <div className="mr-3">
                                    <SettingsIcon/>
                                </div>
                                Settings
                            </a>
                        </li>
                        <hr className="dark:border-gray-700"></hr>
                        <li className="font-medium hover:bg-red-300 cursor-pointer rounded-b-lg">
                            <a className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700" onClick={userDisconnect}>
                                <div className="mr-3">
                                    <LogoutIcon/>
                                </div>
                                Disconnect
                            </a>
                        </li>
                    </ul>
                </div>
            }
        </Paper>
    );
}