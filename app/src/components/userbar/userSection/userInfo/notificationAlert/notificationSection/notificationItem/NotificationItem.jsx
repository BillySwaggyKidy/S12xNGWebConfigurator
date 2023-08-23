import React, {useState,useEffect} from "react";
import { useDispatch } from 'react-redux';
import { deleteOneNotification } from "../../../../../../../actions/rootActions.js";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import NotificationModal from "./NotificationModal.jsx";

// this component render a notification item on the notification section and react depending of the status of the notification
export default function NotificationItem({id, title, message, redirectTo, read, status, date}) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false); // this state define if the modal is open or not
    const [notifDesign, setNotifDesign] =  useState({
        color: "", // this property define the overall color of the item
        notifIcon: <></> // this property define the icon of the item
    }); // this state define the design of the items notification item

    const bgColorVariants = {
        red: "bg-red-200",
        orange: "bg-orange-200",
        green: "bg-green-200",
        blue: "bg-blue-200",
        slate: "bg-slate-200",
    }; // this object define the variant color of the background of the item

    const borderColorVariants = {
        red: "border-red-600",
        orange: "border-orange-600",
        green: "border-green-600",
        blue: "border-blue-600",
        slate: "border-slate-600",
    }; // this object define the variant color of the border of the item

    const iconColorVariants = {
        red: "bg-red-900",
        orange: "bg-orange-900",
        green: "bg-green-900",
        blue: "bg-blue-900",
        slate: "bg-slate-900",
    }; // this object define the variant color of the icon of the item

    useEffect(()=>{ // at the first redering of the component
        let color;
        let icon;
        switch(status) { // depending of the status of the notification, we change the following color and icon var
            case "Error":
                color = "red";
                icon = <ReportProblemIcon style={{ color: "white" }}/>;
                break;
            case "Warning":
                color = "orange";
                icon = <ReportIcon style={{ color: "white" }}/>;
                break;
            case "Success":
                color = "green";
                icon = <CheckCircleIcon style={{ color: "white" }}/>;
                break;
            case "Info":
                color = "blue";
                icon = <InfoIcon style={{ color: "white" }}/>;
                break;
            case "Request":
                color = "slate";
                icon = <HelpIcon style={{ color: "white" }}/>;
                break;
        }
        setNotifDesign({
            color: color,
            notifIcon: icon
        }); // we update the notifDesign state with the new color and icon
    },[])


    const openNotificationModal = () => {
        setOpen(true);
    };

    const closeNotificationModal = () => {
        setOpen(false);
    };

    const deleteNotification = () => { // this function send an action to delete this notification by using his id
        dispatch(deleteOneNotification({id: id}));
    };



    return (
        <>
            <div className={`h-12 flex flex-row items-center rounded-lg my-1 p-1 ${bgColorVariants[notifDesign.color]} border-2 ${borderColorVariants[notifDesign.color]}`}>
                <div data-testid="notif-item" className="w-[90%] flex flex-row justify-start items-center cursor-pointer" onClick={openNotificationModal}>
                    <div className="flex flex-row justify-around items-center">
                        <div className={`flex flex-row justify-center items-center rounded-full ${iconColorVariants[notifDesign.color]} p-1`}>
                            {notifDesign.notifIcon}
                        </div>
                        <h3 className="ml-6">{title}</h3>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center w-[10%]">
                    <IconButton onClick={deleteNotification}>
                        <ClearIcon/>
                    </IconButton>
                </div>
            </div>
            {open && <NotificationModal design={{
                bgColor: bgColorVariants[notifDesign.color],
                borderColor: borderColorVariants[notifDesign.color],
                iconColor: iconColorVariants[notifDesign.color]
            }} title={title} message={message} redirectLink={redirectTo} date={date} close={closeNotificationModal}/>}
        </>
    );
}