import { createSlice } from '@reduxjs/toolkit'
import { getAccounts, operationsAccount } from "../actions/rootActions.js";

const initialState = { // this is the initial state of the authentification Reducer
  userList: [], // a var to indicate the list of all accounts except the admin on
  loading: false, // a var that indicate if a request is loading
  success: false // a var that indicate if the action is a successs
}

const accountsReducer = createSlice({
    name: 'accounts',
    initialState,
    reducers: { // these are the functions that can modify the state of the reducers
      resetAccount: (state) => { // this function reset the state authentification like the loading, the success and the error
        state.userList = [];
        state.loading = false;
        state.success = false;
      },
    },
    extraReducers: (builder) => { // theses are extra reducers
        builder.addCase(getAccounts.pending, (state, action) => { // when the getAccounts is pending (loading) we are modifying the following state var
            state.loading = true; // we put the loading to true
            state.success = false;
        })
        .addCase(getAccounts.fulfilled, (state, action) => { // when the getAccounts is a fulfilled (success) we are modifying the following state var
            state.userList = action.payload;
            state.loading = false; // we put the loading to false
            state.success = true;
        })
        .addCase(getAccounts.rejected, (state, action) => { // when the getAccounts is rejected (error) we are modifying the following state var
            state.loading = false; // no more loading
            state.success = false;
        })
        .addCase(operationsAccount.pending, (state, action) => { // when the operationsAccount is pending (loading) we are modifying the following state var
          state.loading = true; // we put the loading to true
          state.success = false;
        })
        .addCase(operationsAccount.fulfilled, (state, action) => { // when the operationsAccount is a fulfilled (success) we are modifying the following state var
            state.userList = action.payload; // we check if the data send by the action contain "OK"
            state.loading = false; // we put the loading to false
            state.success = true;
        })
        .addCase(operationsAccount.rejected, (state, action) => { // when the operationsAccount is rejected (error) we are modifying the following state var
            state.loading = false; // no more loading
            state.success = false;
        })
    }
  })
  
// Action creators are generated for each case reducer function
export const { resetAccount } = accountsReducer.actions;

export default accountsReducer.reducer