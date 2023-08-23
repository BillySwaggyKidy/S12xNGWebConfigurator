import userModel from "./models/User.js";
import { comparePassword, hashPassword } from './hash/hashPassword.js';
import { ServerResponseStatus } from "../../../utils/enums-utils.js";


const mongooseAuthentification = {
    loginUser: async (userData) => { // This function is used to retrived the user data from the MongoDB and compare it with the password send by the request
        let user = await userModel.findOne({username: new RegExp(`^${userData.username}$`, 'i')}).exec(); // We are waiting for a response from the MongoDB to find if by the username there is a user store in the DB
        if (user) { // if the user exist
            return await comparePassword(userData.password, user.password) ? user : ServerResponseStatus.CannotOperate; // we check the password sended by the user with the password from the DB, if it the same then we return the object or else return null
        }
        else { // if the array don't contain anything then we return null
            return ServerResponseStatus.WrongId;
        }
    },
    editUserInfo: async (userId, userObject) => {
        let user = await userModel.findById(userId).exec();
        if (user) {
            if (userObject.password) {
                userObject.password = await hashPassword(userObject.password); // first of all we hash the password so we add security into the user data
            }
    
            let updatedAccount = await userModel.findByIdAndUpdate(userId, userObject, {new: true}).exec(); // we update the document of the userId with the userObject
            return updatedAccount || ServerResponseStatus.CannotOperate; // we returned the updated document
        }
        else {
            return ServerResponseStatus.WrongId;
        }
    },
    deleteUser: async (userData) => {
        let response = await userModel.deleteOne({username: userData.username}).exec();
        return response.deletedCount ? "OK" : ServerResponseStatus.CannotOperate;
    }
}

export default mongooseAuthentification;