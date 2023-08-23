import mongoose from "mongoose";
import mongooseAccount from "../mongooseAccount.js";
import { envIsDevelopment } from "../../../envmode/envUtil.js";

const urlObject = {
    mongodb:'mongodb+srv://s12X-Web-Config:S12xNG@atlas.ijsmmbl.mongodb.net/?retryWrites=true&w=majority',

} // this object contain the url of the mongodb cluster
//mongodb+srv://s12X-Web-Config:s12xNGweb@atlas.ijsmmbl.mongodb.net

const getMongoDBUrl = () => {
    const mongoDbUrl = urlObject.mongodb;
    const endUrl = mongoDbUrl.lastIndexOf("/");
    let baseMongoDbUrl = mongoDbUrl.slice(0, endUrl+1);
    let mongodbParameters = mongoDbUrl.slice(endUrl+1);
    return `${baseMongoDbUrl}${envIsDevelopment() ? "test" : "prod"}${mongodbParameters}`; 
}; // this function return the mongodb database depending of the environnement

console.log(`Connect to: ${getMongoDBUrl()}`);
// we connect to the mongodb data only once so every request we don't create a new session.
let mongooseConnection = mongoose.connect(getMongoDBUrl(),{useNewUrlParser: true},{ useUnifiedTopology: true });

mongooseAccount.addNewAdminAccount();

export default mongooseConnection;

export const disconnectMongoDB = () => {
    mongoose.disconnect();
}; // this function disconnect mongoose from the database