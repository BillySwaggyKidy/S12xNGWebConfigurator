import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { commitOfficialConfiguration } from "../../../../actions/rootActions.js";
import Button from '@mui/material/Button';
import DialogueBox from "../../../utils/DialogueBox/DialogueBox.jsx";

// this component represent a button on the bottom of the sidebar to commit a new version of a config
export default function CommitConfigButton({snapshotConfig}) {
    const { userInfo } = useSelector((state) => state.authentification);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openInfoDialog, setOpenInfoDialog] = useState(false); // this state manage the display of the info commit DialogBox
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false); // this state manage the display of the success DialogBox
    const [openErrorDialog, setOpenErrorDialog] = useState(false); // this state manage the display of the error DialogBox
    const errorDialogText = useRef(""); // this ref represent the text display in the error DialogBox

    // this function only open the confirm dialog box but make a redirect in order to save one last time in order make sure we have the latest config data
    const openCommitDialog = () => {
        const pathArray = location.pathname.split("/"); // we split the url string into an array
        const configHomePath = pathArray.slice(0,pathArray.findIndex((path)=>["handle"].includes(path))+1).join("/"); // we rebuild the url to stop to the handle part
        // we commit when we already are in the handle page then we don't redirect a second time
        if (configHomePath != location.pathname) navigate(configHomePath);
        // since the dialogBox animation play twice during the redirection, we put a little delay to not broke the open animation when the dialog box appear
        setTimeout(()=> {setOpenInfoDialog(true);},200);
    };


    // this function check if the config is valid and send it to the server
    const commitNewVersionConfiguration = () => {
        setOpenInfoDialog(false); // we close the info dialog
        // we get in an object contening all of the object of the sections of the configurations (informations, relays, cardsandcompensations, informations, threshold, calibration...)
        const configSectionObjectsArray = Object.values(snapshotConfig.data).map((group)=>Object.values(group)).flat();
        // if every section of the configuration object have the property isvalid true then
        if (configSectionObjectsArray.every((objectPart)=>objectPart.isValid))
        {
            dispatch(commitOfficialConfiguration({userId: userInfo._id, confId: snapshotConfig.configurationId, snapshotConfData: snapshotConfig.data}))
            .unwrap()
            .then((originalPromiseResult) => {
                setOpenSuccessDialog(true); // we open the success dialog to inform the user that the configuration has been commited
            })
            .catch((rejectedValueOrSerializedError) => {
            // if the action is rejected then
                errorDialogText.current = rejectedValueOrSerializedError;
                setOpenErrorDialog(true); // we open the error dialog to inform to the user the reason why the config has not been commited
            });
        }
        else {
            errorDialogText.current = "Your configuration is not valid, please check every sections of the configuration and make sure it is valid";
            setOpenErrorDialog(true); // we inform the user that the config can't be commited because the configuration is not valid yet
        }
    };

    return (
        <>
            <Button className='bg-yellow-600 hover:bg-yellow-500 text-white font-bold mt-auto mb-4 h-12' variant="contained" onClick={openCommitDialog}>Commit configuration</Button>
            <DialogueBox 
                open={openInfoDialog}
                status={"Info"}
                contentText={"You will commit a new version of the configuration, make sure that all data are valid"}
                actionFunction={commitNewVersionConfiguration}
                handleClose={()=>{setOpenInfoDialog(false)}}
            />
            <DialogueBox 
                open={openSuccessDialog}
                status={"Success"}
                contentText={"You have successfully commited a new version of the configuration"}
                handleClose={()=>{setOpenSuccessDialog(false)}}
            />
            <DialogueBox 
                open={openErrorDialog}
                status="Error"
                contentText={errorDialogText.current}
                handleClose={()=>{setOpenErrorDialog(false)}}
            />
        </>
    );
}