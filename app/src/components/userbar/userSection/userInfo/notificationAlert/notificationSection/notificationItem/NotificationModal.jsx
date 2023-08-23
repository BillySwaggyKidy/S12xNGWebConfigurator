
import { useNavigate } from "react-router-dom";
import ShortcutIcon from '@mui/icons-material/Shortcut';
import Button from '@mui/material/Button';
import { convertUTCToLocalTimeZone } from "../../../../../../../../utils/functions-utils";

// this component is the modal of an notification when clicked by the user
export default function NotificationModal({design, title, message, redirectLink, date, close}) {
    const navigate = useNavigate(); // useNavigate is a React Router Hooks to navigate programmatically trougth route

    const redirect = () => { // this function redirect the user to the proper section of the page in order to manage the task
        close(); // we close this modal
        navigate(redirectLink); // we navigate to the page using the redirect link
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-80 overflow-y-auto h-full w-full z-auto animate-fade-in-center">
            <div className={`flex flex-col items-center relative top-20 mx-auto border-4 w-96 h-96 shadow-lg rounded-md bg-slate-100 ${design.borderColor}`}>
                <div className={`w-full h-[15%] text-center rounded-t-md ${design.bgColor}`}>
                    <h1 className="font-bold text-2xl">{title}</h1>
                    <p>created at: {new Date(date).toLocaleString()}</p>
                </div>
                <div className="w-full h-full p-4 flex flex-row justify-center items-center">
                    {message}
                </div>
                <div className={`w-full h-[15%] flex flex-row justify-around items-center rounded-t-md border-t-4 border-t-slate-300 p-2`}>
                    {
                        // if the modal contain a redirect link then we display the following button
                        redirectLink &&
                        <Button className="bg-cyan-400 hover:bg-cyan-400 text-white" variant="contained" endIcon={<ShortcutIcon/>} onClick={redirect}>Redirect</Button>
                    }
                    <Button className="bg-slate-400 hover:bg-slate-400 text-white" variant="contained" onClick={close}>Ok</Button>
                </div>
            </div>
        </div>
    );
}