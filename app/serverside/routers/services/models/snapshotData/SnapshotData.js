import { Schema, models , model} from "mongoose";
import configurationModel from "../Configuration.js";
import snapshotDataObject from "./snapshotDataObject/snapshotDataObject";

Schema.Types.String.checkRequired(v => v != null); // we tell mongoose that for each string type, we check only if the value is not null so that empty is accepted
Schema.Types.Number.checkRequired(v => !["string","undefined"].includes(typeof v)); // we tell mongoose that for each number type, we check only if the value is not a string

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let snapshotData = new Schema(
    {
        configurationId : {
            type: Schema.Types.ObjectId,
            required: true
        },
        data: snapshotDataObject,
        updatedAt: {
            type : Date,
            default: Date.now
        }
    },
    {collection: "SnapshotData"}
);

// after a snapshot document is updated, we executed the following instructions
snapshotData.post('findOneAndUpdate', async (doc)=>{
    // we find the configuration document by using the configurationId
    let updatedConfiguration = await configurationModel.findById(doc.configurationId).exec();
    if (updatedConfiguration) {
        // we update the name's informations using the updated snapshotData data
        const configurationName = doc.data.general.informations.configurationName; // we get the new configuration's name informations from in the general informations section
        updatedConfiguration.deviceType = configurationName.deviceType;
        updatedConfiguration.firmwareVersion = configurationName.firmwareVersion;
        updatedConfiguration.affairNumber = configurationName.affairNumber;
        updatedConfiguration.ofNumber = configurationName.ofNumber;
        updatedConfiguration.suffixCode = configurationName.suffixCode;
        updatedConfiguration.name = `S${configurationName.deviceType}_Fw${configurationName.firmwareVersion}_${configurationName.affairNumber}_${configurationName.ofNumber}_${configurationName.suffixCode}`;
        await updatedConfiguration.save(); // we save the change made to the configuration document
    }
}); 

// a very important line if you work on HMR environnement, we first check if the model already exist if yes then we get or else we create it.
// it is because on the server side when we reload the files after change, we are not deleting the model so we must retrieved it instead of creating it twice.
const snapshotDataModel = models['SnapshotData'] || model('SnapshotData', snapshotData);

export default snapshotDataModel; // we export the snapshotData model
