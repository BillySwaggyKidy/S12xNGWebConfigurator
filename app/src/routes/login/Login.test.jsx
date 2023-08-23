import React from 'react';
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../utils/test-utils.jsx';
import Login from './Login.jsx';

describe('Login', () => {
  const user = userEvent.setup();
  const userDataThatExist = {
    username: "user",
    password: "root"
  };
  const badUserDataObject = {
    username: "hello",
    password: "world"
  };


  beforeEach(() => {
    renderWithProviders(<Login/>);
  });

  test('we are trying to click on the login button without filling the form', async () => {
    let loginButton = await screen.getByRole("button", {name: /Login/i}) // we get the login button
    await user.click(loginButton) // simulate the click on the login button
    let textFielLabeldArray = [
      screen.getByText('Username',{selector: 'label'}),
      screen.getByText('Password',{selector: 'label'}),
    ];
    (await textFielLabeldArray).forEach((label)=>{
      expect(label.getAttribute('class')).toMatch(/Mui-error/gi);
    });
  });

  test("we are trying to click on the login button after filling the form but with data from a wrong user account", async () => {
    let userNameInput = await screen.findByLabelText('Username');
    let passwordInput = await screen.findByLabelText('Password');
    let loginButton = await screen.getByRole("button", {name: /Login/i}) // we get the login button
    await user.type(userNameInput,badUserDataObject.username); // type in the username input the new username
    await user.type(passwordInput,badUserDataObject.password); // type in the password input the new password
    await user.click(loginButton) // simulate the click on the login button
    let errorMessage = await screen.findByText("Please enter a correct username and password");
    expect(errorMessage).toBeInTheDocument();
  });

  test("we are trying to click on the login button after filling the form but with data from a user account that exist in the database", async () => {
    let userNameInput = await screen.findByLabelText('Username');
    let passwordInput = await screen.findByLabelText('Password');
    let loginButton = await screen.getByRole("button", {name: /Login/i}) // we get the login button
    await user.type(userNameInput,userDataThatExist.username); // type in the username input the new username
    await user.type(passwordInput,userDataThatExist.password); // type in the password input the new password
    await user.click(loginButton) // simulate the click on the login button
    expect(await (await screen.findAllByRole("heading")).length).toBeLessThan(2);
  });
});