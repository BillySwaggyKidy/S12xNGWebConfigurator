import fetch from 'cross-fetch';
import { serverUrl, serverRoutes } from "../../routes.js"


// This test only test the editUserInfo path from the server
describe("Test the /authentification/editUserInfo path", () => {
    test("we edit the user information in the database", async () => {
        let testUserId = "6344213ebb5a3d92658956b3";
        const editedUserDataObject = {
            username: "Test user",
            password: "toto"
        };
    
        const result = await fetch(`${serverUrl()}${serverRoutes.editUserInfo}`, {
            method: 'POST',
            body: JSON.stringify({id: testUserId, userObject: editedUserDataObject}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(resp => resp.json()); // we convert the response into a text
        expect(result.username).toBe(editedUserDataObject.username) // we expect the result to have the update username
    });

    test("we reset the user information at the intitial in the database", async () => {
        let testUserId = "6344213ebb5a3d92658956b3";
        const editedUserDataObject = {
            username: "Test",
            password: "test"
        };
    
        const result = await fetch(`${serverUrl()}${serverRoutes.editUserInfo}`, {
            method: 'POST',
            body: JSON.stringify({id: testUserId, userObject: editedUserDataObject}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(resp => resp.json()); // we convert the response into a text
        expect(result.username).toBe(editedUserDataObject.username) // we expect the result to have the update username
    });
});