import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function AuthSection() {
    const navigate = useNavigate(); // useNavigate is a React Router Hooks to navigate programmatically trougth route

    return (
        <div className="flex flex-row">
            <Button className='bg-purple-800 hover:bg-purple-700' size="small" onClick={() => navigate("/login")}>Login</Button>
        </div>
    );
}