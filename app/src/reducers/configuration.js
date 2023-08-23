import { createSlice } from '@reduxjs/toolkit'
import { 
    getAllCustomers, 
    getAllConfigurationsFromCustomer, 
    openOneConfiguration,
    closeOneConfiguration,
    operationsCustomer,
    operationsConfiguration,
    saveChangesToOneConfiguration,
    commitOfficialConfiguration,
    importConfigurationFiles
} from "../actions/rootActions.js";
import { HandleModeStatus, ConfStateStatus } from '../../utils/enums-utils.js';

const initialState = { // this is the initial state of the configuration Reducer
  customersList: [], // a var to indicate the list of all customers
  configurationsList: [], // a var to indicate the list of all the configurations from one customer
  customerData: null, // a var that represent the actual customer selected by the user                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  configurationData: null, // a var that represent the actual configuration selected by the user
  snapshotData: null, // a var that represent the snapshot version of the configuration
  handleMode: null, // a var that represent the mode the user is in when he handle a configuration,
  confStateStatus: ConfStateStatus.Sync, // a var that represent the state of the configuration when the user is saving
  loading: false, // a var that indicate if a request is loading
}

const configurationReducer = createSlice({
    name: 'configuration',
    initialState,
    reducers: { // these are the functions that can modify the state of the reducers
        resetConfigurationReducer: (state) => { // this function reset all the states of the configuration reducer
            state.customersList = [];
            state.configurationsList = [];
            state.customerData = null;
            state.configurationData = null;
            state.snapshotData = null;
            state.confStateStatus = null;
            state.handleMode = null;
            state.loading = false;
        },
        resetToCustomers: (state) => { // this function reset the state configuration like the loading the configurationsList and the configurationData
            state.configurationsList = [];
            state.customerData = null;
            state.configurationData = null;
            state.snapshotData = null;
            state.confStateStatus = null;
            state.handleMode = null;
            state.loading = false;
        },
        resetToConfigurations: (state) => { // this function reset the state configuration like the loading and the configurationData
            state.configurationData = null;
            state.snapshotData = null;
            state.confStateStatus = null;
            state.handleMode = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => { // theses are extra reducers to actions
        builder.addCase(getAllCustomers.pending, (state, action) => { // when the getAllCustomers is pending (loading) we are modifying the following state var
            state.customersList = [];
            state.configurationsList = [];
            state.customerData = null,
            state.configurationData = null;
            state.snapshotData = null;
            state.handleMode = null;
            state.loading = true;
        })
        .addCase(getAllCustomers.fulfilled, (state, action) => { // when the getAllCustomers is a fulfilled (success) we are modifying the following state var
            state.customersList = action.payload;
            state.loading = false; // we put the loading to false
        })
        .addCase(getAllCustomers.rejected, (state, action) => { // when the getAllCustomers is rejected (error) we are modifying the following state var
            state.customersList = [];
            state.loading = false; // no more loading
        })
        .addCase(getAllConfigurationsFromCustomer.pending, (state, action) => { // when the getAllConfigurationsFromCustomer is pending (loading) we are modifying the following state var
            state.configurationsList = [];
            state.customerData = null;
            state.configurationData = null;
            state.snapshotData = null;
            state.handleMode = null;
            state.loading = true;
        })
        .addCase(getAllConfigurationsFromCustomer.fulfilled, (state, action) => { // when the getAllConfigurationsFromCustomer is a fulfilled (success) we are modifying the following state var
            state.configurationsList = action.payload.configurationsList;
            state.customerData = action.payload.customerData;
            state.loading = false; // we put the loading to false
        })
        .addCase(getAllConfigurationsFromCustomer.rejected, (state, action) => { // when the getAllConfigurationsFromCustomer is rejected (error) we are modifying the following state var
            state.configurationsList = [];
            state.customerData = null;
            state.loading = false; // no more loading
        })
        .addCase(openOneConfiguration.pending, (state, action) => { // when the openOneConfiguration is pending (loading) we are modifying the following state var
            state.configurationData = null;
            state.snapshotData = null;
            state.handleMode = null;
        })
        .addCase(openOneConfiguration.fulfilled, (state, action) => { // when the openOneConfiguration is a fulfilled (success) we are modifying the following state var
            state.configurationData = action.payload.configuration;
            state.snapshotData = action.payload.snapshot;
            state.handleMode = action.payload.handleMode;
            state.loading = false; // we put the loading to false
        })
        .addCase(openOneConfiguration.rejected, (state, action) => { // when the openOneConfiguration is rejected (error) we are modifying the following state var
            state.configurationData = null;
            state.snapshotData = null;
            state.loading = false; // no more loading
            state.handleMode = null;
        })
        .addCase(closeOneConfiguration.fulfilled, (state, action) => { // when the closeOneConfiguration is a fulfilled (success) we are modifying the following state var
            state.configurationsList = action.payload;
            state.handleMode = null;
            state.loading = false; // we put the loading to false
        })
        .addCase(closeOneConfiguration.rejected, (state, action) => { // when the closeOneConfiguration is rejected (error) we are modifying the following state var
            state.configurationData = null;
            state.handleMode = null;
            state.loading = false; // no more loading
        })
        .addCase(operationsCustomer.fulfilled, (state, action) => { // when the operationsCustomer is a fulfilled (success) we are modifying the following state var
            state.customersList = action.payload;
            state.loading = false; // we put the loading to false
        })
        .addCase(operationsCustomer.rejected, (state, action) => { // when the operationsCustomer is rejected (error) we are modifying the following state var
            state.loading = false; // no more loading
        })
        .addCase(operationsConfiguration.fulfilled, (state, action) => { // when the operationsConfiguration is a fulfilled (success) we are modifying the following state var
            state.configurationsList = action.payload;
            state.loading = false; // we put the loading to false
        })
        .addCase(operationsConfiguration.rejected, (state, action) => { // when the operationsConfiguration is rejected (error) we are modifying the following state var
            state.loading = false; // no more loading
        })
        .addCase(saveChangesToOneConfiguration.pending, (state, action) => { // when the openOneConfiguration is pending (loading) we are modifying the following state var
            state.confStateStatus = ConfStateStatus.Loading; // the status is loading
        })
        .addCase(saveChangesToOneConfiguration.fulfilled, (state, action) => { // when the saveChangesToOneConfiguration is a fulfilled (success) we are modifying the following state var*
            if (state.handleMode == "Edit") {
                state.configurationData = action.payload.configuration;
                state.snapshotData = action.payload.snapshot;
                state.confStateStatus = ConfStateStatus.Updated; // we put an updated status
            }
            else {
                state.confStateStatus = null;
            }
        })
        .addCase(saveChangesToOneConfiguration.rejected, (state, action) => { // when the saveChangesToOneConfiguration is rejected (error) we are modifying the following state var
            state.confStateStatus = ConfStateStatus.Error; // we put an error status
        })
        .addCase(commitOfficialConfiguration.pending, (state, action) => { // when the commitOfficialConfiguration is pending (loading) we are modifying the following state var
            state.confStateStatus = ConfStateStatus.Loading; // the status is loading
        })
        .addCase(commitOfficialConfiguration.fulfilled, (state, action) => { // when the commitOfficialConfiguration is a fulfilled (success) we are modifying the following state var*
            state.configurationData = action.payload.configuration;
            state.snapshotData = action.payload.snapshot;
            state.confStateStatus = ConfStateStatus.Sync; // we put an updated status
        })
        .addCase(commitOfficialConfiguration.rejected, (state, action) => { // when the commitOfficialConfiguration is rejected (error) we are modifying the following state var
            state.confStateStatus = ConfStateStatus.ErrorSync;
        })
        .addCase(importConfigurationFiles.fulfilled, (state, action) => { // when the importConfigurationFiles is a fulfilled (success) we are modifying the following state var
            state.configurationsList = action.payload;
        })
    }
  })
  
// Action creators are generated for each case reducer function
export const { resetConfigurationReducer, resetToCustomers, resetToConfigurations } = configurationReducer.actions;

export default configurationReducer.reducer