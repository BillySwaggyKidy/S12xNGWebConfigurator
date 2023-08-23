import { createAsyncThunk } from '@reduxjs/toolkit';
import { serverUrl } from '../../../serverside/routers/routes.js';
import fetch from 'cross-fetch';

// this action is a createAsyncThunk action, it purpose is to make a request into the backend and send the response into the reducer
export const login = createAsyncThunk('authentification/login', async ({ username, password }, { rejectWithValue }) => {
    try {
      // make request to backend
      const response = await fetch(`${serverUrl()}/authentification/login`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
      })
      .then(async (resp) => {
        const contentType = resp.headers.get("content-type");
        // the contentType of the response is not json then it is an error message
        if (!contentType.includes("application/json")) {
          let errorMessage = await resp.text();
          return rejectWithValue(errorMessage); // we rejecte the action with a value containing the error message
        }
        else {
          return resp.json(); 
        }
      }); // we transform the response into a JSON object
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

export default login;
