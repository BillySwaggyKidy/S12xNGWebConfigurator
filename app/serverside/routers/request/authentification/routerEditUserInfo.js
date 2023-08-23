import mongooseAuthentification from "../../services/mongooseAuthentification";
import { ServerResponseStatus } from "../../../../utils/enums-utils";

export default function routerEditUserInfo(req, res) { // this function is taking care of the editUserInfo request from the user
    if (req.body) // if the body of the request is real and not null then we can begin sending the data to the right function
    {
        let data = req.body;
        mongooseAuthentification.editUserInfo(data.id, data.userObject).then(resp=>{
            switch(resp) {
                case ServerResponseStatus.WrongId:
                    res.status(404).send("Error: Wrong user id provided");
                    break;
                case ServerResponseStatus.CannotOperate:
                    res.status(404).send("Error: Couldn't modify user info");
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