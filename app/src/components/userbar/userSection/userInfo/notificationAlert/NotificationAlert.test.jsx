import React from 'react';
import {screen, fireEvent} from '@testing-library/react';
import { renderWithProviders } from '../../../../../../utils/test-utils.jsx';
import NotificationAlert from './NotificationAlert.jsx';

describe('NotificationAlert', () => {

  let userTestId = "6344213ebb5a3d92658956b3";

  test('renders NotificationAlert component', () => {
    renderWithProviders(<NotificationAlert userId={userTestId}/>);
  });

  test('render the NotificationAlert without having any notifications', async () => {
    const initialState = { // this is the initial state of the authentification Reducer
      notificationList: [], // a var array thart contain all of the user notification
      success: false,  // a var that indicate if the action is a success
      loading: false, // a var that indicate if a request is loading
      error: null // a var that contain a text that explain the error if the action failed
    };

    renderWithProviders(<NotificationAlert userId={userTestId}/>, {
      preloadedState: {
        notification: initialState
      }
    });
    const notifButton = screen.getByRole("button");
    fireEvent.click(notifButton);
    expect(screen.getByText("You don't have any notifications")).toBeInTheDocument(); // expect to have a text message because we don't have notification
  });

  test('render the NotificationAlert with some notifications', async () => {
    const initialState = { // this is the initial state of the authentification Reducer
      notificationList: [
        {
          _id: "gregerg9841eyukyurg",
          host: userTestId,
          title: "Hello",
          message: `The text has the following number: 1`,
          redirectTo: null,
          read: false,
          status: "Warning"
        },
        {
          _id: "rgzeirj61648942erg",
          host: userTestId,
          title: "World",
          message: `The text has the following number: 2`,
          redirectTo: null,
          read: false,
          status: "Success"
        },
        {
          _id: "puoeirj6281erg",
          host: userTestId,
          title: "!",
          message: `The text has the following number: 3`,
          redirectTo: "/operation",
          read: false,
          status: "Info"
        }
      ], // a var array thart contain all of the user notification
      success: true,  // a var that indicate if the action is a success
      loading: false, // a var that indicate if a request is loading
      error: null // a var that contain a text that explain the error if the action failed
    };

    renderWithProviders(<NotificationAlert userId={userTestId}/>, {
      preloadedState: {
        notification: initialState
      }
    });

    const notifButton = screen.getByRole("button"); // we get the notifIcon
    fireEvent.click(notifButton); // we click on the icon to open the alert
    const notifItemsList = screen.getAllByTestId("notif-item"); // we get all of the notification on the list
    notifItemsList.forEach((notifItem, index) => {
      expect(screen.getByText(initialState.notificationList[index].title)).toBeInTheDocument(); // we expect the notification to have the correct title
      fireEvent.click(notifItem); // we click on the notification item
      expect(screen.getByText(initialState.notificationList[index].message)).toBeInTheDocument(); // we expect the notification to have the correct message
      if (initialState.notificationList[index].redirectTo) { // the notif item do have a redirect value then
        expect(screen.queryByText("Redirect")).toBeInTheDocument(); // we expect to have a redirect button
      }
      fireEvent.click(screen.getByText("Ok")); // we click on the OK button to exit the modal
    });
  });

});