import { Outlet } from 'react-router';

export default function MainSection() {

    return (
        <div className="w-full h-full flex flex-row justify-start items-center p-2">
            <Outlet/>
        </div>
    );
};