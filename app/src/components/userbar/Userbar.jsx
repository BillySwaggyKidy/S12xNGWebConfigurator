import Paper from "@mui/material/Paper";
import SideButton from "./sideButton/SideButton.jsx";
import UserSection from "./userSection/UserSection.jsx";

export default function Userbar(props) {
    return(
        <Paper className='basis-[5%] bg-slate-300'>
            <div className="grid grid-cols-10 h-full">
                <div className="col-start-1 col-end-3">
                    <SideButton/>
                </div>
                <div className="col-start-4 col-end-8 flex justify-center items-center pr-2">
                    <h1 className="font-bold text-3xl">S12xNG Web Configurator</h1>
                </div>
                <div className="col-start-9 col-end-11 flex justify-end items-center pr-2">
                    <UserSection/>
                </div>
            </div>
        </Paper>
    );
}