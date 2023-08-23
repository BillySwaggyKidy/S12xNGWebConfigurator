import React, {useState} from "react";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddConfigurationModal from "./AddConfigurationModal.jsx";
import ImportConfigurationModal from "./ImportConfigurationModal/ImportConfigurationModal.jsx";

// if you create an action component, then since the TableDisplay is generic then it need to have a object prop
export default function ConfigurationHeaderActions() {
    const [openAddConfigModal, setOpenAddConfigModal] = useState(false);
    const [openImportConfigModal, setImportConfigModal] = useState(false);

    return(
        <>
            <Button className="bg-green-500 hover:bg-green-600" variant="contained" endIcon={<AddIcon />} onClick={() => setOpenAddConfigModal(true)}>Add Configuration</Button>
            <Button className="bg-amber-700 hover:bg-amber-800 ml-2" variant="contained" endIcon={<FileUploadIcon />} onClick={() => setImportConfigModal(true)}>Import Configuration</Button>
            {openAddConfigModal && <AddConfigurationModal close={() => setOpenAddConfigModal(false)}/> }
            {openImportConfigModal && <ImportConfigurationModal close={() => setImportConfigModal(false)}/> }
        </>
    );
}