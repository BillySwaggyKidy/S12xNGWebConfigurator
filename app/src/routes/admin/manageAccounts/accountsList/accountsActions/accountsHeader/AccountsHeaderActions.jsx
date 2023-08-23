import React, {useState} from "react";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import CreateUserModal from "./CreateUserModal.jsx";

// if you create an action component, then since the TableDisplay is generic then it need to have a object prop
export default function AccountsHeaderActions() {
    const [openAddUserModal, setOpenAddUserModal] = useState(false);

    return(
        <>
            <Button className="bg-green-500 hover:bg-green-600" variant="contained" endIcon={<AddIcon />} onClick={() => setOpenAddUserModal(true)}>Add User</Button>
            {openAddUserModal && <CreateUserModal close={() => setOpenAddUserModal(false)}/> }
        </>
    );
}