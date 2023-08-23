import { useSelector } from 'react-redux';
import Configuration from './configuration/Configuration.jsx';
import Administration from './administration/Administration.jsx';
import Paper from "@mui/material/Paper";

export default function Workbench() {
    const { userInfo, online } = useSelector((state) => state.authentification); // we get the userInfo and online var from the authentification reducer

    return (
        <Paper elevation={0} className='w-full bg-slate-100' square>
            {
                // if the user is online we display the following
                online && 
                <>
                    {
                        // if the user is an admin then we render the administration part or else just the configuration
                        userInfo.profile == "Admin" ? <Administration/> : <Configuration/>
                    }
                </>
            }
        </Paper>
    );
}