import { Schema } from "mongoose";

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let officialGChannel = new Schema(
    {
        type: {type:Number,required:true},
        isActive: {type:Number,required:true},
        decimal: {type:Number,required:true}
    },
    {_id: false}
);

export default officialGChannel; // we export the snapshotData model