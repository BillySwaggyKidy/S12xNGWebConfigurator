import React, {useState, useEffect} from "react";
import { ConfFilesItemStatus } from "../../../../../../../../utils/enums-utils";
import DangerousIcon from '@mui/icons-material/Dangerous';
import BuildIcon from '@mui/icons-material/Build';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';

//this component represent the items of the configurations files from the import modal
export default function ConfigurationFilesItems({status, deviceType, name, files, deleteConfItem}) {
    const [fileConfItemDesign, setFileConfItemDesign] =  useState({
        color: "", // this property define the overall color of the item
        icon: <></> // this property define the icon of the item
    }); // this state define the design of the items notification item

    const bgColorVariants = {
        red: "bg-red-200",
        orange: "bg-orange-200",
        green: "bg-green-200",
    }; // this object define the variant color of the background of the item

    const borderColorVariants = {
        red: "border-red-600",
        orange: "border-orange-600",
        green: "border-green-600",
    }; // this object define the variant color of the border of the item

    const iconColorVariants = {
        red: "bg-red-900",
        orange: "bg-orange-900",
        green: "bg-green-900",
    }; // this object define the variant color of the icon of the item

    const DisplayConfigFilesItemStatus = () => {
        return (
            <div className="flex flex-row justify-around items-center">
                <div className={`flex flex-row justify-center items-center rounded-full ${iconColorVariants[fileConfItemDesign.color]} p-1`}>
                    {fileConfItemDesign.icon}
                </div>
                <p className="font-bold text-xl text-white">{deviceType}</p>
            </div>
        );

    };

    const DisplayDevicePxIcons = ({files}) => {
        return (
            <div className="flex flex-row justify-around items-center p-2">
                {
                    files.map((fileObj)=>
                        <div key={fileObj.parameter} className="flex flex-col items-center justify-center">
                            <InsertDriveFileIcon/>
                            <p>{fileObj.parameter}</p>
                        </div>
                    )   
                }
            </div>
        );
    };

    useEffect(()=>{ // at the first redering of the component
        let color = "";
        let icon = <></>;
        switch(status) { // depending of the status of the notification, we change the following color and icon var
            case ConfFilesItemStatus.Wrong:
                color = "red";
                icon = <DangerousIcon style={{ color: "white" }}/>;
                break;
            case ConfFilesItemStatus.Incomplete:
                color = "orange";
                icon = <BuildIcon style={{ color: "white" }}/>;
                break;
            case ConfFilesItemStatus.Complete:
                color = "green";
                icon = <CheckIcon style={{ color: "white" }}/>;
                break;
        }
        setFileConfItemDesign({
            color: color,
            icon: icon
        }); // we update the notifDesign state with the new color and icon
    },[status])


    return (
        <div className={`w-full h-12 flex flex-row justify-start items-center p-1 my-1 ${bgColorVariants[fileConfItemDesign.color]} border-2 rounded-lg ${borderColorVariants[fileConfItemDesign.color]}`}>
            <DisplayConfigFilesItemStatus/>
            <p className="w-[60%] text-lg mx-4">{name}</p>
            {files && <DisplayDevicePxIcons files={files}/>}
            <IconButton className="ml-auto" onClick={()=>deleteConfItem(name)}>
                <DeleteIcon/>
            </IconButton>
        </div>
    );
};