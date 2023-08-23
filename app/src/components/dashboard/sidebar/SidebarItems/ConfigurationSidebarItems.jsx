import { useSelector } from "react-redux";
import { useLocation } from 'react-router';
import SidebarTitle from "./items/SidebarTitle.jsx";
import InfoIcon from '@mui/icons-material/Info';
import CableIcon from '@mui/icons-material/Cable';
import SimCardIcon from '@mui/icons-material/SimCard';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import FunctionsIcon from '@mui/icons-material/Functions';
import AlignVerticalCenterIcon from '@mui/icons-material/AlignVerticalCenter';
import StraightenIcon from '@mui/icons-material/Straighten';

export default function ConfigurationSidebarItems() {
    const { snapshotData, handleMode } = useSelector((state) => state.configuration); // we get the userList var from the account reducer
    const location = useLocation();
    
    const regexUrl = /((\/general)|(\/channels)|(\/others)).+/;
    const validArray = Object.values(snapshotData.data).map((group)=>Object.values(group).map((part)=>part.isValid));

    const displayTextColor = (valid) => {
        if (handleMode == "Edit") {
            switch(valid) {
                case true:
                    return 'text-green-800';
                case false:
                    return 'text-red-800';
            }
        }
        return "";
    }

    const displayIconColor = (valid) => {
        if (handleMode == "Edit") {
            switch(valid) {
                case true:
                    return 'fill-green-800';
                case false:
                    return 'fill-red-800';
            }
        }
        return "";
    }

    let configurationActionsArray = [
        {
            title: "General",
            items: [
                {
                    text: <p className={`text-sm ${displayTextColor(validArray[0][0])}`}>Informations</p>,
                    link: location.pathname.replace(regexUrl, '') + "/general/informations",
                    icon: <InfoIcon className={`${displayIconColor(validArray[0][0])}`}/>
                },
                {
                    text: <p className={`text-sm ${displayTextColor(validArray[0][1])}`}>Relays</p>,
                    link: location.pathname.replace(regexUrl, '') + "/general/relays",
                    icon: <CableIcon className={`${displayIconColor(validArray[0][1])}`}/>
                },
                {
                    text: <p className={`text-sm ${displayTextColor(validArray[0][2])}`}>Cards & Compensations</p>,
                    link: location.pathname.replace(regexUrl, '') + "/general/cards&Compensations",
                    icon: <SimCardIcon className={`${displayIconColor(validArray[0][2])}`}/>
                },
            ]
        },
        {
            title: "Channels",
            items: [
                {
                    text: <p className={`text-sm ${displayTextColor(validArray[1][0])}`}>Informations</p>,
                    link: location.pathname.replace(regexUrl, '') + "/channels/informations",
                    icon: <InfoIcon className={`${displayIconColor(validArray[1][0])}`}/>
                },
                {
                    text: <p className={`text-sm ${displayTextColor(validArray[1][1])}`}>Thresholds</p>,
                    link: location.pathname.replace(regexUrl, '') + "/channels/thresholds",
                    icon: <AlignVerticalCenterIcon className={`${displayIconColor(validArray[1][1])}`}/>
                },
                {
                    text: <p className={`text-sm ${displayTextColor(validArray[1][2])}`}>Calibrations</p>,
                    link: location.pathname.replace(regexUrl, '') + "/channels/calibrations",
                    icon: <AlignVerticalCenterIcon className={`${displayIconColor(validArray[1][2])}`}/>
                },
                {
                    text: <p className={`text-sm ${displayTextColor(validArray[1][3])}`}>mA scale</p>,
                    link: location.pathname.replace(regexUrl, '') + "/channels/ma_scales",
                    icon: <LinearScaleIcon className={`${displayIconColor(validArray[1][3])}`}/>
                },
            ]
        },
        {
            title: "Others",
            items: [
                {
                    text: <p className={`text-sm ${displayTextColor(validArray[2][0])}`}>Averages</p>,
                    link: location.pathname.replace(regexUrl, '') + "/others/averages",
                    icon: <FunctionsIcon className={`${displayIconColor(validArray[2][0])}`}/>
                },
                {
                    text: <p className={`text-sm ${displayTextColor(validArray[2][1])}`}>Deviations</p>,
                    link: location.pathname.replace(regexUrl, '') + "/others/deviations",
                    icon: <StraightenIcon className={`${displayIconColor(validArray[2][1])}`}/>
                },
                {
                    text: <p className={`text-sm ${displayTextColor(validArray[2][2])}`}>Gradients</p>,
                    link: location.pathname.replace(regexUrl, '') + "/others/gradients",
                    icon: <FunctionsIcon className={`${displayIconColor(validArray[2][2])}`}/>
                },
            ]
        },

    ]; // this var contain object of data for each item, each object contain the title, the text a link for react-router then an icon component to display

    return (
        configurationActionsArray.map((action) =>
            <SidebarTitle key={action.title} title={action.title} items={action.items}/>
        ) // depending of the value of the user profile, we get some data object from the array and render them one by one on a SidebarItems component
    );
}