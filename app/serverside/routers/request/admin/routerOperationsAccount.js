import mongooseAccount from "../../services/mongooseAccount.js";
import { ServerResponseStatus, ServerOperationStatus } from "../../../../utils/enums-utils.js";

export default async function routerOperationsAccount(req, res) { // this function is taking care of multiples request for the user documents
    if (req.body) // if the body of the request is real and not null then we can begin sending the data to the right function
    {
        let resp = null;
        let data = req.body;
        // we check the status of the request, if the user want to create, edit or remove a user document, then we call the appropriate service.
        switch(req.body.status) {
            case ServerOperationStatus.Create:
                resp = await mongooseAccount.addNewAccount(data.hostId, data.userObject);
                break;
            case ServerOperationStatus.Edit:
                resp = await mongooseAccount.editAccount(data.hostId, data.userId, data.userObject);
                break;
            case ServerOperationStatus.Remove:
                resp = await mongooseAccount.removeOneAccount(data.hostId, data.userToDeleteId);
                break;
        }
        // depending of the response, we return an error message or the json object
        switch(resp) {
            case ServerResponseStatus.WrongId:
                res.status(404).send("Error: either wrong ID of the user");
                break;
            case ServerResponseStatus.DuplicateIssue:
                res.status(404).send("Error: There is already a user with the same name");
                break;
            case ServerResponseStatus.CannotOperate:
                res.status(404).send("Error: couldn't create the new user in the database");
                break;
            default:
                res.status(200).json(resp);
                break;
        }
    }
    else // or else we send a null response
    {
        res.status(400).send(null);
    }
};