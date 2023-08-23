import React, {useState} from "react";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import AddCustomerModal from "./AddCustomerModal.jsx";

// if you create an action component, then since the TableDisplay is generic then it need to have a object prop
export default function CustomerHeaderActions({object}) {
    const [open, setOpen] = useState(false);
    
    const toggleCustomerModal = (open) => {
        setOpen(open)
    };

    return(
        <>
            <div className="flex flex-row justify-center">
                <Button className="bg-green-500 hover:bg-green-600" variant="contained" endIcon={<AddIcon />} onClick={() => toggleCustomerModal(true)}>Add Customer</Button>
            </div>
            {open && <AddCustomerModal close={() => toggleCustomerModal(false)}/> }
        </>
    );
}