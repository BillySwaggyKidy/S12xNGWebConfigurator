import userModel from "./models/User.js";
import notificationModel from './models/Notification.js';
import { ServerResponseStatus } from "../../../utils/enums-utils.js";

const mongooseNotification = {
    sendRequestToAdmin:  async (username) => { // this function is used to add a notification model linked to the admin user in the mongodb database
        let host = await userModel.findOne({username: new RegExp(`^${username}$`, 'i')}).exec(); // we retrieved the host user document
        let admin = await userModel.findOne({profile: "Admin"}).exec(); // we retrieved the admin user document
        if (host && admin) { // if both the host and admin documents exist in the database then
            let newNotification = new notificationModel({
                host: admin._id, // we linked the notification to the admin id because we send a notification with a request status to the admin in order to change the password
                title: `[${username}]: Change password request`,
                message: `The user: ${username} with the following profile ${host.profile}, \n ask to change his password`, // we add the host username and profile to help during the changing password process
                redirectTo: "/manage-accounts",
                read: false,
                status: "Request"
            }); // we create a new notification Model
            return newNotification.save().then(resp => { // we save the new notification into the database
                return newNotification === resp ? "OK" : ServerResponseStatus.CannotOperate;
            });
        }
        else {
            return ServerResponseStatus.WrongId;
        }
    },
    addNotification: async (newObject) => { // this function is used to add a notification model linked to a given user id in the mongodb database
        let newNotification = new notificationModel({
            host: newObject.host,
            title: newObject.title,
            message: newObject.message,
            redirectTo: newObject.redirectTo,
            read: false,
            status: newObject.status
        }); // we create a new notification Model linked to the user from the newObject var

        return newNotification.save().then(resp => { // we save the new notification into the database
            return newNotification === resp ? "OK" : null;
        });
    },
    readNotification: async (notificationId) => { // This function is used to change the read property to true of the notification from his id
        let readNotification = await notificationModel.findByIdAndUpdate(notificationId, {read: true}).exec();
        return readNotification || null;
    },
    deleteAllNotifications: async (hostId) => { // This function is used to delete all the notification of the user from his id
        let notificationsRemoved = await notificationModel.deleteMany({host: hostId}).exec();
        return notificationsRemoved.deletedCount > 0 ? await notificationModel.find({host: hostId}).exec() : null;
    },
    deleteOneNotification: async (notificationId) => { // This function is used to delete the notification of a user from his id
        let notificationRemoved = await notificationModel.findByIdAndDelete(notificationId).exec();
        return notificationRemoved ? await notificationModel.find({host: notificationRemoved.host}).exec() : null; // we retrieved the new user's notification list and send it back
    },
    getAllNotifications: async (hostId) => { // This function is used to retrived all the notifications data of the user
        let notificationList = await notificationModel.find({host: hostId}).lean().exec();
        return notificationList; // we retrieved the empty user's notification list and send it back
    },

}

export default mongooseNotification;