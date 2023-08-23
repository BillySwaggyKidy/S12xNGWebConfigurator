import userModel from './models/User.js';
import customerModel from './models/Customer.js';
import { ServerResponseStatus } from "../../../utils/enums-utils.js";

const mongooseCustomer = {
    getAllCustomers: async (hostId) => { // This function is used to retrived all the customers data from the MongoDB
        let user = await userModel.findById(hostId).exec(); // We are waiting for a response from the MongoDB to find by the id if the user actually exist
        if (user) { // if the user exist
            return await customerModel.find({}).exec(); // we return all the customers document from the database
        }
        else { // or else if it don't exist
            return null;
        }
    },
    addNewCustomer: async (hostId, customerObject) => { // This function is used to add a new customer document into the database
        let user = await userModel.findById(hostId).exec(); // We are waiting for a response from the MongoDB to find by the id if the user actually exist
        if (user) { // if the user exist
            // first we check if a customer document with the same name or same code already exist to prevent duplicate because customer's name and code are unique
            let sameCustomer = await customerModel.findOne({$or:[{name: customerObject.name}, {code: customerObject.code}]}).exec();
            if (!sameCustomer) { // if there is no customer with the same name or code as the customerObject then
                let newCustomer = new customerModel({
                    name: customerObject.name,
                    code: customerObject.code
                }); // we create a new customer Model
                return newCustomer.save().then(async (resp) => { // we save the new customer into the database
                    return newCustomer === resp ? await customerModel.find({}).exec() : ServerResponseStatus.CannotOperate;
                });
            }
            else {
                return ServerResponseStatus.DuplicateIssue;
            }
        }
        else { // or else if it don't exist
            return ServerResponseStatus.WrongId;
        }
    },
    removeOneCustomer: async (adminId, customerId) => { // This function is used to remove a customer document from the database
        let admin = await userModel.find({_id: adminId, profile: "Admin"}).exec(); // we check if the user who made the request has an admin profile
        if (admin) { // if the adminId is indeed a id of an Admin profile then
            let customerRemoved = await customerModel.findByIdAndDelete(customerId).exec(); // we find by the customerId var the document and delete it.
            return customerRemoved ? await customerModel.find({}).exec() : ServerResponseStatus.CannotOperate; // we send back the new customer list
        }
        else {
            return ServerResponseStatus.PermissionIssue;
        }
    },
};

export default mongooseCustomer;