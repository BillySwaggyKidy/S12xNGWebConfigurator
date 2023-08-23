// nstead of copy-pasting the same store creation and Provider setup in every test
// The custom render function should let us:
// Create a new Redux store instance every time it's called, with an optional preloadedState value that can be used for an initial value
// Alternately pass in an already-created Redux store instance
// Pass through additional options to RTL's original render function
// Automatically wrap the component being tested with a <Provider store={store}>
// Return the store instance in case the test needs to dispatch more actions or check state
import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setupStore, persistor } from '../src/store/store.js';
import {BrowserRouter} from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';

// Automatically create a store instance if no store was passed in
export function renderWithProviders(ui,{preloadedState = {},store = setupStore(preloadedState),...renderOptions} = {}) {
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {children}
            </PersistGate>
          </Provider>
      </BrowserRouter>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}