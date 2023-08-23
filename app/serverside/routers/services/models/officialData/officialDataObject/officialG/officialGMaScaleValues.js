import { Schema } from "mongoose";

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let officialGMaScaleValues = new Schema(
    {
        lowerScale: {type:[Number],required:true},
        upperScale: {type:[Number],required:true},
    },
    {_id: false}
);

export default officialGMaScaleValues; // we export the snapshotData model