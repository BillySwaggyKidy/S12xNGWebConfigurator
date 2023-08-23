import { Schema, models , model} from "mongoose";
import snapshotDataModel from "./snapshotData/SnapshotData.js";
import officialDataModel from "./officialData/OfficialData.js";

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let configuration = new Schema(
    {
        customerId : {
            type: Schema.Types.ObjectId,
            required: true
        },
        creatorId : {
            type: Schema.Types.ObjectId,
        },
        name: {
            type: String,
            required: true
        },
        version : {
            type: Number,
            required: true
        },
        affairNumber : {
            type: String,
            required: true
        },
        deviceType : {
            type: String,
            required: true
        },
        firmwareVersion : {
            type: String,
            required: true
        },
        ofNumber : {
            type: String,
            required: true
        },
        suffixCode : {
            type: String,
            required: true
        },
        editedBy : {
            type: String,
            required: true
        },
        createdAt: {
            type : Date,
            default: Date.now
        }
    },
    {collection: "Configurations"}
);

// after a configuration document is removed, we executed the following instructions
configuration.post('findOneAndDelete', async (doc)=>{
    // we find and remove the linked snapshotData document
    let snapshotDataRemoved = await snapshotDataModel.findOneAndRemove({configurationId: doc._id});
    // we find and remove the linked officialData document
    let officialDataRemoved = await officialDataModel.deleteMany({configurationId: doc._id});
    if (snapshotDataRemoved && officialDataRemoved) {
        console.log('\x1b[32m%s\x1b[0m', "[Configuration Model]: configuration linked snapshot and official succefully removed");
    }
    else {
        console.log('\x1b[31m%s\x1b[0m', "[Configuration Model]: Error while trying to remove the snapshot and official data");
    }
});

// a very important line if you work on HMR environnement, we first check if the model already exist if yes then we get or else we create it.
// it is because on the server side when we reload the files after change, we are not deleting the model so we must retrieved it instead of creating it twice.
const configurationModel = models['Configurations'] || model('Configurations', configuration);

export default configurationModel; // we export the configuration model