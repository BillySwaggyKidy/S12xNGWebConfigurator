import React from 'react';
import {screen} from '@testing-library/react';
import { renderWithProviders } from '../../../../utils/test-utils.jsx';
import Sidebar from './Sidebar.jsx';

describe('Sidebar', () => {


  test('renders sideBarITems but without being connected', async () => {
    const initialState = { // this is the initial state of the authentification Reducer
      online: false,
      userInfo: null,
      loading: false,
      success: false,
      error: null
    };

    renderWithProviders(<Sidebar/>, {
      preloadedState: {
        authentification: initialState
      }
    });
    expect(screen.queryByText("Increment section")).not.toBeInTheDocument();
  });

  test('renders Sidebar component being connected and with profile 1', async () => {
    const initialState = { // this is the initial state of the authentification Reducer
      online: true,
      userInfo: {
        id: "25bdcd4c-e7f8-4dcd-a43a-f47264b2442d",
        profile:"Viewer",
        username:"Test",

      },
      loading: false,
      success: false,
      error: null
    };

    renderWithProviders(<Sidebar/>, {
      preloadedState: {
        authentification: initialState
      }
    });
    let sectionText = await screen.findByText("Increment section"); // we get the increment Section element
    expect(sectionText).toBeInTheDocument(); // we check if it is here to show that the code is working
  });

  test('renders Sidebar component being connected and with profile 3', async () => {
    const initialState = { // this is the initial state of the authentification Reducer
      online: true,
      userInfo: {
        id: "25bdcd4c-e7f8-4dcd-a43a-f47264b2442d",
        profile:"Admin",
        username:"Test",

      },
      loading: false,
      success: false,
      error: null
    };

    renderWithProviders(<Sidebar/>, {
      preloadedState: {
        authentification: initialState
      }
    });
    let manageAccountsText = await screen.findByText("Manage accounts"); // we get the Increment Section element
    expect(manageAccountsText).toBeInTheDocument();
  });
});