import { Outlet, useLocation } from 'react-router';
import BreadcrumbLinks from "../../../utils/BreadcrumbLinks/BreadcrumbLinks.jsx";

// this component is reserved to only Admin user
export default function Administration(props) {
    const location = useLocation();
    return (
        <div className='w-full h-full flex flex-col items-center overflow-y-auto bg-admin bg-cover'>
            <div className="w-full h-[5%] flex flex-row justify-center items-center bg-gray-300/50">
                <BreadcrumbLinks urlPath={location.pathname}/>
            </div>
            <div className="w-full h-[96%]">
                <Outlet/>
            </div>
        </div>
    );
}