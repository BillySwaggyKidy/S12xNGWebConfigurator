import { Schema } from "mongoose";

let channelCalibrationSchema = new Schema(
    {
        detOffset: {type: Number, required: true},
        gain: {type: Number, required: true},
        offset: {type: Number, required: true},
        smooth: {type: Number, required: true},
        isValid: {type: Boolean, required: true},
    },
    {_id: false}
);

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let snapshotChannelsCalibrations = new Schema(
    {
        cardChannelsCalibration : {
            type: [channelCalibrationSchema],
            required: true
        },
        isValid:  {
            type: Boolean,
            required: true,
        }
    },
    {_id: false}
);

export default snapshotChannelsCalibrations; // we export the snapshotData model