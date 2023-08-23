import NotificationAlert from "./notificationAlert/NotificationAlert.jsx";
import Profile from "./profile/Profile.jsx";

// this component represent the user section when the user is connected
export default function UserInfo({userData}) {
    return (
        <div className='flex flex-row items-center justify-between'>
            <NotificationAlert userId={userData._id}/>
            <Profile name={userData.username}/>
        </div>
    );
}