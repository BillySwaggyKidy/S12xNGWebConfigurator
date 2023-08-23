import { createAsyncThunk } from '@reduxjs/toolkit';
import { serverUrl } from '../../../serverside/routers/routes.js';
import fetch from 'cross-fetch';

// this action purpose is to get the list of all the customers from the database
export const getAllCustomers = createAsyncThunk('configuration/getAllCustomers', async ({host}, { rejectWithValue }) => {
    try {
      // make request to backend
      const response = await fetch(`${serverUrl()}/configuration/getAllCustomers`, {
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

export default getAllCustomers;