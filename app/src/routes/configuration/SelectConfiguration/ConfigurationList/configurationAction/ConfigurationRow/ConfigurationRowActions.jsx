import React, {useState} from "react";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { operationsConfiguration, openOneConfiguration, closeOneConfiguration } from "../../../../../../actions/rootActions.js";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DialogueBox from "../../../../../../components/utils/DialogueBox/DialogueBox.jsx";
import ViewChooseConfigurationModal from "./ViewChooseConfigurationModal/ViewChooseConfigurationModal.jsx";
import ExportConfigurationsModal from "./ExportConfigurationsModal/ExportConfigurationsModal.jsx";

// if you create an action component, then since the TableDisplay is generic then it need to have a object prop
export default function ConfigurationRowActions({object}) {
    const { userInfo } = useSelector((state) => state.authentification); // we get the online and userInfo var from the authentification reducer
    const { customerData } = useSelector((state) => state.configuration); // we get the customerData var from the configuration reducer
    const [openReadModal, setOpenReadModal] = useState(false); // this state specify if the openExportModal is open or not
    const [openExportModal, setOpenExportModal] = useState(false); // this state specify if the openExportModal is open or not
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // this state specify if the confirmDialog is open or not
    const [openErrorDialog, setOpenErrorDialog] = useState(false); // this state specify if the errorDialog is open or not
    const [errorMsg, setErrorMsg] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // this function navigate the user to the section of the configuration
    const editToConfigurations = () => {
        dispatch(openOneConfiguration({
            userId: userInfo._id,
            configurationId: object._id,
            handleMode: "Edit"
        }))
        .unwrap()
        .then((originalPromiseResult) => {
            // if the action is fulfilled then
            setErrorMsg(""); // we update the errorMsg hook with the action error
            // we navigate to the edit configuration part
            navigate(location.pathname+'/'+object._id+'/handle', {
                state: {
                    paramObject: {
                        id: object._id,
                    }
                }
            });
        })
        .catch((rejectedValueOrSerializedError) => {
            // if the action is rejected then
            setErrorMsg(rejectedValueOrSerializedError); // we update the errorMsg hook with the action error
            setOpenErrorDialog(true); // we open the error dialog to display the error message
        });
    };

    const duplicateConfiguration = () => {
        dispatch(operationsConfiguration({
            status: "Duplicate",
            operationParameters: {hostId: userInfo._id, customerId: customerData._id, configurationId: object._id}
        }))
    };

    const unlockConfiguration = () => {
        dispatch(closeOneConfiguration({configurationId: object._id}));
    };

    // this function perform an action to delete the data of this configuration
    const deleteConfiguration = () => {
        setOpenConfirmDialog(false); // we close the confirl dialog
        dispatch(operationsConfiguration({
            status: "Remove",
            operationParameters: {hostId: userInfo._id, customerId: customerData._id, configurationId: object._id}
        }))
        .unwrap()
        .then((originalPromiseResult) => {
          // if the action is fulfilled then
          setErrorMsg(""); // we update the errorMsg hook with the action error
        })
        .catch((rejectedValueOrSerializedError) => {
          // if the action is rejected then
          setErrorMsg(rejectedValueOrSerializedError); // we update the errorMsg hook with the action error
          setOpenErrorDialog(true); // we open the error dialog to display the error message
        });
    };

    return(
        <>
            <div className="flex flex-row justify-around">
                {
                    userInfo.profile != "Admin" && 
                    <IconButton className="bg-blue-400 hover:bg-blue-500 rounded-md" onClick={()=>{setOpenReadModal(true)}}><VisibilityIcon/></IconButton>
                }
                {
                    userInfo.profile == "Configurator" && 
                    <>
                        <IconButton className="bg-orange-400 hover:bg-orange-500 rounded-md ml-1" onClick={editToConfigurations}><EditIcon/></IconButton>
                        <IconButton className="bg-yellow-400 hover:bg-yellow-500 rounded-md ml-1" onClick={duplicateConfiguration}><FileCopyIcon/></IconButton>
                    </>
                }
                <IconButton className="bg-green-400 hover:bg-green-500 rounded-md ml-1" onClick={()=>{setOpenExportModal(true)}}><DownloadIcon/></IconButton>
                {
                    userInfo.profile == "Admin" &&
                    <>
                        <IconButton className="bg-purple-500 hover:bg-purple-600 rounded-md ml-2" onClick={unlockConfiguration}>{object.editedBy.length > 0 ? <LockIcon/> : <LockOpenIcon/>}</IconButton>
                        <IconButton className="bg-red-500 hover:bg-red-600 rounded-md ml-2" onClick={()=>{setOpenConfirmDialog(true)}}><DeleteIcon/></IconButton>
                    </>
                }
                <DialogueBox 
                    open={openConfirmDialog}
                    status="Warning"
                    contentText={`Are you sure you want to remove the following configuration (${object.name}) ?`}
                    actionFunction={deleteConfiguration}
                    handleClose={()=>{setOpenConfirmDialog(false)}}
                />
                <DialogueBox 
                    open={openErrorDialog}
                    status="Error"
                    contentText={errorMsg}
                    handleClose={()=>{setOpenErrorDialog(false)}}
                />
                {
                    openReadModal && <ViewChooseConfigurationModal configurationId={object._id} configurationName={object.name} close={()=>{setOpenReadModal(false)}}/>
                }
                {
                    openExportModal && <ExportConfigurationsModal configurationId={object._id} configurationName={object.name} close={()=>{setOpenExportModal(false)}}/>
                }
            </div>
        </>
    );
}