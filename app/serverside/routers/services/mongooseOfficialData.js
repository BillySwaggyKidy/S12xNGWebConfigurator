import userModel from './models/User.js';
import configurationModel from "./models/Configuration.js";
import snapshotDataModel from "./models/snapshotData/SnapshotData.js";
import officialDataModel from "./models/officialData/OfficialData.js";
import convertSnapshotConfToOfficial from "./convert/snapshotToOfficial/snapshotToOfficial.js";
import convertConfigFilesToSnapshot from "./convert/configFilesToSnapshot/configFilesToSnapshot.js";
import { ServerResponseStatus } from "../../../utils/enums-utils.js";
import { pick } from "../../../utils/functions-utils.js";

const mongooseOfficialData = {
    addNewOfficialConfiguration: async(hostId, configurationId, snapshotConf) => { // This function is used to add a new official configuration ducument into the database
        let user = await userModel.find({_id: hostId, profile: "Configurator"}).exec(); // we check if the user who made the request has an Configurator profile
        if (user) { // if the hostId is indeed a id of an Configurator profile then
            let configuration = await configurationModel.findById(configurationId).exec(); // we get the configuration dococument with the matched id
            if (configuration) {
                const newConfigurationVersion = configuration.version + 1;
                const officialConfigurationData = convertSnapshotConfToOfficial(snapshotConf); // we create a new official configuration object 
                let newOfficialData = new officialDataModel({
                    configurationId : configurationId,
                    version: newConfigurationVersion,
                    data: officialConfigurationData,
                }); // we create a new officialData Model
                configuration.version = newConfigurationVersion; // we update the version of the configuration document
                await configuration.save(); // we save the change made to the configuration document
                return newOfficialData.save().then(async (resp) => { // we save the new configuration official into the database
                    let configurationData = await configurationModel.findById(configurationId).exec(); // we get the configuration document using the configurationId
                    let snapshotData = await snapshotDataModel.findOne({configurationId: configurationId}).exec()
                    // if the document has been saved we return an object contening the configuration and snapshot document or else we return a ServerResponseStatus
                    return newOfficialData === resp ? {configuration:configurationData,snapshot:snapshotData} : ServerResponseStatus.CannotOperate;
                });
            }
            else {
                return ServerResponseStatus.WrongId;
            }
        }
        else {
            return ServerResponseStatus.PermissionIssue;
        }
    },
    importConfigurationFilesToSnapshot: async(hostId, customerId, confFiles) => {
        let user = await userModel.find({_id: hostId, profile: "Configurator"}).exec(); // we check if the user who made the request has an Configurator profile
        if (user) {
            let configurationNamesList = await configurationModel.find({}).lean().exec(); // first we get the list of all of the configuration document from the database
            configurationNamesList = configurationNamesList.map((confDoc)=>confDoc.name); // then we only extract the name in order to have a list of all the configuration names
            // with configurationNamesList, we filter trought the configurations sended by the user in order to filter only the new configurations and not create configuration that already exist 
            const filteredConfFiles = confFiles.filter((confFiles)=>configurationNamesList.every((name)=>name != confFiles.name));
            if (filteredConfFiles.length > 0) { // we have at least one new configuration to create then
                // we use a for ( of ) instead of the forEach beacause we use the async/await
                for(const filteredConfFile of filteredConfFiles) { // for each new configuration objects
                    const confNameArray = filteredConfFile.name.split('_'); // we get an array containing each part of the configuration name
                    let newConfiguration =  new configurationModel({
                        customerId: customerId,
                        creatorId: hostId ?? null,
                        version: 0,
                        editedBy: "", // we tell that the cloned config is not yet edited by a users
                        name: filteredConfFile.name,
                        deviceType : confNameArray[0],
                        firmwareVersion : confNameArray[1],
                        affairNumber : confNameArray[2],
                        ofNumber : confNameArray[3],
                        suffixCode : confNameArray[4]
                    }); // we create a new configuration model
        
                    let configurationDoc = await newConfiguration.save(); // we save the new configuration document into the database
                    if (configurationDoc) { // if the configuration has been saved then
    
                        // we create the snapshotDataObject using the name and files from the configuration object
                        let newDefaultSnapshotDataValues = convertConfigFilesToSnapshot(filteredConfFile.name, filteredConfFile.files);
                        if (newDefaultSnapshotDataValues) { // if we have succefuly created the data object then
                            let newSnapshotConfiguration = new snapshotDataModel({
                                configurationId: configurationDoc._id, // we link the snapshot with new configuration id 
                                data: newDefaultSnapshotDataValues,
                            }); // we create his snapshot model
                            // we save snapshot document into the database
                            await newSnapshotConfiguration.save();
                        }
                        else {
                            await configurationModel.findByIdAndDelete(configurationDoc._id).exec(); // we remove the linked configuration document that we have just created
                            return ServerResponseStatus.CannotOperate; // return a serverStatus
                        }
                    }
                    else {
                        return ServerResponseStatus.CannotOperate;
                    }
                }
                // after creating each new configuration and snapshotData documents from the configuration files in the database, we return the new configuration documents list
                return await configurationModel.find({customerId: customerId}).exec().then((configList)=>{return configList});
            }
            else { // if none of the configurations are new then we return a special status
                return "Exist";
            }
        }
        else {
            return ServerResponseStatus.PermissionIssue;
        }
    },
    getAllTypeDatasFromConfiguration: async (hostId, configurationId) => {
        let user = await userModel.findById(hostId).exec(); // we check if the user exist
        if (user) {
            // we get the snapshotData document linked to the configuration id then we it into a regular object
            let snapshotVersion = await snapshotDataModel.findOne({configurationId: configurationId}).lean().exec();
            snapshotVersion.version = "snapshot";
            // we get the list of all the officialData document linked to the configuration id then we convert them into a regular object
            let officialVersionsList = await officialDataModel.find({configurationId: configurationId}).lean().exec();
            // if the list isn't empty, we extract from all the element only the _id and version if not we return an empty list
            officialVersionsList = officialVersionsList.length > 0 ? officialVersionsList = officialVersionsList.map((version)=>{
                return pick(version, ["_id","version"]);
            }) : [];
            return [snapshotVersion, ...officialVersionsList];
        }
        else {
            return ServerResponseStatus.PermissionIssue;
        }
    },
    exportOfficialDatasToFiles: async (hostId, configurationId, officialIdList) => {
        let user = await userModel.findById(hostId).exec(); // we check if the user exist
        if (user) {
            // we then check if the configuration also exist in the database and convert it to a regular object
            let configuration = await configurationModel.findById(configurationId).lean().exec();
            if (configuration) {
                // we create the officialDataVersionObject
                let officialDataVersionsObject = {
                    name: configuration.name, // this is the name of the configuration
                    deviceType: configuration.deviceType, // this is the deviceType of the configuration
                    officialDataList: [] // this is the list of all the officialData configuration object selected by the user
                };
                for (const confId of officialIdList) { // for each officialData id choose by the user
                    let officialData = await officialDataModel.findById(confId).lean().exec(); // we get the officialData object out of it
                    if (officialData) {
                        // we push a new object into the list that contain the version of the configuration and the data itself
                        officialDataVersionsObject.officialDataList.push({version:officialData.version, data: officialData.data});
                    }
                }
                return officialDataVersionsObject;
            }
            else {
                return ServerResponseStatus.WrongId;
            }
        }
        else {
            return ServerResponseStatus.PermissionIssue;
        }
    }
};

export default mongooseOfficialData;