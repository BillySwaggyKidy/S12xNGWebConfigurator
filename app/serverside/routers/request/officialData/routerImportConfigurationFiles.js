import mongooseOfficialData from "../../services/mongooseOfficialData.js";
import { ServerResponseStatus } from "../../../../utils/enums-utils.js";

export default function routerImportConfigurationFiles(req, res) { // this function is taking care of the importConfigurationFiles request from the user
    if (req.body && req.files) // if the body and files of the request is real and not null then we can begin sending the data to the right function
    {
        const hostId = req.body.hostId;
        const customerId = req.body.customerId;
        // we are extracting all of the unique configuration names from the list of files
        let configKeyNames = req.files.map((file)=>file.fieldname).reduce((acc, conf) => acc.includes(conf) ? acc : [...acc, conf], []);
        const confFiles = configKeyNames.map((confName)=>{ // for each configuration name, we create a configuration object containing the name and the files linked to it
            return {
                name: confName,
                files: req.files.filter((file)=>file.fieldname == confName)
            }
        });
        mongooseOfficialData.importConfigurationFilesToSnapshot(hostId, customerId, confFiles).then(resp=>{
            switch(resp) {
                case ServerResponseStatus.PermissionIssue:
                    res.status(404).send("Error: you don't have the right privileges to perform this action");
                    break;
                case ServerResponseStatus.CannotOperate:
                    res.status(404).send("Error: Couldn't import the files to the server");
                    break;
                case "Exist": // this status happen when all of the configurations sended by the user already exist in the database
                    res.status(404).send("Error: All of the configuration files already exist in the database");
                    break;
                default:
                    res.status(200).json(resp);
                    break;
            }
        });
    }
    else // or else we send a null response
    {
        res.status(404).send(null);
    }
};