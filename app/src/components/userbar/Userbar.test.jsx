import React from 'react';
import { renderWithProviders } from '../../../utils/test-utils.jsx';
import Userbar from './UserBar.jsx';

describe('Userbar', () => {
  test('renders Userbar component', () => {
    renderWithProviders(<Userbar/>);
  });
});