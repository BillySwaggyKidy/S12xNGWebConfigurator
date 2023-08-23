import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountEditModal from "./AccountEditModal.jsx";
import { operationsAccount } from "../../../../../../actions/rootActions.js";
import DialogueBox from "../../../../../../components/utils/DialogueBox/DialogueBox.jsx";

// if you create an action component, then since the TableDisplay is generic then it need to have a object prop
export default function AccountRowActions({object}) {
    const { userInfo } = useSelector((state) => state.authentification); // we get the userInfo var from the authentification reducer
    const [openEditModal, setOpenEditModal] = useState(false); // this state define if the modal to edit the user's info is open or not
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // this state specify if the confirmDialog is open or not
    const [errorMsg, setErrorMsg] = useState("");
    const dispatch = useDispatch();

    // this function perform an action to delete the data of this user
    const deleteUser = () => {
        setOpenConfirmDialog(false); // we close the confirm dialog
        dispatch(operationsAccount({
            status: "Remove",
            operationParameters: {hostId: userInfo._id, userToDeleteId: object._id}
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
            <div className="flex flex-row justify-center">
                <IconButton className="bg-orange-400 hover:bg-orange-500 rounded-md ml-1" onClick={()=>{setOpenEditModal(true)}}><EditIcon/></IconButton>
                <IconButton className="bg-red-500 hover:bg-red-600 rounded-md ml-2" onClick={()=>{setOpenConfirmDialog(true)}}><DeleteIcon/></IconButton>
            </div>
            {openEditModal && <AccountEditModal account={object} close={()=>{setOpenEditModal(false)}}/>}
            <DialogueBox 
                open={openConfirmDialog}
                status="Warning"
                contentText={`Are you sure you want to remove the following user: (${object.username}) ?`}
                actionFunction={deleteUser}
                handleClose={()=>{setOpenConfirmDialog(false)}}
            />
        </>
    );
}