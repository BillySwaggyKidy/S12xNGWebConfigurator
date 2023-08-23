import { Schema } from "mongoose";

let deviationSchema = new Schema(
    {
        isValid: {type: Boolean, required: true},
        isActive: {type: Boolean, required: true},
        p1Parameters: {
            lowAverage: {type: Number, required: true},
            fullScale: {type: Number, required: true},
            fullScaleValue: {type: Number, required: true},
            halfScaleValue: {type: Number, required: true},
            time: {type: Number, required: true},
            inhGrp: {type: Number, required: true},
            relayGrp: {type: Number, required: true},
        },
        p2Parameters: {
            lowAverage: {type: Number, required: true},
            fullScale: {type: Number, required: true},
            fullScaleValue: {type: Number, required: true},
            halfScaleValue: {type: Number, required: true},
            time: {type: Number, required: true},
            inhGrp: {type: Number, required: true},
            relayGrp: {type: Number, required: true},
        },
    },
    {_id: false}
);

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let snapshotOthersDeviations = new Schema(
    {
        deviationsList: {
            type: [deviationSchema],
            required: true
        },
        isValid: {
            type : Boolean,
            required: true
        }
    },
    {_id: false}
);

export default snapshotOthersDeviations; // we export the snapshotData model