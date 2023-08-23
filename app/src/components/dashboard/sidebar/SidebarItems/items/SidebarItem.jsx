import { useNavigate, useLocation } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// this component is the items from the sidebar
export default function SidebarItem({icon, textElement, link}) {
    const location = useLocation();
    const navigate = useNavigate();
    const linkSelected = location.pathname.includes(link);

    return (
        <ListItemButton disabled={linkSelected} className={`w-full px-2 ${linkSelected && "bg-white/40"}`} onClick={() => {navigate(link)}}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={textElement}/>
        </ListItemButton>
    );
}