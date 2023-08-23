import React from 'react';
import { within } from '@testing-library/dom';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils.jsx';
import Home from './Home.jsx';

describe('Home', () => {
  test('renders Home component', () => {
    renderWithProviders(<Home/>);
  });

  test('rendering Home component and clicking on the sidebutton component it to hide the sidebar' , () => {
    renderWithProviders(<Home/>);
    const sideButton = within(screen.getByTestId('side-button')).getByRole('checkbox');
    const sidebar = screen.getByTestId('sidebar');
    fireEvent.click(sideButton);
    expect(sidebar).toHaveStyle('width: 0%'); // expect the component to have the user name
    fireEvent.click(sideButton);
    expect(sidebar).toHaveStyle('width: 14%'); // expect the component to have the user name
  });
});