import { Schema } from "mongoose";

let gradientSchema = new Schema(
    {
        threshold: {
            type: {type:Number, required:true},
            value: {type:Number, required:true},
            time: {type:Number, required:true},
            inhibGroup: {type:Number, required:true},
            relayGroup: {type:Number, required:true}
        }
    },
    {_id: false}
);

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let officialPxGradient = new Schema(
    {
        P1: {type:gradientSchema,required:true},
        P2: {type:gradientSchema,required:true}
    },
    {_id: false}
);

export default officialPxGradient; // we export the snapshotData model