
import { useSelector } from 'react-redux';
import AuthSection from "./authSection/AuthSection.jsx";
import UserInfo from "./userInfo/UserInfo.jsx";

export default function UserSection() {
    // we use the useState and useEffect to fight against the SSR hydration problem
    const { online, userInfo } = useSelector((state) => state.authentification); // we get the online and userInfo var from the authentification reducer

    return (
        online ? <UserInfo userData={userInfo}/> : <AuthSection/>
    );
}