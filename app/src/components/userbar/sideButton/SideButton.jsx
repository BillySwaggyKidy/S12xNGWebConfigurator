import React, {useState} from 'react';
import DehazeIcon from '@mui/icons-material/Dehaze';
import Checkbox  from '@mui/material/Checkbox';

export default function SideButton() {
    const [checked, setChecked] = useState(true);

    const toggleSideBar = (event) => {
        let sidebarDiv = typeof document !== 'undefined' ? document.getElementById("sidebar") : null;
        let isChecked = event.target.checked;
        if (sidebarDiv.classList.contains("w-[14%]")) sidebarDiv.classList.remove("w-[14%]");
        sidebarDiv.style.width = isChecked ? "14%" : "0%";
        setChecked(isChecked);
    };

    return (
        <div className="flex flex-row justify-start items-center p-2">
            <Checkbox data-testid="side-button" checked={checked} onChange={toggleSideBar} icon={<DehazeIcon style={{ color: "white" }} sx={{ fontSize: 30 }}/>} checkedIcon={<DehazeIcon style={{ color: "gray" }} sx={{ fontSize: 30 }}/>} />
        </div>
    );
}