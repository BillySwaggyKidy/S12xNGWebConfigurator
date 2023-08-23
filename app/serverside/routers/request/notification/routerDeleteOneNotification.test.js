import fetch from 'cross-fetch';
import { serverUrl, serverRoutes } from "../../routes.js"


// This test only test the deleteOneNotification path from the server
describe("Test the /notification/deleteOneNotification path", () => {
    test("we delete one notification linked to a user in the database", async () => {

        const notificationTestObject = {
            host: "6344213ebb5a3d92658956b3",
            title: "TEST NOTIFICATION",
            message: "this is a text",
            redirectTo: null,
            read: false,
            status: "Info",
            createdAt: new Date().now
        };
    
        await fetch(`${serverUrl()}${serverRoutes.addNotification}`, {
            method: 'POST',
            body: JSON.stringify(notificationTestObject),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        let userId = "6344213ebb5a3d92658956b3";
        const notifList = await fetch(`${serverUrl()}${serverRoutes.getAllNotifications}`, {
            method: 'POST',
            body: JSON.stringify({host: userId}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(resp => resp.json()); // we convert the response into a text
        
        let testNotificationId =  notifList[notifList.findIndex((notif)=>notif.title == "TEST NOTIFICATION")]._id;

        const response = await fetch(`${serverUrl()}${serverRoutes.deleteOneNotification}`, {
            method: 'POST',
            body: JSON.stringify({id: testNotificationId}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(resp => resp.json()); // we convert the response into a text
        expect(response).not.toBeNull();  // Success!
    });
});