import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import AvatarSection from "./avatarSection/AvatarSection.jsx";
import ItemSection from "./itemSection/ItemSection.jsx";
import MainSection from "./mainSection/MainSection.jsx";

export default function AccountInfo() {
    const { online, userInfo, urlPath } = useSelector((state) => state.authentification); // we get the online and userInfo var from the authentification reducer
    const navigate = useNavigate(); // useNavigate is a React Router Hooks to navigate programmatically trougth route
    
    useEffect(() => {
        // redirect user to the main page if is not logged or not an admin
        if (!online) {
            navigate("/");
        }
    }, []) // the useEffect react for change from the loading, online and error

    return(
        <div className='flex flex-col min-w-full justify-center items-center min-h-full bg-gradient-to-b from-indigo-200 via-red-200 to-yellow-100'>
            <div className="h-4/6 w-4/5 grid grid-rows-4 grid-cols-3 grid-flow-col gap-4">
                <div className="row-span-1 col-span-1 bg-white rounded-lg drop-shadow-md pl-2 bg-gradient-to-r from-slate-300">
                    <AvatarSection name={userInfo?.username} profile={userInfo?.profile}/>
                </div>
                <div className="row-span-3 col-span-1 bg-white rounded-lg drop-shadow-md">
                    <ItemSection urlPath={urlPath}/>
                </div>
                <div className="row-span-4 col-span-2 bg-white rounded-lg drop-shadow-md">
                    <MainSection/>
                </div>
            </div>
        </div>
    );
}