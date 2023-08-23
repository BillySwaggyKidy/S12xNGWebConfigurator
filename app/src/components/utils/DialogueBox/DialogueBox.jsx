import React, {useState, forwardRef, useEffect} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';

// this is a custom generic component that represent a dialog
export default function DialogueBox({open, status = "Info", contentText, actionButtonText = "OK", actionFunction, handleClose}) {
    const [notifDesign, setNotifDesign] =  useState({
        title: "",
        color: "", // this property define the overall color of the item
        icon: <></> // this property define the icon of the item
    }); // this state define the design of the items notification item

    const Transition = forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const bgColorVariants = {
        red: "bg-red-200",
        orange: "bg-orange-200",
        green: "bg-green-100",
        cyan: "bg-cyan-100",
    }; // this object define the variant color of the background of the item

    const buttonColorVariants = {
        red: "bg-red-600",
        orange: "bg-orange-600",
        green: "bg-green-600",
        cyan: "bg-cyan-600",
    }; // this object define the variant color of the border of the item

    useEffect(()=>{ // at the first redering of the component
        let color;
        let icon;
        let title;
        switch(status) { // depending of the status of the notification, we change the following color and icon var
            case "Error":
                title = "Error";
                color = "red";
                icon = <ReportProblemIcon fontSize="large" style={{ color: "white" }}/>;
                break;
            case "Warning":
                title = "Warning";
                color = "orange";
                icon = <ReportIcon fontSize="large" style={{ color: "white" }}/>;
                break;
            case "Success":
                title = "Success";
                color = "green";
                icon = <CheckCircleIcon fontSize="large" style={{ color: "white" }}/>;
                break;
            case "Info":
                title = "Information";
                color = "cyan";
                icon = <InfoIcon fontSize="large" style={{ color: "white" }}/>;
                break;
        }
        setNotifDesign({
            title: title,
            color: color,
            icon: icon
        }); // we update the notifDesign state with the new color and icon
    },[])

    return (
        <>
            {
                open &&
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                >
                    <DialogTitle className={`${bgColorVariants[notifDesign.color]}`}>
                        <div className="w-full flex flex-row justify-between items-center">
                            {notifDesign.icon}
                            <h1 className="font-bold underline text-black">{notifDesign.title}</h1>
                            <div></div>
                        </div>
                    </DialogTitle>
                    <DialogContent className={`${bgColorVariants[notifDesign.color]}`}>
                        <DialogContentText className="text-black">
                            {contentText}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className={`${bgColorVariants[notifDesign.color]}`}>
                        {actionFunction && <Button className={`${buttonColorVariants[notifDesign.color]} text-white`} onClick={actionFunction}>{actionButtonText}</Button>}
                        <Button className="bg-gray-400 hover:bg-gray-500 text-white" onClick={handleClose}>{actionFunction ? "Cancel" : actionButtonText}</Button>
                    </DialogActions>
                </Dialog>
            }
        </>   
    );
}