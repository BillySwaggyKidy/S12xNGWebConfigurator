import { createAsyncThunk } from '@reduxjs/toolkit';
import { serverUrl } from '../../../serverside/routers/routes.js';
import fetch from 'cross-fetch';

// this action purpose is to delete all the notifications of an given user from the database
export const deleteAllNotifications = createAsyncThunk('notification/deleteAllNotifications', async ({host}, { rejectWithValue }) => {
    try {
      // make request to backend
      const response = await fetch(`${serverUrl()}/notification/deleteAllNotifications`, {
        method: 'POST',
        body: JSON.stringify({host}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
      })
      .then(resp => resp.json()) // we transform the response into a JSON object
      return response;
    } 
    catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
);

export default deleteAllNotifications;