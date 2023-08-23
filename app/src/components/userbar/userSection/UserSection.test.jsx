import React from 'react';
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../../utils/test-utils.jsx';
import UserSection from './UserSection.jsx';

describe('UserSection', () => {

  const userAction = userEvent.setup();

  test('renders UserSection component', () => {
    renderWithProviders(<UserSection/>);
  });

  test('render the UserSection but without being connected', async () => {
    const initialState = { // this is the initial state of the authentification Reducer
      online: false, // we are not connected into the website
      userInfo: null,
      loading: false,
      success: false,
      error: null
    };

    renderWithProviders(<UserSection/>, {
      preloadedState: {
        authentification: initialState
      }
    });
    expect(screen.getByRole("button", {name: /Login/i})).toBeInTheDocument(); // expect the component to have a login button
  });

  test('render the UserSection being connected', async () => {
    const initialState = { // this is the initial state of the authentification Reducer for the test
      online: true, // we are connected
      userInfo: {
        id: "25bdcd4c-e7f8-4dcd-a43a-f47264b2442d",
        profile: "Viewer",
        username:"user", // our name is user
        password:"test"

      },
      loading: false,
      success: false,
      error: null
    };

    renderWithProviders(<UserSection/>, {
      preloadedState: {
        authentification: initialState
      }
    });
    expect(screen.getByText("user")).toBeInTheDocument(); // expect the component to have the user name
    let profile = screen.getByTestId("profile");
    await userAction.click(profile);
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Disconnect")).toBeInTheDocument();
  });
});