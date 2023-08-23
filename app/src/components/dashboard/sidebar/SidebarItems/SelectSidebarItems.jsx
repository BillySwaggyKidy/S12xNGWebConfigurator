import SidebarTitle from "./items/SidebarTitle.jsx";
import CreateIcon from '@mui/icons-material/Create';

export default function SelectSidebarItems() {
    const itemsSelectArray = [
        {
            title: "Configuration",
            items: [
                {
                    text: <p className="text-sm">Choose customer</p>,
                    link: "/customers",
                    icon: <CreateIcon/>
                }
            ]
        },
    ]; // this var contain object of data for each item, each object contain the title, the text a link for react-router then an icon component to display

    return (
        itemsSelectArray.map((action, index) =>
            <SidebarTitle key={index} title={action.title} items={action.items}/>
        ) // depending of the value of the user profile, we get some data object from the array and render them one by one on a SidebarItems component
    );
}