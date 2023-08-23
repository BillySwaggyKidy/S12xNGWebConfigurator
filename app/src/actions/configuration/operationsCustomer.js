import { createAsyncThunk } from '@reduxjs/toolkit';
import { serverUrl } from '../../../serverside/routers/routes.js';
import fetch from 'cross-fetch';

// this action purpose is to handle all type of operations for the customer documents in the database
export const operationsCustomer = createAsyncThunk('configuration/operationsCustomer', async ({status, operationParameters}, { rejectWithValue }) => {
    try {
      // make request to backend
      const response = await fetch(`${serverUrl()}/configuration/operationsCustomer`, {
        method: 'POST',
        body: JSON.stringify({status, ...operationParameters}), // in this body, the status is the most important, the operationParameters contain the additional paramaters depending of the request of the server
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

export default operationsCustomer;