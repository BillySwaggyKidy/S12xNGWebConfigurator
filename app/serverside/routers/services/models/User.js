import { Schema, models, model } from "mongoose";
import notificationModel from "./Notification.js";

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let user = new Schema(
    {
        username: {
            type: String,
        },
        password: {
            type: String,
        },
        profile: {
            type: String,
            enum : ['Viewer', 'Configurator', 'Admin']
        },
    },
    {collection: "Users"}
);

// after a user document is removed, we executed the following instructions
user.post('findOneAndDelete', async (doc)=>{
    // we find and remove the linked notifications document of the user
    let notificationsRemoved = await notificationModel.deleteMany({host: doc._id});
    if (notificationsRemoved) {
        console.log('\x1b[32m%s\x1b[0m', "[User Model]: notifications linked  succefully removed");
    }
    else {
        console.log('\x1b[31m%s\x1b[0m', "[Configuration Model]: Error while trying to remove the notifications");
    }
});

// a very important line if you work on HMR environnement, we first check if the model already exist if yes then we get or else we create it.
// it is because on the server side when we reload the files after change, we are not deleting the model so we must retrieved it instead of creating it twice.
const userModel = models['Users'] || model('Users', user);

export default userModel; // we export the user model