import { Schema } from "mongoose";

let averageSchema = new Schema(
    {
        isValid: {type: Boolean, required: true},
        isActive: {type: Boolean, required: true},
        decimal: {type: Number, required: true},
        line1: {type: String, required: true},
        line2:  {type: String, required: true},
        cardChannelsActivation: {type:[Number], required: true},
        p1Parameters: {
            type: {type: Number, required: true},
            value: {type: Number, required: true},
            time: {type: Number, required: true},
            inhGrp: {type: Number, required: true},
            relayGrp: {type: Number, required: true},
        },
        p2Parameters: {
            type: {type: Number, required: true},
            value: {type: Number, required: true},
            time: {type: Number, required: true},
            inhGrp: {type: Number, required: true},
            relayGrp: {type: Number, required: true},
        },
    },
    {_id: false}
);

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let snapshotOthersAverages = new Schema(
    {
        averagesList: {
            type: [averageSchema],
            required: true
        },
        isValid: {
            type : Boolean,
            required: true
        }
    },
    {_id: false}
);

export default snapshotOthersAverages; // we export the snapshotData model