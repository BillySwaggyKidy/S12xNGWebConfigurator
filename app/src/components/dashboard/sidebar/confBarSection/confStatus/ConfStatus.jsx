import { useSelector } from 'react-redux';
import CancelIcon from '@mui/icons-material/Cancel';
import SyncIcon from '@mui/icons-material/Sync';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudIcon from '@mui/icons-material/Cloud';
import ArrowTooltips from "../../../../utils/ArrowTooltips/ArrowTooltips.jsx";

// this component display an icon representing the state of an configuration depending of the user action
export default function ConfStatus() {
    const { confStateStatus } = useSelector((state) => state.configuration); // we get the userList var from the account reducer

    const DisplayStatusIcon = () => {
        switch(confStateStatus) {
            case 'Error':
                return <ArrowTooltips text={"The configuration changes are not saved in the database"}><CancelIcon sx={{ color: "red" }}/></ArrowTooltips>;
            case 'Loading':
                return <SyncIcon sx={{ color: "blue" }} className="animate-reverse-spin"/>;
            case 'Updated':
                return <ArrowTooltips text={"The configuration changes are saved in the database"}><CheckCircleIcon sx={{ color: "green" }}/></ArrowTooltips>;
            case 'Sync':
                return <ArrowTooltips text={"The configuration is on the new version"}><CloudIcon sx={{ color: "green" }}/></ArrowTooltips>;
            case 'ErrorSync':
                return <ArrowTooltips text={"The configuration changes didn't get commited to the database"}><CloudIcon sx={{ color: "red" }}/></ArrowTooltips>;
        }
    }

    return (
        <DisplayStatusIcon/>
    );
}