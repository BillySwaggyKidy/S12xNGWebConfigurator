import { createAsyncThunk } from '@reduxjs/toolkit';
import { serverUrl } from '../../../serverside/routers/routes.js';
import fetch from 'cross-fetch';

// this action is a createAsyncThunk action, it purpose is to get all of the existing accounts from the database except the admin accounts
export const getAccounts = createAsyncThunk('admin/getAccounts', async ({id}, { rejectWithValue }) => {
    try {
      // make request to backend
      const response = await fetch(`${serverUrl()}/admin/getAccounts`, {
        method: 'POST',
        body: JSON.stringify({id}),
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

export default getAccounts;