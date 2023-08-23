import React, {useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { operationsCustomer } from "../../../../../actions/rootActions.js";
import DialogueBox from "../../../../../components/utils/DialogueBox/DialogueBox.jsx";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

// if you create an action component, then since the TableDisplay is generic then it need to have a object prop
export default function CustomerRowActions({object}) {
    const { userInfo } = useSelector((state) => state.authentification); // we get the online and userInfo var from the authentification reducer
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // this function navigate the user to the section of the configuration
    const redirectToConfigurations = () => {
        navigate(location.pathname+'/'+object._id+'/configurations', {
            state: {
                paramObject: {
                    id: object._id,
                }
            }
        });
    };

    // this function perform an action to delete the data of this configuration
    const deleteCustomer = () => {
        setOpenConfirmDialog(false);
        dispatch(operationsCustomer({
            status: "Remove",
            operationParameters: {hostId: userInfo._id, customerId: object._id}
        }))
        .unwrap()
        .then((originalPromiseResult) => {
          // handle result here
          setErrorMsg("");
        })
        .catch((rejectedValueOrSerializedError) => {
          // handle error here
          setErrorMsg(rejectedValueOrSerializedError);
          setOpenErrorDialog(true);
        });
    };

    return(
        <>
            <div className="flex flex-row justify-center">
                <Button className="bg-blue-400 hover:bg-blue-500 text-white" variant="contained" onClick={redirectToConfigurations}>Open</Button>
                {userInfo.profile == "Admin" && <IconButton className="bg-red-500 hover:bg-red-600 rounded-md ml-2" onClick={()=>{setOpenConfirmDialog(true)}}><DeleteIcon/></IconButton>}
                <DialogueBox 
                    open={openConfirmDialog}
                    status="Warning"
                    contentText={`Are you sure you want to remove the following customer (${object.name}) ? \n Linked Configurations will also be removed`}
                    actionFunction={deleteCustomer}
                    handleClose={()=>{setOpenConfirmDialog(false)}}
                />
                <DialogueBox 
                    open={openErrorDialog}
                    status="Error"
                    contentText={errorMsg}
                    handleClose={()=>{setOpenErrorDialog(false)}}
                />
            </div>
        </>
    );
}