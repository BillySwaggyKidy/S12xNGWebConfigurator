import React from 'react';
import { renderWithProviders } from '../../../../utils/test-utils.jsx';
import Workbench from './Workbench.jsx';

describe('Workbench', () => {
  test('renders Workbench component', () => {
    renderWithProviders(<Workbench/>);
  });
});