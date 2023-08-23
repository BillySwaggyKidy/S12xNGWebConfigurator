import userModel from "./models/User.js";
import { hashPassword } from './hash/hashPassword.js';
import { ServerResponseStatus } from "../../../utils/enums-utils.js";


const mongooseAccount = {
    addNewAdminAccount: async () => {
        let admin = await userModel.findOne({profile: "Admin"}).exec(); // we check if a admin account exist in the database
        if (!admin) { // if it does not exist
            let adminPassword = await hashPassword("S12xRoot!");
            let newAdminUser = new userModel({
                username: "Admin",
                password: adminPassword,
                profile: "Admin",
            }); // we creat a new accoutn with an Admin profile
            await newAdminUser.save(); // we save the change
        }
    },
    getAllUsers: async (adminId) => { // This function is used to retrived the user data from the MongoDB and compare it with the password send by the request
        let admin = await userModel.findById(adminId).exec(); // We are waiting for a response from the MongoDB to find if by the username there is a user store in the DB
        if (admin) { // if we have found the admin form the database then
            if (admin.profile == "Admin") {
                let users = (await userModel.find({profile: {$ne: "Admin"}}).lean().exec()).map((account)=>{
                    delete account.password;
                    return account;
                });
                return users;
            }
            else {
                return null;
            }
        }
        else { // if the array don't contain anything then we return null
            return null;
        }
    },
    addNewAccount: async (adminId, userObject) => { // This function is used to add a new user document in the database
        let admin = await userModel.findById({_id: adminId, profile: "Admin"}).exec(); // we check if the user performing the request is an admin
        if (admin) {
            const sameUserList = await userModel.find({username: userObject.username}).exec(); // we check if the name of the new user already exist in the database
            if (sameUserList.length == 0) { // if there is no user that already exist in the database with the same name
                userObject.password = await hashPassword(userObject.password); // first of all we hash the password so we add security into the user data
                let newUser = new userModel(userObject); // we create a new user model
                let userDoc = await newUser.save(); // we save the new user into the database
                return userDoc ? (await userModel.find({profile: {$ne: "Admin"}}).lean().exec()).map((account)=>{
                    delete account.password;
                    return account;
                }) : ServerResponseStatus.CannotOperate; // we retrieved all of the user except the admin accounts
            }
            else {
                return ServerResponseStatus.DuplicateIssue;
            }
        }
        else {
            return ServerResponseStatus.WrongId;
        }
    },
    editAccount: async (adminId, userId, userObject) => { // This function is used to edit a a user document in the database by using the user id 
        let admin = await userModel.findById({_id: adminId, profile: "Admin"}).exec(); // we check if the user performing the request is an admin
        if (admin) {
            if (userObject.password) {
                userObject.password = await hashPassword(userObject.password); // first of all we hash the password so we add security into the user data
            }
            let updatedAccount = await userModel.findByIdAndUpdate(userId, userObject).exec(); // we update the document of the userId with the userObject (username and password)
            return updatedAccount ? (await userModel.find({profile: {$ne: "Admin"}}).lean().exec()).map((account)=>{
                delete account.password;
                return account;
            }) : ServerResponseStatus.CannotOperate; // we retrieved all of the user except the admin accounts
        }
        else {
            return ServerResponseStatus.WrongId;
        }
    },
    removeOneAccount: async (adminId, userId) => {
        let admin = await userModel.findById({_id: adminId, profile: "Admin"}).exec(); // we check if the user performing the request is an admin
        if (admin) {
            let deletedAccount = await userModel.findByIdAndDelete(userId).exec(); // we remove the user document from the user
            return deletedAccount ? (await userModel.find({profile: {$ne: "Admin"}}).lean().exec()).map((account)=>{
                delete account.password;
                return account;
            }) : ServerResponseStatus.CannotOperate; // we retrieved all of the user except the admin accounts
        }
        else {
            return ServerResponseStatus.WrongId;
        }
    }
}

export default mongooseAccount;