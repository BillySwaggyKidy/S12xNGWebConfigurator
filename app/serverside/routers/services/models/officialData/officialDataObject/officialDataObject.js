import { Schema } from "mongoose";
import officialGRelay from "./officialG/officialGRelay.js";
import officialGCard from "./officialG/officialGCard.js";
import officialGChannel from "./officialG/officialGChannel.js";
import officialGMean from "./officialG/officialGMean.js";
import officialGGradient from "./officialG/officialGGradient.js";
import officialGDeviation from "./officialG/officialGDeviation.js";
import officialGCompensation from "./officialG/officialGCompensation.js";
import officialGText from "./officialG/officialGText.js";
import officialGSoft from "./officialG/officialGSoft.js";
import officialGMaScaleValues from "./officialG/officialGMaScaleValues.js";
import officialPxCommutationTime from "./officialPx/officialPxCommutationTime.js";
import officialPxChannel from "./officialPx/officialPxChannel.js";
import officialPxDeviation from "./officialPx/officialPxDeviation.js";
import officialPxGradient from "./officialPx/officialPxGradient.js";
import officialPxMean from "./officialPx/officialPxMean.js";
import officialMeta from "./officialMeta/officialMeta.js";

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let officialDataObject = new Schema(
    {
        language: {type: Number, required: true},
        g: {
            relay: officialGRelay,
            card: {type:[officialGCard],required:true},
            channel: {type:[officialGChannel],required:true},
            mean: {type:[officialGMean],required:true},
            gradient: {type:[officialGGradient],required:true},
            deviation: {type:[officialGDeviation], required: true},
            compensation: officialGCompensation,
            text: {type:[officialGText],required:true},
            soft: officialGSoft,
            mAScaleValues: officialGMaScaleValues
        },
        px: {
            commutationTime: officialPxCommutationTime,
            channel: {type:[officialPxChannel],required:true},
            deviation: {type:[officialPxDeviation],required:true},
            gradient: {type:[officialPxGradient],required:true},
            mean: {type:[officialPxMean],required:true},
        },
        meta: officialMeta,
    },
    {_id: false}
);

export default officialDataObject; // we export the snapshotData model