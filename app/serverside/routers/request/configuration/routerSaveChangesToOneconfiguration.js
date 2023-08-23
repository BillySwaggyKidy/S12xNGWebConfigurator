import mongooseConfiguration from "../../services/mongooseConfiguration";
import { ServerResponseStatus } from "../../../../utils/enums-utils";

export default function routerSaveChangesToOneConfiguration(req, res) { // this function is taking care of the saveChangesToOneConfiguration request from the user
    if (req.body) // if the body of the request is real and not null then we can begin sending the data to the right function
    {
        let data = req.body;
        mongooseConfiguration.saveChangesConfiguration(data.snapshotId, data.path, data.conf).then(resp=>{
            switch(resp) {
                case ServerResponseStatus.WrongId:
                    res.status(404).send("Error: wrong configuration Id");
                    break;
                case ServerResponseStatus.CannotOperate:
                    res.status(404).send("Error: Cannot save changes into the configuration");
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