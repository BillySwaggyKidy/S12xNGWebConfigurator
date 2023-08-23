import { createSlice } from '@reduxjs/toolkit'
import { getAllNotifications, addNotification, readNotification, deleteOneNotification, deleteAllNotifications, sendRequestToAdmin  } from "../actions/rootActions.js";

const initialState = { // this is the initial state of the notification Reducer
    notificationList: [], // a var array thart contain all of the user notification
    success: false,  // a var that indicate if the action is a success
    loading: false, // a var that indicate if a request is loading
    error: null // a var that contain a text that explain the error if the action failed
}

const notificationReducer = createSlice({
    name: 'notification',
    initialState,
    reducers: { // these are the functions that can modify the state of the reducers
      resetNotification: (state) => { // this function reset the state notification like the notificationList, the loading, the success and the error
        state.notificationList = [];
        state.success = false;
        state.loading = false;
        state.error = null;
      },
    },
    extraReducers: (builder) => { // theses are extra reducers that respond to notifications actions
        builder.addCase(getAllNotifications.rejected, (state, action) => { // when the getAllNotifications request is rejected (error) we are modifying the following state var
            state.notificationList = [];
            state.success = false;
            state.error = action.payload;
        })
        .addCase(getAllNotifications.fulfilled, (state, action) => { // when the getAllNotifications request is fulfilled (success) we are modifying the following state var
            state.notificationList = action.payload;
            state.success = true;
            state.error = null;
        })
        .addCase(addNotification.rejected, (state, action) => { // when the addNotification request is rejected (error) we are modifying the following state var
            state.error = action.payload;
        })
        .addCase(addNotification.fulfilled, (state, action) => { // when the addNotification request is fulfilled (success) we are modifying the following state var
            state.success = true;
            state.error = null;
            state.loading = false;
        })
        .addCase(sendRequestToAdmin.rejected, (state, action) => { // when the sendRequestToAdmin request is rejected (error) we are modifying the following state var
            state.success = false;
            state.loading = false;
        })
        .addCase(sendRequestToAdmin.fulfilled, (state, action) => { // when the sendRequestToAdmin request is fulfilled (success) we are modifying the following state var
            state.success = true;
            state.loading = false;
        })
        .addCase(sendRequestToAdmin.pending, (state, action) => { // when the sendRequestToAdmin request is rejected (error) we are modifying the following state var
            state.success = false;
            state.loading = true;
        })
        .addCase(readNotification.rejected, (state, action) => { // when the readNotification request is rejected (error) we are modifying the following state var
            state.success = false;
            state.error = action.payload;
        })
        .addCase(readNotification.fulfilled, (state, action) => { // when the readNotification request is fulfilled (success) we are modifying the following state var
            state.notificationList = action.payload;
            state.success = true;
            state.error = null;
        })
        .addCase(deleteOneNotification.rejected, (state, action) => { // when the deleteOneNotification request is rejected (error) we are modifying the following state var
            state.success = false;
            state.error = action.payload;
        })
        .addCase(deleteOneNotification.fulfilled, (state, action) => { // when the deleteOneNotification request is fulfilled (success) we are modifying the following state var
            state.notificationList = action.payload;
            state.success = true;
            state.error = null;
        })
        .addCase(deleteAllNotifications.rejected, (state, action) => { // when the deleteAllNotifications request is rejected (error) we are modifying the following state var
            state.success = false;
            state.error = action.payload;
        })
        .addCase(deleteAllNotifications.fulfilled, (state, action) => { // when the deleteAllNotifications request is fulfilled (success) we are modifying the following state var
            state.notificationList = action.payload;
            state.success = true;
            state.error = null;
        });
    }
  })
  
// Action creators are generated for each case reducer function
export const { resetNotification } = notificationReducer.actions;

export default notificationReducer.reducer