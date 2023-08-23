import { Schema } from "mongoose";

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let snapshotGeneralInfo = new Schema(
    {
        configurationName: {
            deviceType: {type: Number,required: true},
            firmwareVersion: {type: String,required: true},
            affairNumber: {type: String,required: true},
            ofNumber: {type: String,required: true},
            suffixCode: {type: String,required: true},
            isValid: {type: Boolean,required: true}
        },
        parameterConf:{
            language: {type: Number,required: true},
            accessCode: {type: String,required: true},
            versionSoft: {type: String,required: true},
            versionConf: {type: String,required: true},
            P1ToP2: {type: Number,required: true},
            P2ToP1: {type: Number,required: true},
            commCardType: {type: Number,required: true},
            isValid: {type: Boolean,required: true}
        },
        RS485: {
            parity: {type: Number,required: true},
            speed: {type: Number,required: true},
            isValid: {type: Boolean,required: true}
        },
        ethernetRJ45: {
            ipAddress: {type: String,required: true},
            netmask: {type: String,required: true},
            gateWay: {type: String,required: true},
            isValid: {type: Boolean,required: true}
        },
        isValid: {
            type:Boolean,
            required: true
        }
    },
    {_id: false}
);

export default snapshotGeneralInfo; // we export the snapshotData model