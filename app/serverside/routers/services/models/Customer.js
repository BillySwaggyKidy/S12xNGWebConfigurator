import { Schema, models , model} from "mongoose";
import configurationModel from "./Configuration.js";

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let customer = new Schema(
    {
        name : {
            type: String,
            required: true
        },
        code : {
            type: String,
            required: true
        },
        createdAt: {
            type : Date,
            default: Date.now
        }
    },
    {collection: "Customers"}
);

// after a customer document is removed, we executed the following instructions
customer.post('findOneAndDelete', async function(doc) {
    // we get all of the configurations linked to the customer
    let allConfigurationsOfCustomer = await configurationModel.find({customerId: doc._id}).exec();
    // then we delete each one
    allConfigurationsOfCustomer.forEach(async (config)=>{
        config = config.toObject();
        await configurationModel.findByIdAndDelete(config._id).exec();
    });
    console.log('\x1b[32m%s\x1b[0m', `[Customer Model]: ${allConfigurationsOfCustomer.length} configurations removed`);
});

// a very important line if you work on HMR environnement, we first check if the model already exist if yes then we get or else we create it.
// it is because on the server side when we reload the files after change, we are not deleting the model so we must retrieved it instead of creating it twice.
const customerModel = models['Customers'] || model('Customers', customer);

export default customerModel; // we export the customer model