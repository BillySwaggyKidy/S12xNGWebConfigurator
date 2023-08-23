import SidebarItem from "./SidebarItem.jsx";

// this component is the title that group items from the sidebar
export default function SidebarTitle({title, items}) {
    return (
        <div className='flex flex-col items-start pl-1 mt-2'>
            <p className='font-bold my-2 select-none'>{title}</p>
            {
                items.map((item, index)=>
                    <SidebarItem key={index} icon={item.icon} textElement={item.text} link={item.link}/>
                )
            }
        </div>
    );
}