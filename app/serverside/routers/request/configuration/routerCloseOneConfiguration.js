import mongooseConfiguration from "../../services/mongooseConfiguration";
import { ServerResponseStatus } from "../../../../utils/enums-utils";

export default function routerCloseOneConfiguration(req, res) { // this function is taking care of the closeOneConfiguration request from the user
    if (req.body) // if the body of the request is real and not null then we can begin sending the data to the right function
    {
        let data = req.body;
        mongooseConfiguration.closeConfiguration(data.configurationId).then(resp=>{
            switch(resp) {
                case ServerResponseStatus.WrongId:
                    res.status(404).send("Error: you provided a wrong id to close the configuration");
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