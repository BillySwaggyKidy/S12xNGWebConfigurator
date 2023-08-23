import { Schema } from "mongoose";

let channelMascaleSchame = new Schema(
    {
        lowScale: {type: Number, required: true},
        highScale: {type: Number, required: true},
        isValid: {type: Boolean, required: true}
    },
    {_id: false}
);

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let snapshotChannelsMascales = new Schema(
    {
        cardChannelsMascale: {
            type: [channelMascaleSchame],
            required: true
        },
        isValid: {
            type: Boolean,
            required: true
        }
    },
    {_id: false}
);

export default snapshotChannelsMascales; // we export the snapshotData model