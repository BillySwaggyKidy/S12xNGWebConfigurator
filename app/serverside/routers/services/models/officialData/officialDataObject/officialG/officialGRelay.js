import { Schema } from "mongoose";

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let officialGRelay = new Schema(
    {
        groupMode: {type:Number,required:true},
        klaxonMode: {type:Number,required:true},
        groupFault: {type:Number,required:true},
        groupInsulationFault: {type:Number,required:true},
        state: {type:[Number],required:true}
    },
    {_id: false}
);

export default officialGRelay; // we export the snapshotData model