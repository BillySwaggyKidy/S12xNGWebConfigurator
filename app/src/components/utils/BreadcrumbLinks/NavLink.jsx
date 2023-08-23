import { useNavigate } from "react-router-dom";

// this component represent the custom link in the BreadcrumbLinks component
export default function NavLink({name, path, state}) {
    const navigate = useNavigate();

    // when clicked it redirect the user to the appropriate section of the configuration
    const navigateToLinks = () => {
        navigate(path, {
            state: state
        });
    };

    return (
        <div className="flex flex-col items-center justify-center h-8 drop-shadow-lg rounded-lg bg-blue-400 hover:bg-blue-500 cursor-pointer p-2" onClick={navigateToLinks}>
            <p className="text-black select-none">{name}</p>
        </div>
    );
}