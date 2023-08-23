import Sidebar from './sidebar/Sidebar.jsx';
import Workbench from './workbench/Workbench.jsx';

export default function Dashboard(){
    return (
        <div className='basis-[95%] flex flex-row'>
            <Sidebar/>
            <Workbench/>
        </div>
    );
};