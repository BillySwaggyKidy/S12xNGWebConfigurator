import fetch from 'cross-fetch';
import { serverUrl, serverRoutes } from "../../routes.js"


// This test only test the login path from the server
describe("Test the /login path", () => {
    test("we log to the website with a user account that exist in the database", async () => {
        const goodUserDataObject = {
            username: "Test",
            password: "test"
        };
    
        const goodResult = await fetch(`${serverUrl()}${serverRoutes.login}`, {
            method: 'POST',
            body: JSON.stringify(goodUserDataObject),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(resp => resp.json()); // we convert the response into a text
        expect(goodResult.username).toBe(goodUserDataObject.username);  // Success!
    });

    test("we log to the website with a user account that doesn't exist in the database", async () => {
        const badUserDataObject = {
            username: "foo",
            password: "bar"
        };
    
        const badResult = await fetch(`${serverUrl()}${serverRoutes.login}`, {
            method: 'POST',
            body: JSON.stringify(badUserDataObject),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }); // we convert the response into a text
        expect(badResult.status).toBe(404);  // The user is not registered!
    });
});