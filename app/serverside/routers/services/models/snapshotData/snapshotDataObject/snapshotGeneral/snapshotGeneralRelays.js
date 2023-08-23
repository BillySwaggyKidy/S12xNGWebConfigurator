import { Schema } from "mongoose";

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let snapshotGeneralRelays = new Schema(
    {
        configuration: {
            relay1: {type: Number,required: true},
            relay2: {type: Number,required: true},
            relay3: {type: Number,required: true},
            relay4: {type: Number,required: true},
            relay5: {type: Number,required: true},
            relay6: {type: Number,required: true},
            relayKlaxon: {type: Number,required: true},
            isValid: {type: Boolean,required: true}
        },
        group: {
            groupMode: {type: Number,required: true},
            klaxonMode: {type: Number,required: true},
            groupFault: {type: Number,required: true},
            groupInsulationFault: {type: Number,required: true},
            isValid: {type: Boolean,required: true},
        },
        isValid: {type: Boolean,required: true},
    },
    {_id: false}
);

export default snapshotGeneralRelays; // we export the snapshotData model