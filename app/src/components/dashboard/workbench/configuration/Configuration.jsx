import { Outlet, useLocation } from 'react-router';
import BreadcrumbLinks from "../../../utils/BreadcrumbLinks/BreadcrumbLinks.jsx";

// this component is reserved to only Viewer and Configurator account
export default function Configuration(props) {
    const location = useLocation();

    return (
        <div className='w-full h-full flex flex-col items-center bg-slate-800'>
            <div className="w-full h-[5%] flex flex-row justify-center items-center bg-gray-300/50">
                <BreadcrumbLinks urlPath={location.pathname} endPath={["handle"]}/>
            </div>
            <div className="w-full h-[96%]">
                <Outlet/>
            </div>
        </div>
    );
}