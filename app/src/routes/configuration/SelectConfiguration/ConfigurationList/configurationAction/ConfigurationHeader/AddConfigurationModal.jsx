import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import Button from "@mui/material/Button";
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from "@mui/material/MenuItem";
import { operationsConfiguration } from "../../../../../../actions/rootActions";

// this component represent the modal to create a new configuration to the database
export default function AddConfigurationModal({close}) {
    const { userInfo } = useSelector((state) => state.authentification); // we get the userInfo var from the authentification reducer
    const { customerData } = useSelector((state) => state.configuration); // we get the userInfo var from the configuration reducer
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState("");
    const [fieldValues, setFieldValues] =  useState({
        name: {
            value: "",
            error: false
        },
        deviceType: {
            value: "",
            error: false
        },
        firmwareVersion: {
            value: "",
            error: false
        },
        affairNumber: {
            value: "",
            error: false
        },
        ofNumber: {
            value: "",
            error: false
        },
        suffixCode: {
            value: "",
            error: false
        }
    });
    const arrayDeviceTypeItems = [
        {value:"128",label:"S128"},
        {value:"129",label:"S129"},
    ];

    const configurationChanges = () => {
        let valueArray = Object.values(fieldValues).map(element=>{
            return element.value;
        }); // we get an array that contain all the values from the inputs

        if (!valueArray.includes("")) { // if all the inputs's values are not empty then
            createConfiguration({
                name: fieldValues.name.value,
                affairNumber: fieldValues.affairNumber.value,
                deviceType: fieldValues.deviceType.value,
                firmwareVersion: fieldValues.firmwareVersion.value,
                ofNumber: fieldValues.ofNumber.value,
                suffixCode: fieldValues.suffixCode.value,
                isValid: false
            });
        }
        else { // or else if at least one the value is empty
            let newObject = JSON.parse(JSON.stringify(fieldValues)); // we copy the values hook objects into a new object
            for (const property in newObject) { // for each input that is empty then we change the error property to true
                newObject[property].error = newObject[property].value === "";
            }
            setFieldValues(newObject); // we put the new object into the values hook
        }
    };

    // this function send the new configuration object to the server 
    const createConfiguration = (newConfiguration) => {
        dispatch(operationsConfiguration({
            status: "Create", 
            operationParameters: {hostId: userInfo._id, customerId: customerData._id, configurationObject: newConfiguration}
        }))
        .unwrap()
        .then((originalPromiseResult) => {
          // if the action is fulfilled then
          setErrorMsg(""); // we clear the errorMsg hook
          close(); // we close the modal
        })
        .catch((rejectedValueOrSerializedError) => {
          // if the action is rejected then
          setErrorMsg(rejectedValueOrSerializedError); // we update the errorMsg hook with the action error
        });
    };

    // this function purpose is to handle all keyboard event
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') { // if the key pressed is the enter key then
            configurationChanges(); // we try to login in the server
        }
    };

    const handleFieldChange = (prop) => (event) => { // this function handle the change from the inputs
        let errorInput = fieldValues[prop].error; // we get the error property from the input that have been changed
        if (event.target.value !== "") { // if the value is no longer empty then
            errorInput = false // we change the error property from the values hook
        }

        // we get all of the value of the object except the first field that represent the name of the configuration
        if (Object.keys(fieldValues).slice(1).includes(prop)) { // the field changed is one the many fields that compose the name of the configuration then
            let newFieldValuesObject = JSON.parse(JSON.stringify(fieldValues)); // we deep copy the object of the fieldValues
            newFieldValuesObject[prop] = {value: event.target.value, error: errorInput}; // we change the data of the changed field in the newFieldValues object
            let valueArray = Object.values(newFieldValuesObject).slice(1).map(element=>element.value); // we get all of the values of the 6 fields after the field name
    
            if (!valueArray.includes("")) { // none of them is empty then
                let configNameTemplate = "S _Fw _ _ _ ";
                valueArray.forEach((value)=> {
                    configNameTemplate = configNameTemplate.replace(" ", value);
                });
                newFieldValuesObject.name.value = configNameTemplate; // we change the name with the concat of all the 6 fields values with a "_" between them
            }
            setFieldValues(newFieldValuesObject); // we update the new object
        }
        else {
            // we update the value hook with the new value
            setFieldValues({ ...fieldValues, [prop]: {...fieldValues[prop], value: event.target.value, error: errorInput }});
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-80 overflow-y-auto h-full w-full z-50 animate-fade-in-center">
            <div className="relative top-20 mx-auto p-5 w-[500px] h-[500px] shadow-lg rounded-md bg-white border-2 border-green-500" onKeyDown={handleKeyDown}>
                <div className="h-full mt-3 flex flex-col items-center">
                    <div className="h-1/6 flex flex-col items-center justify-around">
                        <h1 className="text-2xl leading-6 text-gray-900 font-bold">New Configuration</h1>
                        <h2>Please fill the required fields</h2>
                        {errorMsg && <p className="text-center font-bold underline text-lg text-red-600">{errorMsg}</p>}
                    </div>
                    <div className="w-full h-4/6 grid grid-cols-2 gap-4 items-center">
                        <TextField className="col-span-2" size="small" label="name" value={fieldValues.name.value} error={fieldValues.name.error} variant="outlined" onChange={handleFieldChange("name")}/>
                        <TextField
                            label="Device type"
                            value={fieldValues.deviceType.value}
                            error={fieldValues.deviceType.error}
                            variant="outlined"
                            onChange={handleFieldChange("deviceType")}
                            select 
                        >
                            {arrayDeviceTypeItems.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField size="small" label="Firmware version" value={fieldValues.firmwareVersion.value} error={fieldValues.firmwareVersion.error} variant="outlined" onChange={handleFieldChange("firmwareVersion")}/>
                        <TextField size="small" label="Affair number" value={fieldValues.affairNumber.value} error={fieldValues.affairNumber.error} variant="outlined" onChange={handleFieldChange("affairNumber")}/>
                        <TextField size="small" label="OF number" value={fieldValues.ofNumber.value} error={fieldValues.ofNumber.error} variant="outlined" onChange={handleFieldChange("ofNumber")}/>
                        <TextField size="small" label="Suffix code" value={fieldValues.suffixCode.value} error={fieldValues.suffixCode.error} variant="outlined" onChange={handleFieldChange("suffixCode")}/>
                    </div>
                    <div className="w-full h-1/6 flex flex-row justify-around items-center mt-2">
                        <Button className="bg-green-500 text-white" variant="contained" onClick={configurationChanges}>Create</Button>
                        <Button className="bg-slate-500 hover:bg-slate-400 text-white" variant="contained" onClick={close}>Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}