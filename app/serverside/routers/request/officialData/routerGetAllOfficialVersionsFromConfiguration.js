import mongooseOfficialData from "../../services/mongooseOfficialData.js";
import { ServerResponseStatus } from "../../../../utils/enums-utils.js";

export default function routerGetAllOfficialVersionsFromConfiguration(req, res) { // this function is taking care of the GetAllOfficialVersionsFromConfiguration request from the user
    if (req.body) // if the body of the request is real and not null then we can begin sending the data to the right function
    {
        let data = req.body;
        mongooseOfficialData.getAllTypeDatasFromConfiguration(data.userId, data.configurationId).then(resp=>{
            switch(resp) {
                case ServerResponseStatus.WrongId:
                    res.status(404).send("Error: wrong configuration Id");
                    break;
                case ServerResponseStatus.CannotOperate:
                    res.status(404).send("Error: Cannot commit configuration to officials");
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