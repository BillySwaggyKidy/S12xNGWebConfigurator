import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllNotifications } from '../../../../../actions/rootActions.js'; 
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationSection from './notificationSection/NotificationSection.jsx';

export default function NotificationAlert({userId}) {
    const { notificationList, success, error } = useSelector((state) => state.notification); // we get the loading, online and error var from the authentification reducer
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false); // this state define if the alert is open or not

    useEffect(()=>{ // at the first render of the component, we retrieved all of the notification from the user
        dispatch(getAllNotifications({host: userId}));
    },[])

    const openNotificationSection = () => {
        if (!open) dispatch(getAllNotifications({host: userId})); // if we are opening the alert, we retrieved all of the notification from the user
        setOpen(!open);
    };

    return (
        <div className='flex flex-col items-center justify-around'>
            <IconButton onClick={openNotificationSection}>
                <Badge color="primary" className='mr-4' badgeContent={notificationList.length} max={99}>
                    <NotificationsIcon color="action" />
                </Badge>
            </IconButton>
            {
                open &&
                <div className='absolute top-12 flex flex-col items-center z-[100]'>
                    <div className='w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[20px] border-b-gray border-solid'></div>
                    <NotificationSection userId={userId} userNotifications={notificationList} success={success} errorMsg={error}/>
                </div>
            }
        </div>
    );
}