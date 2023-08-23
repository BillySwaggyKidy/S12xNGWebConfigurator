import mongooseAuthentification from "../../services/mongooseAuthentification";
import { UserStatus } from "../../../../utils/enums-utils.js";
import { ServerResponseStatus } from "../../../../utils/enums-utils.js";

export default function routerLoginDB(req, res) { // this function is taking care of the login request from the user
    if (req.body) // if the body of the request is real and not null then we can begin sending the data to the right function
    {
        mongooseAuthentification.loginUser(req.body).then(resp=>{
            switch(resp) {
                case ServerResponseStatus.WrongId:
                    res.status(404).send("Error: wrong username provided");
                    break;
                case ServerResponseStatus.CannotOperate:
                    res.status(404).send("Error: password do not match");
                    break;
                default:
                    resp.status = UserStatus[resp.status]; // we remove the password property before sending it to the frontend for security reasons
                    delete resp.password;
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