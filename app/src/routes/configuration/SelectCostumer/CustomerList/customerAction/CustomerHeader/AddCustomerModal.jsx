import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { operationsCustomer } from "../../../../../../actions/rootActions";

export default function AddCustomerModal({close}) {
    const { userInfo } = useSelector((state) => state.authentification); // we get the userInfo var from the authentification reducer
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState("");
    const [fieldValues, setFieldValues] =  useState({
        name: {
            value: "",
            error: false
        },
        code: {
            value: "",
            error: false
        }
    });

    const customerChanges = () => {
        let valueArray = Object.values(fieldValues).map(element=>{
            return element.value;
        }); // we get an array that contain all the values from the inputs

        if (!valueArray.includes("")) { // if all the inputs's values are not empty then
            createCustomer({
                name: fieldValues.name.value,
                code: fieldValues.code.value
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

    // this function send the new customer object to the server 
    const createCustomer = (newCustomer) => {
        dispatch(operationsCustomer(
        {
            status: "Create",
            operationParameters: {hostId: userInfo._id, customerObject: newCustomer}
        }))
        .unwrap()
        .then((originalPromiseResult) => {
          // handle result here
          setErrorMsg(""); // we clear the errorMsg hook
          close(); // we close the modal
        })
        .catch((rejectedValueOrSerializedError) => {
          // handle error here
          setErrorMsg(rejectedValueOrSerializedError); // we update the errorMsg hook with the action error
        });
    };

    // this function purpose is to handle all keyboard event
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') { // if the key pressed is the enter key then
            customerChanges(); // we try to login in the server
        }
    };

    const handleFieldChange = (prop) => (event) => { // this function handle the change from the inputs
        let errorInput = fieldValues[prop].error; // we get the error property from the input that have been changed
        if (event.target.value !== "") { // if the value is no longer empty then
            errorInput = false // we change the error property from the values hook
        }
        // we update the value hook with the new value
        setFieldValues({ ...fieldValues, [prop]: {...fieldValues[prop], value: event.target.value, error: errorInput }});
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-80 overflow-y-auto h-full w-full z-50 animate-fade-in-center">
            <div className="relative top-20 mx-auto p-5 w-[400px] h-[300px] shadow-lg rounded-md bg-white border-2 border-green-500" onKeyDown={handleKeyDown}>
                <div className="h-full mt-3 flex flex-col items-center">
                    <div className="h-1/6 flex flex-col items-center justify-around">
                        <h1 className="text-2xl leading-6 text-gray-900 font-bold">New Customer</h1>
                        <h2>Please fill the required fields</h2>
                        {errorMsg && <p className="text-center font-bold underline text-lg text-red-600">{errorMsg}</p>}
                    </div>
                    <div className="w-full h-4/6 grid grid-cols-2 gap-4 items-center">
                        <TextField size="small" label="name" value={fieldValues.name.value} error={fieldValues.name.error} variant="outlined" onChange={handleFieldChange("name")}/>
                        <TextField size="small" label="code" value={fieldValues.code.value} error={fieldValues.code.error} variant="outlined" onChange={handleFieldChange("code")}/>
                    </div>
                    <div className="w-full h-1/6 flex flex-row justify-around items-center mt-2">
                        <Button className="bg-green-500 text-white" variant="contained" onClick={customerChanges}>Create</Button>
                        <Button className="bg-slate-500 hover:bg-slate-400 text-white" variant="contained" onClick={close}>Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}