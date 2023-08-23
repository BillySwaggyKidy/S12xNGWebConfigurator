import { useSelector } from 'react-redux';
import SelectSidebarItems from './SidebarItems/SelectSidebarItems.jsx';
import ConfigurationSidebarItems from './SidebarItems/ConfigurationSidebarItems.jsx';
import AdminSidebarItems from './SidebarItems/AdminSidebarItems.jsx';
import Paper from "@mui/material/Paper";
import List from '@mui/material/List';
import ConfBarSection from './confBarSection/ConfBarSection.jsx';
import CommitConfigButton from './commitConfigButton/CommitConfigButton.jsx';

// This is the sidebar component of the app
export default function Sidebar() {
    const { online, userInfo } = useSelector((state) => state.authentification); // we get the online and userInfo var from the authentification reducer
    const { configurationData, snapshotData, handleMode } = useSelector((state) => state.configuration); // we get the userList var from the account reducer

    // this component function is used to display items in the sidebar depending of the profile of the user connected.
    const DisplaySidebarItems = () => {
        return (
            (handleMode && configurationData && snapshotData) ? <ConfigurationSidebarItems/> : <SelectSidebarItems/>
        );
    }
    console.log(`${handleMode == "Edit"} && ${userInfo.profile == "Configurator"} && ${configurationData}`);
    return (
        <Paper elevation={2} data-testid="sidebar" id="sidebar" className="flex flex-col items-start justify-start overflow-x-hidden z-1 w-[14%] h-full bg-slate-400 transition-[width] linear delay-75" square>
            <div className="flex flex-col items-start justify-start w-full h-full whitespace-nowrap pl-2">
                {(handleMode && configurationData && snapshotData) &&
                 <ConfBarSection/>}
                {
                    online && 
                        <List>
                            {
                                // if the user is an admin then we display the admin items or else only the configuration items
                                userInfo.profile == "Admin" ?
                                <AdminSidebarItems/>
                                :
                                <DisplaySidebarItems/>
                            }
                        </List>
                }
                {
                    (handleMode == "Edit" && userInfo.profile == "Configurator" && configurationData) &&
                    <CommitConfigButton snapshotConfig={snapshotData}/>
                }
            </div>
        </Paper>
    );
}