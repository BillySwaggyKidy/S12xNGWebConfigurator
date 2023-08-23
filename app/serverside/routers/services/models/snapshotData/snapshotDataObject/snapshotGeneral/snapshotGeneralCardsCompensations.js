import { Schema } from "mongoose";

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let snapshotGeneralCardsCompensations = new Schema(
    {
        card : {
            type: [
                {
                    type: {type: Number,required: true},
                    unit: {type: Number,required: true},
                    hysteresis: {type: Number,required: true},
                    compensation: {type: Number,required: true},
                    isValid: {type: Boolean,required: true},
                }
            ],
            required: true
        },
        sensorNb: {
            type : Number,
            required: true
        },
        isValid: {
            type : Boolean,
            required: true
        }
    },
    {_id: false}
);

export default snapshotGeneralCardsCompensations; // we export the snapshotData model