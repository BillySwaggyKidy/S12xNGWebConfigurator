import { createSlice } from '@reduxjs/toolkit'
import { login, signup, editUserInfo  } from "../actions/rootActions.js";

const initialState = { // this is the initial state of the authentification Reducer
  online: false, // a var to indicate if the user is online or not
  userInfo: null, // a var object that contain all the user infos
  loading: false, // a var that indicate if a request is loading
  success: false,  // a var that indicate if the action is a success
  urlPath: "/", // a var that indicate the last url the user has visited
}

const authentificationReducer = createSlice({
    name: 'authentification',
    initialState,
    reducers: { // these are the functions that can modify the state of the reducers
      disconnect: (state) => { // this function disconnect the user from his account and reset the state
        state.online = false;
        state.userInfo = null;
        state.loading = false;
        state.success = false;
        state.urlPath = "/";
      },
      resetAuth: (state) => { // this function reset the state authentification like the loading, the success and the error
        state.loading = false;
        state.success = false;
      },
      setUrlPath: (state, action) => {
        state.urlPath = action.payload;
      }
    },
    extraReducers: (builder) => { // theses are extra reducers that respond to login and signup actions
        builder.addCase(signup.pending, (state, action) => { // when the signup is pending (loading) we are modifying the following state var
            state.loading = true; // we put the loading to true
        })
        .addCase(signup.fulfilled, (state, action) => { // when the signup is a fulfilled (success) we are modifying the following state var
            state.success = (action.payload == "OK"); // we check if the data send by the action contain "OK"
            state.loading = false; // we put the loading to false
        })
        .addCase(signup.rejected, (state, action) => { // when the signup is rejected (error) we are modifying the following state var
            state.loading = false; // no more loading
            state.success = false; // no success
        })
        .addCase(login.pending, (state, action) => { // when the login is pending (loading) we are modifying the following state var
            state.loading = true; // we put the loading to true
        })
        .addCase(login.fulfilled, (state, action) => { // when the login is fulfilled (success) we are modifying the following state var
            state.userInfo = action.payload; // we set the userInfo state with the object from the state's payload
            state.success = false;
            state.online = true; // we set the online var to true to put the user online
            state.loading = false; // no more loading
        })
        .addCase(login.rejected, (state, action) => { // when the login is rejected (error) we are modifying the following state var
            state.loading = false; // no more loading
            state.success = false; // no success
        })
        .addCase(editUserInfo.pending, (state, action) => { // when the login is pending (loading) we are modifying the following state var
          state.loading = true; // we put the loading to true
        })
        .addCase(editUserInfo.fulfilled, (state, action) => { // when the login is fulfilled (success) we are modifying the following state var
            state.userInfo = action.payload; // we set the userInfo state with the object from the state's payload
        })
        .addCase(editUserInfo.rejected, (state, action) => { // when the login is rejected (error) we are modifying the following state var
            state.loading = false; // no more loading
            state.success = false; // no success
        });
    }
  })
  
// Action creators are generated for each case reducer function
export const { disconnect, resetAuth, setUrlPath } = authentificationReducer.actions;

export default authentificationReducer.reducer
