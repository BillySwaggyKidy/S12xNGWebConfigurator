import userModel from './models/User.js';
import customerModel from './models/Customer.js';
import configurationModel from './models/Configuration.js';
import snapshotDataModel from './models/snapshotData/SnapshotData.js';
import officialDataModel from "./models/officialData/OfficialData.js";
import { ServerResponseStatus, HandleModeStatus } from "../../../utils/enums-utils.js";
import defaultSnapshotDataValues from "./initials/defaultSnapshotDataValues/defaultSnapshotDataValues.js";
import convertOfficialConfToSnapshot from "./convert/officialToSnapshot/officialToSnapshot.js";


const mongooseConfiguration = {
    getAllConfigurations: async(customerId) => { // This function is used to get all of the configurations of a specified customer
        let configDataObject = {
            customerData : null,
            configurationsList :  []
        }; // we create object that will contain the result of the customer data and the configuration list
        let customer = await customerModel.findById(customerId).exec(); // we check if the specified user exist in the database
        if (customer) { // if it exist then
            configDataObject.customerData = customer; // we put the customer data in the result object
            let configurations = await configurationModel.find({customerId: customerId}).lean().exec(); // we get all of the configuration linked to the user
            configDataObject.configurationsList = configurations ?? null; // we put it in the result object
            return configDataObject;
        }
        else {
            return null;
        }
    },
    addNewConfiguration: async (hostId, customerId, configurationObject) => { // This function is used to add a new configuration ducument into the database
        let user = await userModel.findById(hostId).exec(); // We are waiting for a response from the MongoDB to find by the id if the user actually exist
        let customer = await customerModel.findById(customerId).exec(); // We are waiting for a response from the MongoDB to find by the id if the customer actually exist
        if (user && customer) { // if the user and the customer exist
            // first we check if a configuration document with the same name already exist to prevent duplicate because configuration's name is unique
            let sameConfifugration = await configurationModel.findOne({name: configurationObject.name}).exec();
            if (!sameConfifugration) { // if there is no configuration in the database with the same name as the configurationObject then
                let newConfiguration =  new configurationModel({
                    customerId: customerId,
                    creatorId: hostId ?? null,
                    version: 0,
                    editedBy: "", // we tell that the cloned config is not yet edited by a user
                    ...configurationObject
                });
    
                let configurationDoc = await newConfiguration.save(); // we save the new configuration into the database
                if (configurationDoc) { // if the configuration has been saved then
                    let newDefaultSnapshotDataValues = JSON.parse(JSON.stringify(defaultSnapshotDataValues));
                    newDefaultSnapshotDataValues.general.informations.configurationName = configurationObject; // we put the same data in the configurationName object of the generalInfo
                    newDefaultSnapshotDataValues.general.informations.parameterConf.accessCode = configurationObject.suffixCode; // we also put the same accessCode than the suffixCode of the configurationObject

                    // we create his snapshot model
                    let newSnapshotConfiguration = new snapshotDataModel({
                        configurationId: configurationDoc._id, // we link the snapshot with new configuration id,
                        data: newDefaultSnapshotDataValues
                    });

                    // we save snapshot document into the database
                    return newSnapshotConfiguration.save().then(async (doc) => {
                        // if the document has been saved we return the new configuration list or else we return a ServerResponseStatus
                        return newSnapshotConfiguration === doc ? await configurationModel.find({customerId: customerId}).exec() : ServerResponseStatus.CannotOperate;
                    });
                }
                else {
                    return ServerResponseStatus.CannotOperate;
                }
            }
            else {
                return ServerResponseStatus.DuplicateIssue;
            }
        }
        else { // if the user or customer don't exist in the database
            return ServerResponseStatus.WrongId;
        }
    },
    duplicateOneConfiguration: async (hostId, customerId, configurationId) => { // This function is used to duplicate configuration ducument into the database
        let user = await userModel.findById(hostId).exec(); // We are waiting for a response from the MongoDB to find by the id if the user actually exist
        let customer = await customerModel.findById(customerId).exec(); // We are waiting for a response from the MongoDB to find by the id if the customer actually exist
        if (user && customer) { // if the user and the customer exist
            // first we check if a configuration document with the same name already exist to prevent duplicate because configuration's name is unique
            let newConfiguration = await configurationModel.findById(configurationId).exec();
            if (newConfiguration) { // if the configuration with the same id than the configurationId parameter than 
                newConfiguration = newConfiguration.toObject(); // we convert the newConfiguration document to an object
                delete newConfiguration._id; // we remove the _id property from the object
                delete newConfiguration.createdAt; // we remove the createdAt property from the object
                // we get the list of all the configuration and the copies that contain the same name in order to count
                let sameConfigurationList = await configurationModel.find({name: { $regex: newConfiguration.name, $options: 'i' }}).exec();
                // we add to the new name the number with paramter, for exmplae: if there is the original + 2 copy in nthe database with the same name than the number is (3)
                newConfiguration.name += ` (${sameConfigurationList.length})`;
                newConfiguration.version = 0;
                newConfiguration.editedBy = ""; // we tell that the cloned config is not yet edited by a user
                newConfiguration = new configurationModel(newConfiguration);

                let newConfigurationDoc = await newConfiguration.save(); // we save the new configuration into the database
                if (newConfigurationDoc) { // if the configuration has been saved then
                    // first we check if a snapshot document with the same configurationId exist
                    let newSnapshotConfiguration = await snapshotDataModel.findOne({configurationId: configurationId}).exec();
                    if (newSnapshotConfiguration) { // if the configuration have a snapshot document
                        newSnapshotConfiguration = newSnapshotConfiguration.toObject();
                        delete newSnapshotConfiguration._id; // we remove the _id property from the object
                        delete newSnapshotConfiguration.updatedAt; // we remove the createdAt property from the object
                        newSnapshotConfiguration.configurationId = newConfigurationDoc._id; // we link the copy snapshot with copy configuration document id
                        newSnapshotConfiguration = new snapshotDataModel(newSnapshotConfiguration);

                        return newSnapshotConfiguration.save().then(async (resp) => { // we save the new configuration into the database
                            // if the document has been saved we return the new configuration list or else we return a ServerResponseStatus
                            return newSnapshotConfiguration === resp ? await configurationModel.find({customerId: customerId}).exec() : ServerResponseStatus.CannotOperate;
                        });
                    }
                    else {
                        return ServerResponseStatus.CannotOperate;
                    }
                }
                else {
                    return ServerResponseStatus.CannotOperate;
                }
            }
            else {
                return ServerResponseStatus.WrongId;
            }
        }
        else { // if the user or customer don't exist in the database
            return ServerResponseStatus.WrongId;
        }

    },
    removeOneConfiguration: async (adminId, customerId, configurationId) => { // This function is used to remove a configuration document from the database
        let admin = await userModel.findById({_id: adminId, profile: "Admin"}).exec(); // we check if the user who made the request has an admin profile
        if (admin) { // if the adminId is indeed a id of an Admin profile then
            // we use the id of the delete customer document to delete all of his linked configurations
            let configurationRemoved = await configurationModel.findByIdAndDelete(configurationId).exec();
            return configurationRemoved ? await configurationModel.find({customerId: customerId}).exec() : ServerResponseStatus.CannotOperate; // we retrieved the new customer's configuration list and send it back
        }
        else {
            return ServerResponseStatus.PermissionIssue;
        }
    },
    openConfigurationInReadMode: async(userId, configurationId, configurationDataId) => { // This function is used to open a snapshot or an official configuration for reading purpose
        let user = await userModel.findById({_id: userId}).exec(); // we check if the user exist in the database
        if (user) {
            let snapshotOfficialDataList = [
                await snapshotDataModel.findOne({configurationId: configurationId}).lean().exec(),
                ...await officialDataModel.find({configurationId: configurationId}).lean().exec()
            ]; // we get a list of object from snapshot and official configuration data
            let snapshotOfficialDataObject = snapshotOfficialDataList.find((config)=>config._id.equals(configurationDataId)); // we retrieved from the previous array the configuration data with the same id
            let configurationInfoObject = await configurationModel.findById(snapshotOfficialDataObject.configurationId).lean().exec(); // we get the main info of the configuration document
            // for security purpose, we remove the id of each configuration object so that the user can't submit data in read mode to the server
            delete snapshotOfficialDataObject._id;                                                  
            delete configurationInfoObject._id;
            if (snapshotOfficialDataObject.hasOwnProperty("version")) { // if the object does have a version property, it does mean that it is an officialDatas document object
                const officialToSnapshotData = convertOfficialConfToSnapshot(configurationInfoObject.name, snapshotOfficialDataObject.data); // we convert the data object into a snapshot data object
                if (officialToSnapshotData) { // if the conversion suceed then 
                    snapshotOfficialDataObject.data = officialToSnapshotData; // we update the configurationData object
                }
                else {
                    return ServerResponseStatus.CannotOperate;
                }
                configurationInfoObject.version = snapshotOfficialDataObject.version; // we put the version on the info
            }
            else { // else the configurationData retrieved from the list is a snapshotData document
                configurationInfoObject.version = "Snapshot"; // we state that the configuration is an Work in Progress
            }
            
            return (configurationInfoObject && snapshotOfficialDataObject) ? {configuration:configurationInfoObject, snapshot:snapshotOfficialDataObject, handleMode:HandleModeStatus.Read} : ServerResponseStatus.WrongId;
        }
        else {
            return ServerResponseStatus.WrongId;
        }
    },
    openConfigurationInEditMode: async(userId, configurationId) => { // This function is used to get the data of a configuration in thr snapshot collection
        let user = await userModel.findById({_id: userId, profile: "Configurator"}).exec(); // we check if the user has a Configurator profile
        if (user) {
            let configurationInfo = await configurationModel.findById(configurationId).exec(); // we get the info of the configuration
            let snapshotData = await snapshotDataModel.findOne({configurationId: configurationId}).exec(); // we get the snapshot version of the configuration since we want to edit the current version
            if ((configurationInfo && snapshotData)) { // if both document exist in the database then
                if (!configurationInfo.editedBy) { // if the configuration editedBy don't have any id string in it, it mean that the configuration can be edited and no one is editing it
                    configurationInfo.editedBy = user._id; // we update the editedBy value with our own id
                    await configurationInfo.save(); // we save the update
                    return {configuration:configurationInfo, snapshot:snapshotData, handleMode:HandleModeStatus.Edit}; // we return the configuration info, the snapshot data and the handeMode
                }
                else { // else there is an id in the editedBy property
                    let userEditing = await userModel.findById(configurationInfo.editedBy).exec(); // we get the information of the user who is currently editing the configuration
                    const errorMsg = `This configuration is currently edited by another user: ${userEditing.username}`; // we write a custom error message with the name of the user editing the configuration
                    return errorMsg;
                }
            }
            else {
                return ServerResponseStatus.WrongId;
            }
        }
        else {
            return ServerResponseStatus.WrongId;
        }
    },
    closeConfiguration: async(configurationId) => { // This function is used to clear the name of the configurator who was editing the config to state that the config can be edited again
        let configuration = await configurationModel.findById(configurationId).exec();
        if (configuration) {
            configuration.editedBy = ""; // we clear the id of the configurator who is editing the configuration so that other configurator can open the configuration
            await configuration.save();
            return await configurationModel.find({customerId: configuration.customerId}).exec(); // we retrieved the new customer's configuration list and send it back
        }
        else {
            return ServerResponseStatus.WrongId; 
        }
    },
    saveChangesConfiguration: async(snapshotConfigId, path, confObject) => { // This function is used to get save data into configuration in the snapshot collection
        let snapshotData = await snapshotDataModel.findById(snapshotConfigId).exec(); // we check if the configuration exist in the database with the configurationId
        if (snapshotData) {
            let snapshotDataObjectPath = `data.${path}`; // we made a custom path to edit just a value of the data object
            // we find the snapshot config with the following id then we update just the part we want using the snapshotDataObjectPath and we return the updated document
            let editedSnapshotData = await snapshotDataModel.findByIdAndUpdate(snapshotConfigId, {$set: {[snapshotDataObjectPath]: confObject}}, {new: true}).exec();
            // we find the configuration with the snapshotConfigId
            let configurationData = await configurationModel.findById(editedSnapshotData.configurationId).exec(); // we get the configuration document using the _id of the editedSnapshotData
            return (configurationData && editedSnapshotData) ? {configuration:configurationData,snapshot:editedSnapshotData} : ServerResponseStatus.WrongId;
        }
        else {
            return ServerResponseStatus.WrongId;
        }
    },
}

export default mongooseConfiguration;