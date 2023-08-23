import { Schema } from "mongoose";


let cardChannelsInfosSchema = new Schema(
    {
        type: {type: Number, required: true},
        decimal:  {type: Number, required: true},
        line1:  {type: String, required: true},
        line2: {type: String, required: true},
        isActive: {type: Boolean, required: true},
        isValid: {type: Boolean, required: true},
    },
    {_id: false}
);

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let snapshotChannelsInfos = new Schema(
    {
        cardChannelsInfo: {
            type: [cardChannelsInfosSchema],
            required: true,
        },
        isValid: {
            type:Boolean,
            required: true
        }
    },
    {_id: false}
);

export default snapshotChannelsInfos; // we export the snapshotData model