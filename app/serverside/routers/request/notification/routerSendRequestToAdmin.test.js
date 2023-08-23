import fetch from 'cross-fetch';
import { serverUrl, serverRoutes } from "../../routes.js"


// This test only test the getAllNotifications path from the server
describe("Test the /notification/sendRequestToAdmin path", () => {
    test("we send a notification request to the admin in the database", async () => {
        
        let userTestName = "Test";
        const response = await fetch(`${serverUrl()}${serverRoutes.sendRequestToAdmin}`, {
            method: 'POST',
            body: JSON.stringify({username: userTestName}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(resp => resp.json()); // we convert the response into a text
        expect(response).toBe("OK");  // Success!

        let userId = "63f72e93f41207e3678e6812";
        await fetch(`${serverUrl()}${serverRoutes.deleteAllNotifications}`, {
            method: 'POST',
            body: JSON.stringify({id: userId}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
    });
});