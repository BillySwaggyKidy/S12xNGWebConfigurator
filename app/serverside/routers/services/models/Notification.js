import { Schema, models, model } from "mongoose";

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let notification = new Schema(
    {
        host: {
            type: Schema.Types.ObjectId,
        },
        title: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        redirectTo: {
            type: String,
        },
        read: {
            type: Boolean,
            required: true
        },
        status: {
            type: String,
            enum : ['Error', 'Warning', 'Success', 'Info', 'Request'],
            required: true
        },
        createdAt: {
            type : Date,
            default: Date.now
        }
    },
    {collection: "Notifications"}
);

// a very important line if you work on HMR environnement, we first check if the model already exist if yes then we get or else we create it.
// it is because on the server side when we reload the files after change, we are not deleting the model so we must retrieved it instead of creating it twice.
const notificationModel = models['Notifications'] || model('Notifications', notification);

export default notificationModel; // we export the use model