import mongooseSignup from "../../services/mongooseSignup.js";

export default function routerSignupDB(req, res) { // this function is used to handle the signup request from the user
    if (req.body) // if the body of the request is real and not null then we can begin sending the data to the right function
    {
        if (req.body.delete)
        {
            mongooseSignup.deleteUser(req.body).then(resp => {
                res.status(resp ? 200 : 404).send(resp ? resp : "Error: can't find the user to delete");
            });
        }
        else {
            mongooseSignup.createUser(req.body).then(resp =>{ // we use the function createUser to register our user
                res.status(resp ? 200 : 404).send(resp ? resp : "The user already exist in our DataBase"); // we send the response from the function to the browser.
            }); 
        }  
    }
    else // or else we send a null response
    {
        res.status(404).send(null);
    }
};