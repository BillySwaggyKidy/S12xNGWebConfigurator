import mongooseNotification from "../../services/mongooseNotification";

export default function routerReadNotification(req, res) { // this function is taking care of the readNotification request from the user
    if (req.body) // if the body of the request is real and not null then we can begin sending the data to the right function
    {
        let data = req.body;
        mongooseNotification.readNotification(data.id).then(resp=>{
            if (resp) { // if the resp object is real and not null
                res.status(200).json(resp); // we send the user object to the user
            }
            else { // or else we send null
                res.status(404).send(null);
            }
        });
    }
    else // or else we send a null response
    {
        res.status(404).send(null);
    }
};