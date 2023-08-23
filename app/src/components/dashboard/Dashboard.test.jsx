import React from 'react';
import { renderWithProviders } from '../../../utils/test-utils.jsx';
import Dashboard from './Dashboard.jsx';

describe('Dashboard', () => {
  test('renders Dashboard component', () => {
    renderWithProviders(<Dashboard/>);
  });
});