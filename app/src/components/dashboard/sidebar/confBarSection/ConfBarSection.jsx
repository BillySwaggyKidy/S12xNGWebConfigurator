import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import ConfStatus from "./confStatus/ConfStatus.jsx";
import { closeOneConfiguration } from "../../../../actions/rootActions.js";

// this component represent a section on top of the sidebar that display the name of the configuration, his status and his version
export default function ConfBarSection() {
    const { configurationData, handleMode } = useSelector((state) => state.configuration); // we get the userList var from the account reducer
    const dispatch = useDispatch();

    const bgColorHandleModeVariants = {
        Read: "bg-blue-400",
        Edit: "bg-orange-400",
    }; // this object define the variant color of the background of the item

    const iconHandleModeVariants = {
        Read: <VisibilityIcon/>,
        Edit: <EditIcon/>,
    }; // this object define the variant color of the icon of the item

    const DisplayConfigName = ({name}) => {
        return (
            <div className="min-w-44 w-44 border rounded-md bg-slate-600 break-words whitespace-normal">
                <p className="text-white text-center">{name}</p>
            </div>
        );
    }

    // this cleanup function only purpose is to close the configuration by clearing the editedBy flag in the configuration model when the component unmount
    // the main reason why it is here instead of an other component like HandleConfiguration is because this one is in a Switch component from react-router
    // it make the component unmount/remount everytime we change route in the switch thus triggering the cleanup function 
    // while we only went to trigger when we quit and not during navigation between the part of the configuration
    // however this component does unmount when we quit and not during navigation so that why this function is here
    useEffect(() => {
        return () => {
            if (handleMode == "Edit") {
                dispatch(closeOneConfiguration({configurationId: configurationData._id}));
            }
        }
    }, []);
    

    return (
        <div className="w-full flex flex-col items-center justify-start">
            <div className={`w-32 flex flex-row justify-around items-center mt-0.5 p-2 ${bgColorHandleModeVariants[handleMode]}`}>
                <p>{handleMode} Mode</p>
                {iconHandleModeVariants[handleMode]}
            </div>
            <div className="w-full flex flex-row justify-start items-center mt-0.5">
                <DisplayConfigName name={configurationData.name}/>
                <div className="flex flex-row justify-center items-center ml-auto mr-1"><ConfStatus/></div>
            </div>
            <p className="font-bold text-center mt-1">Version: {configurationData.version}</p>
        </div>
    );
}