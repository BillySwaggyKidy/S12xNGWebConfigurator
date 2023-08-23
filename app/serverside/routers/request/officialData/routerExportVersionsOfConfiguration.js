import mongooseOfficialData from "../../services/mongooseOfficialData.js";
import { ServerResponseStatus } from "../../../../utils/enums-utils.js";
import AdmZip from "adm-zip";
import convertOfficialToConfigFiles from "../../services/convert/convertOfficialToConfigFiles/convertOfficialToConfigFiles.js";

// this function create a new file and insert it to the 
const createFile = (zip, configName, deviceType, officialObj) => {
    return new Promise((resolve, reject)=>{
        convertOfficialToConfigFiles(zip, configName, deviceType, officialObj); // we convert the official Object to an actual file before insert it to the archive
        resolve(true);
    });
}

export default function routerExportVersionsOfConfiguration(req, res) { // this function is taking care of the exportVersionsOfConfiguration request from the user
    if (req.body) // if the body of the request is real and not null then we can begin sending the data to the right function
    {
        let data = req.body;
        mongooseOfficialData.exportOfficialDatasToFiles(data.userId, data.configurationId, data.officialIdList).then(async (resp)=>{
            if (resp.name) {
                let zipFile = new AdmZip(); // create a new empty archive
                for (const official of resp.officialDataList) { // for every official object
                    // we wait for the file creation to be done before continuing for the next official object
                    await createFile(zipFile, resp.name, resp.deviceType, official);
                }
                let fileName = resp.name+"_output.zip";
                let zipFileContent = zipFile.toBuffer();
                res.writeHead(200,{
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/zip',
                    'Content-Length': zipFileContent.length,
                    'Content-Disposition': 'attachment; filename=' + fileName
                }); // we sned the response using a special head in order to send the archive to the client
        
                res.end(zipFileContent);
            }
            else {
                switch(resp) {
                    case ServerResponseStatus.PermissionIssue:
                        res.status(404).send("Error: you don't have the permission to use this action");
                        break;
                    case ServerResponseStatus.WrongId:
                        res.status(404).send("Error: wrong configuration ID");
                        break;
                }
            }
        });
    }
    else // or else we send a null response
    {
        res.status(404).send(null);
    }
};