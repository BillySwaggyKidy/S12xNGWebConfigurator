import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { operationsAccount, addNotification } from "../../../../../../actions/rootActions.js";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { OutlinedInput, InputAdornment, InputLabel, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';

// the component is a modal to edit a user's information like username, password
export default function AccountEditModal({account, close}) {
    const { userInfo } = useSelector((state) => state.authentification); // we get the userInfo var from the authentification reducer
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState("");
    const [fieldValues, setFieldValues] =  useState({
        username: {
            value: account.username,
            required: true,
            error: false
        },
        password: {
            value: "",
            required: false,
            error: false
        }
    }); // this state represent all the data of the form's fields
    const [showPassword, setShowPassword] = useState(false); // we create a State React Hook to see if we show the password in the password input

    const handleClickShowPassword = () => { // this function change the showPassword hook
        setShowPassword(!showPassword); // we alternate the showPassword boolean value
    };

    // this function verify that all the required fields value are valid before sending it to the server
    const saveAccountChanges = () => {
        let valueArray = Object.values(fieldValues).filter(element=>element.required).map(element=>element.value); // we get an array that contain all the values from the inputs that are required

        if (!valueArray.includes("")) { // if all the inputs's values are not empty then
            let object = {}; // we create an empty object
            Object.keys(fieldValues).forEach((key)=>{ // forEach key from the fielValues,
                if (fieldValues[key].value !== "") { // if the field is required
                    object[key] = fieldValues[key].value; // we add the required property with the value in the new object
                }
            });
            saveEditedAccount(object);
        }
        else {
            let newObject = JSON.parse(JSON.stringify(fieldValues)); // we copy the values hook objects into a new object
            for (const property in newObject) { // for each input that is empty then we change the error property to true
                let fieldObj = newObject[property];
                newObject[property].error = fieldObj.required && fieldObj.value === "";
            }
            setFieldValues(newObject); // we put the new object into the values hook
        }
    };

    // this function is to send to the server the new user's info in order to edit
    const saveEditedAccount = (newAccount) => {
        dispatch(operationsAccount({
            status: "Edit", 
            operationParameters: {hostId: userInfo._id, userId: account._id, userObject: newAccount}
        }))
        .unwrap()
        .then((originalPromiseResult) => {
          // if the action is fulfilled then
          setErrorMsg(""); // we clear the errorMsg hook
          // we add a new notification to the user to tell him that his informations are changed
          dispatch(addNotification({host: account._id, title: "[Response]: User info changed", message:"The admin has changed your account info", redirecTo: null, status: "Info"}));
          close(); // we close the modal
        })
        .catch((rejectedValueOrSerializedError) => {
          // if the action is rejected then
          setErrorMsg(rejectedValueOrSerializedError); // we update the errorMsg hook with the action error
        });
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
            <div className="relative top-20 mx-auto p-5 border-2 w-[600px] h-[400px] shadow-lg rounded-md bg-white border-orange-400">
                <div className="mt-3 flex flex-col items-center justify-start">
                    <div className="flex flex-col items-center justify-around">
                        <Avatar sx={{ width: 56, height: 56 }}>{account.username.charAt(0)}</Avatar>
                        <h1 className="text-2xl leading-6 text-gray-900 font-bold">Edit User</h1>
                        <h4 className="text-sm leading-6 font-medium text-gray-900 underline mt-1">You can change the username and the password</h4>
                        {errorMsg && <p className="text-center font-bold underline text-lg text-red-600">{errorMsg}</p>}
                    </div>
                    <div className="flex flex-col items-start justify-around w-[50%] h-[50%] my-2">
                        <InputLabel htmlFor="outlined-adornment-username" error={fieldValues.username.error}>Username</InputLabel>
                        <OutlinedInput id="outlined-adornment-username" className="w-full" type='text' error={fieldValues.username.error} value={fieldValues.username.value} onChange={handleFieldChange('username')}/>
                        <InputLabel htmlFor="outlined-adornment-password" error={fieldValues.password.error}>Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            className="w-full"
                            type={showPassword ? 'text' : 'password'}
                            error={fieldValues.password.error}
                            value={fieldValues.password.value}
                            onChange={handleFieldChange('password')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                    </div>
                    <div className="w-full flex flex-row justify-around items-center mt-2">
                        <Button className="bg-orange-400 hover:bg-orange-500 text-white" variant="contained" onClick={saveAccountChanges}>Edit</Button>
                        <Button className="bg-slate-500 hover:bg-slate-400 text-white" variant="contained" onClick={close}>Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}