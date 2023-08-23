import React, {useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { editUserInfo } from "../../../../actions/rootActions";
import { setErrorMsg } from "../../../../reducers/authentification";
import { Button, OutlinedInput, InputAdornment, InputLabel, IconButton, LinearProgress } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';


export default function MainPassword() {
    const { userInfo, loading } = useSelector((state) => state.authentification); // we get the userInfo, loading var from the authentification reducers
    const dispatch = useDispatch();
    const [fieldValues, setFieldValues] = useState({
        password: {
            value: "",
            error: false,
            show: false
        },
        confirmPassword: {
            value: "",
            error: false,
            show: false
        },
    });
    const [errorText, setErrorText] = useState(""); // we create a State React Hook that contain the text for the error if the user failed to enter hsi user info

    const sendSignupData = () => { // the function send the data from the inputs to register a new user into the DB
        let valueArray = Object.values(fieldValues).map(element=> {
            return element.value;
        }); // we get an array that contain all the values from the inputs

        if (!valueArray.includes("")) { // if all the inputs's values are not empty then
            if (fieldValues.password.value == fieldValues.confirmPassword.value) // if the password and confirm password are the same then
            {
                let newUserObject = {
                    password: fieldValues.password.value,
                };
                let newObject = JSON.parse(JSON.stringify(fieldValues)); // we copy the fieldValues hook objects into a new object

                // we send them to the authentification reducer with an action signup
                dispatch(editUserInfo({id: userInfo._id, userObject: newUserObject}))
                .unwrap()
                .then((originalPromiseResult) => {
                    setErrorText(""); // we clear the error text
                    for (const property in newObject) { // for each input that is empty then we change the error property to false
                        newObject[property].error = false;
                    }
                })
                .catch((rejectedValueOrSerializedError) => {
                    // if the action is rejected then
                    setErrorText(rejectedValueOrSerializedError); // we update the errorText hook with the action error
                });

                for (const property in newObject) { // for each input that is empty then we clear the value property
                    newObject[property].value = "";
                }
                setFieldValues(newObject); // we put the new object into the fieldValues hook
            }
            else
            {
                // we only change the error property of the password and confirm password from the fieldValues hook
                setFieldValues({ ...fieldValues, password: {...fieldValues.password, error: true }, confirmPassword: {...fieldValues.confirmPassword, error: true }});
                setErrorText("Passwords do not match");
            }
        }
        else { // or else if at least one the value is empty
            let newObject = JSON.parse(JSON.stringify(fieldValues)); // we copy the fieldValues hook objects into a new object
            for (const property in newObject) { // for each input that is empty then we change the error property to true
                newObject[property].error = newObject[property].value === "";
            }
            setFieldValues(newObject); // we put the new object into the fieldValues hook
        }
    }

    const handleClickShowPassword = (prop) => () => { // this function change the show property of the fieldValues hooks
        setFieldValues({ ...fieldValues, [prop]: {...fieldValues[prop], show: !fieldValues[prop].show }});
    };

    const handleFieldChange = (prop) => (event) => { // this function handle the change from the inputs
        let changedValue = event.target.value;
        let newObject = JSON.parse(JSON.stringify(fieldValues)); // we copy the fieldValues hook objects into a new object
        newObject[prop].value = changedValue;
        let fieldNameArray = Object.keys(newObject).filter((key)=>key != prop);
        // this var verify that the changed value is not empty and that it is the same for the other fields values
        const samePassword = changedValue !== "" && fieldNameArray.map((key)=>newObject[key]).every((obj)=>obj.value == changedValue);
        for (const property in newObject) { // for each input that is empty then we change the error property depending of samePassword boolean value
            newObject[property].error = !samePassword;
        }
        // we update the value hook with the new value
        setFieldValues(newObject);
    };

    return (
        <div className="w-full h-full flex flex-col justify-around items-center">
            <div className="text-center">
                <h3 className="text-center text-2xl font-bold">Change your password</h3>
                <p>Please choose a strong new password</p>
                <h4 className="text-red-600">{errorText}</h4>
            </div>
            <div className="flex flex-col items-around justify-center w-[60%] h-[50%]">
                <InputLabel className="mt-4" htmlFor="outlined-adornment-password" error={fieldValues.password.error}>New password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={fieldValues.password.show ? 'text' : 'password'}
                    error={fieldValues.password.error}
                    value={fieldValues.password.value}
                    onChange={handleFieldChange('password')}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword("password")}
                        edge="end"
                        >
                        {fieldValues.password.show ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
                <InputLabel className="mt-4" htmlFor="outlined-adornment-confirmPassword" error={fieldValues.confirmPassword.error}>Confirm password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-confirmPassword"
                    type={fieldValues.confirmPassword.show ? 'text' : 'password'}
                    error={fieldValues.confirmPassword.error}
                    value={fieldValues.confirmPassword.value}
                    onChange={handleFieldChange('confirmPassword')}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword("confirmPassword")}
                        edge="end"
                        >
                        {fieldValues.confirmPassword.show ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
            </div>
            <Button className="bg-orange-500 text-white w-12" variant="contained" onClick={sendSignupData}>Edit</Button>
            {loading && <LinearProgress />}
        </div>
    );
}