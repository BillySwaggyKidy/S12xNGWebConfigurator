import { createAsyncThunk } from '@reduxjs/toolkit';
import { serverUrl } from '../../../serverside/routers/routes.js';
import fetch from 'cross-fetch';

// this action purpose is to send a bunch of configurations files in order to import them into the database
export const importConfigurationFiles = createAsyncThunk('configuration/importConfigurationFiles', async ({confFiles}, { rejectWithValue }) => {
    try {
      const response = await fetch(`${serverUrl()}/configuration/importConfigurationFiles`, {
        method: 'POST',
        body: confFiles,
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
      }) // we transform the response into a JSON object
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

export default importConfigurationFiles;