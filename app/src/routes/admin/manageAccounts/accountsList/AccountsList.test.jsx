import React from 'react';
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../../utils/test-utils.jsx';
import AccountsList from './AccountsList.jsx';

describe('AccountsList', () => {

  const userAction = userEvent.setup();
  const userList = [
    {
      _id : "9864265849849845ezeze56b3",
      username : "Bill",
      profile : "Configurator",
    },
    {
      _id : "495825hedtstrhs4947zsrgzeg",
      username : "Billy",
      profile : "Configurator",
    },
    {
      _id : "1964825poefozena454effafa",
      username : "Bob",
      profile : "Viewer",
    }
  ];
    
  beforeEach(() => {
    renderWithProviders(<AccountsList accountList={userList}/>);
  });

  test('we are trying to use only the first filter (search bar)', async () => {
    let searchUsername = screen.getByLabelText("Search username"); // we get the search bar of the component
    await userAction.type(searchUsername, "b"); // we type the "b" on the search
    expect(screen.queryAllByTestId("account").length).toBe(3); // we expect to have 3 items displayed on the list
    await userAction.type(searchUsername, "i"); // we type the "bi" on the search
    expect(screen.queryAllByTestId("account").length).toBe(2); // we expect to have 2 items displayed on the list
    expect(screen.queryByText("Bill")).toBeInTheDocument(); // we expect to have an account named Bill
    expect(screen.queryByText("Billy")).toBeInTheDocument(); // we expect to have an account named Billy
    await userAction.type(searchUsername, "lly"); // we type the "billy" on the search
    expect(screen.queryByText("Billy")).toBeInTheDocument(); // we expect to have an account named Billy
    expect(screen.queryByText("Bill")).not.toBeInTheDocument(); // we expect to not have an account named Bill in the document
  });

  test('we are trying to add an additional filter and use it', async () => {
    let addFilterButton = screen.getByText("Add filter"); // we get the add filter button
    await userAction.click(addFilterButton); // we click on the add Filter button
    await userAction.click(screen.getByText("Status")); // then we click on the profile menu button to add the profile filter
    let profileFilter = screen.getByLabelText("Status");
    expect(profileFilter).toBeInTheDocument(); // we expect to have the new filter profile on the bottom of the search bar
    await userAction.click(profileFilter); // we click on the filter profile button
    await userAction.click(screen.getByRole("option",{name: /Configurator/i})); // then we select the Configurator profile on the menu
    expect(screen.queryAllByTestId("account").length).toBe(2); // we expect to have two items displayed on the list
    expect(screen.queryByText("Bill")).toBeInTheDocument();
    expect(screen.queryByText("Billy")).toBeInTheDocument();
    await userAction.click(profileFilter); // we click again on the filter profile button
    await userAction.click(screen.getByRole("option",{name: /Viewer/i})); // we select this time the Viewer profile on the menu
    expect(screen.queryAllByTestId("account").length).toBe(1); // we expect to have only one items displayed on the list
    expect(screen.queryByText("Bob")).toBeInTheDocument(); // we expect to have one item named Bob
    await userAction.click(screen.getByTestId("HighlightOffIcon")); // we click on the remove icon next to the filter profile
    expect(screen.queryAllByTestId("account").length).toBe(3); // we expect to have all of the items (3 items) back on the list
  });

  test('we are trying to use both the search bar and the additional filter Status', async () => {
    let searchUsername = screen.getByLabelText("Search username"); // we get the search bar of the component
    let addFilterButton = screen.getByText("Add filter"); // we get the add filter button
    await userAction.click(addFilterButton);
    await userAction.click(screen.getByText("Status")); // we click on the Status menu button
    await userAction.click(screen.getByLabelText("Status")); // we click on the new Status filter
    await userAction.click(screen.getByRole("option",{name: /Configurator/i})); // then we select the Configurator profile
    expect(screen.queryAllByTestId("account").length).toBe(2); // we expect to have two items displayed on the list
    await userAction.type(searchUsername, "billy"); // we type "billy" on the search bar on the menu
    expect(screen.queryAllByTestId("account").length).toBe(1); // we expect to have only one items displayed on the list
    expect(screen.queryByText("Billy")).toBeInTheDocument(); // we expect to have one item named Billy
    expect(screen.queryByText("Bill")).not.toBeInTheDocument(); // we expect to not have an account named Bill in the document
    await userAction.clear(searchUsername); // we clear the search bar
    await userAction.type(searchUsername, "bo"); // we type "bo" on the search bar
    expect(screen.queryAllByTestId("account").length).toBe(0); // we expect to have no item because there are no account with a Viewer Status that start with "bo"
  });

  test('we are checking the modal for each account items', async () => {
    let accountList = screen.queryAllByTestId("account"); // we get the search bar of the component
    // for each account item,
    accountList.forEach(async (account, index)=>{
      await userAction.click(account); // we click on it
      expect(screen.getByText("You can change the username and the password")).toBeInTheDocument(); // we expect to have a hint text in the modal
      await userAction.click(screen.getByText("Edit")); // we click on the edit button
      expect(screen.queryByText(userList[index].username)).toBeInTheDocument(); // we expect to have a field with the username of the account
      expect(screen.getByLabelText("password")).toBeInTheDocument(); // we expect to have a field for the password
      await userAction.click(screen.getByText("Cancel")); // we click to the cancel button to exit the modal
    });
    
  });

});