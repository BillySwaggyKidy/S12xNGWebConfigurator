import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { OutlinedInput, InputAdornment, InputLabel, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { operationsAccount } from "../../../../../../actions/rootActions.js";

// this component is an modal to create a new user in the database
export default function CreateUserModal({close}) {
    const { userInfo } = useSelector((state) => state.authentification); // we get the userInfo var from the authentification reducer
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState("");
    const [fieldValues, setFieldValues] =  useState({
        username: {
            value: "",
            error: false
        },
        password: {
            value: "",
            error: false
        },
        profile: {
            value: "",
            error: false
        },
    });
    const arrayProfileItems = [
        {value:"Viewer",label:"Viewer"},
        {value:"Configurator",label:"Configurator"},
    ];
    const [showPassword, setShowPassword] = useState(false); // we create a State React Hook to see if we show the password in the password input

    const handleClickShowPassword = () => { // this function change the showPassword hook
        setShowPassword(!showPassword); // we alternate the showPassword boolean value
    };

    const userChanges = () => {
        let valueArray = Object.values(fieldValues).map(element=>{
            return element.value;
        }); // we get an array that contain all the values from the inputs

        if (!valueArray.includes("")) { // if all the inputs's values are not empty then
            createUser({
                username: fieldValues.username.value,
                password: fieldValues.password.value,
                profile: fieldValues.profile.value,
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
    const createUser = (newUser) => {
        dispatch(operationsAccount({
            status: "Create", 
            operationParameters: {hostId: userInfo._id, userObject: newUser}
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
            userChanges(); // we try to login in the server
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
            <div className="relative top-20 mx-auto p-5 w-[500px] h-[500px] shadow-lg rounded-md bg-white border-2 border-green-500" onKeyDown={handleKeyDown}>
                <div className="h-full mt-3 flex flex-col items-center">
                    <div className="h-1/6 flex flex-col items-center justify-around">
                        <h1 className="text-2xl leading-6 text-gray-900 font-bold">New User</h1>
                        <h2>Please fill the required fields</h2>
                        {errorMsg && <p className="text-center font-bold underline text-lg text-red-600">{errorMsg}</p>}
                    </div>
                    <div className="w-full h-4/6 grid grid-rows-3 grid-cols-1 items-center place-items-center px-12">
                        <div className="w-4/5">
                            <InputLabel htmlFor="outlined-adornment-username" error={fieldValues.username.error}>Username</InputLabel>
                            <OutlinedInput id="outlined-adornment-username" className="w-full" type='text' error={fieldValues.username.error} value={fieldValues.username.value} onChange={handleFieldChange('username')}/>
                        </div>
                        <div className="w-4/5">
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
                        <div className="w-4/5">
                            <InputLabel htmlFor="outlined-adornment-profile" error={fieldValues.profile.error}>Profile</InputLabel>
                            <Select id="outlined-adornment-profile" className="w-full" value={fieldValues.profile.value} onChange={handleFieldChange("profile")}>
                                {arrayProfileItems.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className="w-full h-1/6 flex flex-row justify-around items-center mt-2">
                        <Button className="bg-green-500 text-white" variant="contained" onClick={userChanges}>Create</Button>
                        <Button className="bg-slate-500 hover:bg-slate-400 text-white" variant="contained" onClick={close}>Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}