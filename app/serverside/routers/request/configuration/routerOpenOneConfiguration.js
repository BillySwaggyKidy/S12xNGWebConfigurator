import mongooseConfiguration from "../../services/mongooseConfiguration";
import { ServerResponseStatus, HandleModeStatus } from "../../../../utils/enums-utils";

export default async function routerOpenOneConfiguration(req, res) { // this function is taking care of the openOneConfiguration request from the user
    if (req.body) // if the body of the request is real and not null then we can begin sending the data to the right function
    {
        let resp = null;
        let data = req.body;
        // we check the status of the requested mode, if the user want to open a configuration for reading or editing purpose, then we call the appropriate service.
        switch(req.body.handleMode) {
            case HandleModeStatus.Read:
                resp = await mongooseConfiguration.openConfigurationInReadMode(data.userId, data.configurationId, data.configurationDataId);
                break;
            case HandleModeStatus.Edit:
                resp = await mongooseConfiguration.openConfigurationInEditMode(data.userId, data.configurationId);
                break;
        }
        // depending of the response, we return an error message or the json object
        if (typeof resp == "string") {
            res.status(404).send(resp);
        }
        else {
            switch(resp) {
                case ServerResponseStatus.WrongId:
                    res.status(404).send("Error: either wrong ID of configuration or user");
                    break;
                case ServerResponseStatus.CannotOperate:
                    res.status(404).send("Error: couldn't open the data of the configuration in the database");
                    break;
                default:
                    res.status(200).json(resp);
                    break;
            }
        }
    }
    else // or else we send a null response
    {
        res.status(404).send(null);
    }
};