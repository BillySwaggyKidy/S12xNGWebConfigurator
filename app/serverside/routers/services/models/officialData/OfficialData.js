import { Schema, models , model} from "mongoose";
import officialDataObject from "./officialDataObject/officialDataObject.js";

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let officialData = new Schema(
    {
        configurationId : {
            type: Schema.Types.ObjectId,
            required: true
        },
        version: {
            type: Number,
            required: true,
        },
        data: officialDataObject,
        createdAt: {
            type : Date,
            default: Date.now
        }
    },
    {collection: "OfficialData"}
);

// a very important line if you work on HMR environnement, we first check if the model already exist if yes then we get or else we create it.
// it is because on the server side when we reload the files after change, we are not deleting the model so we must retrieved it instead of creating it twice.
const officialDataModel = models['OfficialData'] || model('OfficialData', officialData);

export default officialDataModel; // we export the officialData model
