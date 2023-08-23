import React, {useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { editUserInfo } from "../../../../actions/rootActions";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import LinearProgress from "@mui/material/LinearProgress";


export default function MainInformation() {
    const { userInfo, loading } = useSelector((state) => state.authentification); // we get the userInfo, loading var from the authentification reducers
    const dispatch = useDispatch();
    const [fieldValues, setFieldValues] =  useState({
        username: {
            value: userInfo.username,
            error: false
        },
    });
    const [errorText, setErrorText] = useState(""); // we create a State React Hook that contain the text for the error if the user failed to enter hsi user info

    const saveAccountChanges = () => {
        let valueArray = Object.values(fieldValues).map(element=>{
            return element.value;
        }); // we get an array that contain all the values from the inputs

        if (!valueArray.includes("")) { // if all the inputs's values are not empty then
            let newUserObject = {
                username: fieldValues.username.value,
            };
            dispatch(editUserInfo({id: userInfo._id, userObject: newUserObject}))
            .unwrap()
            .then((originalPromiseResult) => {
                setErrorText(""); // we clear the error Text
            })
            .catch((rejectedValueOrSerializedError) => {
                // if the action is rejected then
                setErrorText(rejectedValueOrSerializedError); // we update the errorText hook with the action error
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

    const handleFieldChange = (prop) => (event) => { // this function handle the change from the inputs
        let errorInput = fieldValues[prop].error; // we get the error property from the input that have been changed
        if (event.target.value !== "") { // if the value is no longer empty then
            errorInput = false // we change the error property from the values hook
        }
        // we update the value hook with the new value
        setFieldValues({ ...fieldValues, [prop]: {...fieldValues[prop], value: event.target.value, error: errorInput }});
    };

    return (
        <div className="w-full h-full flex flex-col justify-around items-center">
            <div className="text-center">
                <h3 className="text-center text-2xl font-bold">Update your personnal informations</h3>
                <p>Please fill the following fields with your new informations</p>
                <h4 className="text-red-600">{errorText}</h4>
            </div>
            <div className="flex flex-col items-around justify-center w-[60%] h-[50%]">
                <InputLabel htmlFor="outlined-adornment-username" error={fieldValues.username.error}>Username</InputLabel>
                <OutlinedInput id="outlined-adornment-username" type='text' error={fieldValues.username.error} value={fieldValues.username.value} onChange={handleFieldChange('username')}/>
            </div>
            <Button className="bg-orange-500 text-white w-12" variant="contained" onClick={saveAccountChanges}>Edit</Button>
            {loading && <LinearProgress />}
        </div>
    );
}