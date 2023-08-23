import SidebarTitle from "./items/SidebarTitle.jsx";
import CreateIcon from '@mui/icons-material/Create';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function AdminSidebarItems() {

    const itemsAdminArray = [
        {
            title: "Account Management",
            items: [
                {
                    text: <p className="text-sm">Manage accounts</p>,
                    link: "/manage-accounts",
                    icon: <ManageAccountsIcon/>
                },
                {
                    text: <p className="text-sm">Manage customers</p>,
                    link: "/customers",
                    icon: <CreateIcon/>
                }
            ]
            
        },
    ];

    return (
        itemsAdminArray.map((action, index) =>
            <SidebarTitle key={index} title={action.title} items={action.items}/>
        ) // depending of the value of the user profile, we get some data object from the array and render them one by one on a SidebarItems component
    );
}