import fetch from 'cross-fetch';
import { serverUrl, serverRoutes } from "../../routes.js"


// This test only test the deleteAllNotifications path from the server
describe("Test the /notification/deleteAllNotifications path", () => {
    test("we delete one notification linked to a user in the database", async () => {

        let userId = "63f72e93f41207e3678e6812";
        const notifList = await fetch(`${serverUrl()}${serverRoutes.deleteAllNotifications}`, {
            method: 'POST',
            body: JSON.stringify({id: userId}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(resp => resp.json());
        expect(notifList).toEqual([]);  // Success!
    });
});