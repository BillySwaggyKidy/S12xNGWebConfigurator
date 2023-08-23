import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function ItemSection({urlPath}) {
    const navigate = useNavigate(); // useNavigate is a React Router Hooks to navigate programmatically trougth route

    // this function redirect the user back to the main page
    const goBackToMain = () => {
        // this function has the same purpose as the buildLinkObjectList function from the BreadcrumbLinks
        // except we try to set the correct stateObject in order to go back correctly to the url
        let stateObject = {};
        let idValue = "";

        urlPath.split("/").filter((path)=>path != "").forEach((path, index) => {
            if (!(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/.test(path))) {
                stateObject = idValue ? {paramObject:{id:idValue}} : null;
                idValue = "";
            }
            else {
                idValue = path;
            }
        });

        navigate(urlPath, {
            state: stateObject
        });
    };

    return (
        <div className="flex flex-col items-center h-full w-full">
            <div className="h-[92%] w-full">
                <div className="flex flex-col items-start justify-start">
                    <div className="text-start bg-slate-200 hover:bg-slate-300 w-full p-2 cursor-pointer" onClick={()=>navigate("/profile/information")}>
                        <p className="pl-2">My informations</p>
                    </div>
                    <div className="text-start bg-slate-200 hover:bg-slate-300 w-full p-2 cursor-pointer" onClick={()=>navigate("/profile/password")}>
                        <p className="pl-2">Password</p>
                    </div>
                </div>
            </div>
            <div className="h-[8%] w-full mt-2">
                <Button className="bg-red-400 hover:bg-red-300 w-full h-full text-black" size="large" variant="contained" onClick={goBackToMain}>Go back</Button>
            </div>
        </div>
    );
};