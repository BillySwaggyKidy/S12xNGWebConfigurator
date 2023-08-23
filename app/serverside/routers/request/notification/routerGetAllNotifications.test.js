import fetch from 'cross-fetch';
import { serverUrl, serverRoutes } from "../../routes.js"


// This test only test the getAllNotifications path from the server
describe("Test the /notification/getAllNotifications path", () => {
    test("we delete one notification linked to a user in the database", async () => {
        
        let userId = "6344213ebb5a3d92658956b3";
        const notifList = await fetch(`${serverUrl()}${serverRoutes.getAllNotifications}`, {
            method: 'POST',
            body: JSON.stringify({host: userId}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(resp => resp.json()); // we convert the response into a text
        expect(notifList).not.toBeNull();  // Success!
    });
});