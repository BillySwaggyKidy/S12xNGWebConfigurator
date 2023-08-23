import mongooseCustomer from "../../services/mongooseCustomer.js";
import { ServerResponseStatus, ServerOperationStatus } from "../../../../utils/enums-utils";

export default async function routerOperationsCustomer(req, res) { // this function is taking care of multiple requests for the customer documents from the user
    if (req.body) // if the body of the request is real and not null then we can begin sending the data to the right function
    {
        let resp = null;
        let data = req.body;
        // we check the status of the request, if the user want to create, duplicate or remove a configuration document, then we call the appropriate service.
        switch(req.body.status) {
            case ServerOperationStatus.Create:
                resp = await mongooseCustomer.addNewCustomer(data.hostId, data.customerObject);
                break;
            case ServerOperationStatus.Remove:
                resp = await mongooseCustomer.removeOneCustomer(data.hostId, data.customerId);
                break;
            default:
                res.status(404).send("Error: wrong operation");
                break;
        }
        // depending of the response, we return an error message or the json object
        switch(resp) {
            case ServerResponseStatus.WrongId:
                res.status(404).send("Error: either wrong ID of customer or user");
                break;
            case ServerResponseStatus.DuplicateIssue:
                res.status(404).send("Error: There is already a customer with the same name");
                break;
            case ServerResponseStatus.CannotOperate:
                res.status(404).send("Error: couldn't create the new customer in the database");
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