import fetch from 'cross-fetch';
import { serverUrl, serverRoutes } from "../../routes.js"


// This test only test the getAccounts path from the server
describe("Test the /admin/getAccounts path", () => {
    test("we get all of the user accoutns except the admin ones in the database", async () => {
        let testUserId = "63f72e93f41207e3678e6812";
    
        const result = await fetch(`${serverUrl()}${serverRoutes.getAccounts}`, {
            method: 'POST',
            body: JSON.stringify({id: testUserId}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(resp => resp.json()); // we convert the response into a text
        expect(result).not.toBeNull() // we expect the result to not being null
    });
});