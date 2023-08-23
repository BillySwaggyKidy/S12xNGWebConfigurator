import mongooseNotification from "../../services/mongooseNotification";
import { ServerResponseStatus } from "../../../../utils/enums-utils";

export default function routerSendRequestToAdmin(req, res) { // this function is taking care of the sendRequestToAdmin request from the user
    if (req.body) // if the body of the request is real and not null then we can begin sending the data to the right function
    {
        let data = req.body;
        mongooseNotification.sendRequestToAdmin(data.username).then(resp=>{
            switch(resp) {
                case ServerResponseStatus.WrongId:
                    res.status(404).send("The username does not exist in the database nor there is no admin to contact");
                    break;
                case ServerResponseStatus.CannotOperate:
                    res.status(404).send("Error: Cannot send a notification to the admin");
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