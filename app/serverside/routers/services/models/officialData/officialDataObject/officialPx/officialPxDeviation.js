import { Schema } from "mongoose";


let deviationSchema = new Schema(
    {
        fullScale: {type:Number, required:true},
        fullScaleValue: {type:Number, required:true},
        halfScaleValue: {type:Number, required:true},
        lowAverage: {type:Number, required:true},
        threshold: {
            time: {type:Number, required:true},
            inhibGroup: {type:Number, required:true},
            relayGroup: {type:Number, required:true}
        }
    },
    {_id: false}
);

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let officialPxDeviation = new Schema(
    {
        P1: {type:deviationSchema, required:true},
        P2: {type:deviationSchema, required:true},
    },
    {_id: false}
);

export default officialPxDeviation; // we export the snapshotData model