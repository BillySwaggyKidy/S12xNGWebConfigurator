import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { deleteAllNotifications } from '../../../../../../actions/rootActions.js';
import NotificationItem from './notificationItem/NotificationItem.jsx';

// this component is the notification feed on the notification alert component
export default function NotificationSection({userId, userNotifications, success, errorMsg}) {
    const dispatch = useDispatch();

    const deleteAllNotifItems = () => { // this function delete all of the user notifications from the database
        dispatch(deleteAllNotifications({host: userId})); // we call an action to deleteAll of the Notifications
    };
    const notifListBool = userNotifications.length > 0; // we store in a var if the notification list is empty or not

    return (
        <div className="w-[350px] h-[350px] p-0 bg-slate-300 rounded-lg animate-fade-in-down">
            <div className='h-[10%] text-center border-b-2 border-b-black'>
                <h2 className='font-bold text-xl'>Notifications Alert</h2>
            </div>
            <div className='h-[78%] bg-slate-100 p-2 overflow-y-auto'>
                {
                    // if we have successfully retrieved all of the notification from the user and the list is not empty then
                    (success && notifListBool) ?
                    // we display the notifications items sorted by their date of creation
                    [...userNotifications].sort(function(a,b) {
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    }).map((notification)=>
                        <NotificationItem key={notification._id} id={notification._id} title={notification.title} message={notification.message} redirectTo={notification.redirectTo} read={notification.read} status={notification.status} date={notification.createdAt}/>
                    ) :
                    // or we display a message to say there is no notification if it's empty or if there is an actual server error
                    <div className='flex flex-row justify-center items-center'>
                        <p className={!notifListBool ? 'text-black' : 'text-red-500'}>{!notifListBool ? "You don't have any notifications" : errorMsg}</p>
                    </div>
                }
            </div>
            <div className={`h-[12%] flex flex-row justify-center items-center rounded-b-lg ${!notifListBool ? "bg-red-300 cursor-default pointer-events-none" : "bg-red-500 cursor-pointer"} hover:bg-red-400`} onClick={deleteAllNotifItems}>
                <p className='text-base font-medium text-white'>Clear all notifications</p>
            </div>
        </div>
    );
}