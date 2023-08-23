import { Schema } from "mongoose";

let channelThresholdSchema =  new Schema(
    {
        p1Parameters : {
            threshold1: {
                type: {type: Number, required: true},
                value: {type: Number, required: true},
                time: {type: Number, required: true},
                inhGrp: {type: Number, required: true},
                relayGrp: {type: Number, required: true},
            },
            threshold2: {
                type: {type: Number, required: true},
                value: {type: Number, required: true},
                time: {type: Number, required: true},
                inhGrp: {type: Number, required: true},
                relayGrp: {type: Number, required: true},
            },
        },
        p2Parameters : {
            threshold1: {
                type: {type: Number, required: true},
                value: {type: Number, required: true},
                time: {type: Number, required: true},
                inhGrp: {type: Number, required: true},
                relayGrp: {type: Number, required: true},
            },
            threshold2: {
                type: {type: Number, required: true},
                value: {type: Number, required: true},
                time: {type: Number, required: true},
                inhGrp: {type: Number, required: true},
                relayGrp: {type: Number, required: true},
            },
        },
        isValid: {type: Boolean, required: true},
    },
    {_id: false}
);

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let snapshotChannelsThresholds = new Schema(
    {
        cardChannelsThreshold : {
            type: [channelThresholdSchema],
            required: true
        },
        isValid:  {
            type: Boolean,
            required: true,
        }
    },
    {_id: false}
);

export default snapshotChannelsThresholds; // we export the snapshotData model