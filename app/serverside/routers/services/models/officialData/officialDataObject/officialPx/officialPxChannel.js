import { Schema } from "mongoose";

let pxChannelSchema = new Schema(
    {
        type: {type:Number, required:true},
        value: {type:Number, required:true},
        time: {type:Number, required:true},
        inhGrp: {type:Number, required:true},
        relayGrp: {type:Number, required:true}
    },
    {_id: false}
);

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let officialPxChannel = new Schema(
    {
        detOffset: {type:Number, required:true},
        gain: {type:Number, required:true},
        offset: {type:Number, required:true},
        smooth: {type:Number, required:true},
        threshold: {
            P1: {type:[pxChannelSchema], required:true},
            P2: {type:[pxChannelSchema], required:true}
        }
    },
    {_id: false}
);

export default officialPxChannel; // we export the snapshotData model