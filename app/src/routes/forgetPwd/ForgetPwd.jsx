import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { sendRequestToAdmin } from "../../actions/rootActions.js";
import { resetAuth } from "../../reducers/authentification.js";
import { Button, OutlinedInput, InputLabel, LinearProgress } from "@mui/material";

// this component represent the forgot password page
export default function ForgetPwd() {
    const { loading } = useSelector((state) => state.notification); // we get the success, loading and error var from the notification reducer
    const dispatch = useDispatch();
    const navigate = useNavigate(); // useNavigate is a React Router Hooks to navigate programmatically trougth route
    const [errorMsg, setErrorMsg] = useState("");
    const [values, setValues] = useState({
        username: {
            value: "",
            error: false
        },
    }); // we create a State React Hook to retain all the inputs value and also if the input should be labbeled like an error

    const goBack = () => { // this function purpose is to go back the main route and we reset the authentification reducer state
        dispatch(resetAuth());
        navigate("/");
    }

    const handleChange = (prop) => (event) => { // this function handle the change from the inputs
        let errorInput = values[prop].error; // we get the error property from the input that have been changed
        if (event.target.value !== "") { // if the value is no longer empty then
            errorInput = false // we change the error property from the values hook
        }
        // we update the value hook with the new value
        setValues({ ...values, [prop]: {...values[prop], value: event.target.value, error: errorInput }});
    };

    const sendPwdRecoveryRequest = () => { // the function send the data from the inputs to login into a account
        let valueArray = Object.values(values).map(element=>{
            return element.value;
        }); // we get an array that contain all the values from the inputs

        if (!valueArray.includes("")) { // if all the inputs's values are not empty then
            // we send them to the authentification reducer with an login action
            dispatch(sendRequestToAdmin({username: values.username.value}))
            .unwrap()
            .then((originalPromiseResult) => {
                navigate("/");
            })
            .catch((rejectedValueOrSerializedError) => {
                // if the action is rejected then
                setErrorMsg(rejectedValueOrSerializedError); // we update the errorMsg hook with the action error
            });
        }
        else { // or else if at least one the value is empty
            let newObject = JSON.parse(JSON.stringify(values)); // we copy the values hook objects into a new object
            for (const property in newObject) { // for each input that is empty then we change the error property to true
                newObject[property].error = newObject[property].value === "";
            }
            setValues(newObject); // we put the new object into the values hook
        }
    }

    // this function purpose is to handle all keyboard event
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') { // if the key pressed is the enter key then
            sendPwdRecoveryRequest(); // we try to login in the server
        }
    };

    return(
        <>
            <div className='flex flex-col min-w-full justify-center items-center min-h-full bg-authentification'>
                <div className="flex flex-col items-center bg-white rounded-md border-4 border-purple-400 w-[600px] h-[400px] p-1" onKeyDown={handleKeyDown}>
                    <div className="flex flex-row items-center justify-end w-[100%] h-[5%]">
                        <Button onClick={() => goBack()}>Go back</Button>
                    </div>
                    <div className="flex flex-col items-center justify-between w-[100%] h-[95%]">
                        <h1 className="text-2xl text-purple-400 font-bold">Send password request</h1>
                        <h4 className="text-red-600">{errorMsg}</h4>
                        <div className="flex flex-col items-around justify-center w-[80%] h-[50%]">
                            <InputLabel htmlFor="outlined-adornment-username" error={values.username.error}>Username</InputLabel>
                            <OutlinedInput id="outlined-adornment-username" type='text' error={values.username.error} value={values.username.value} onChange={handleChange('username')}/>
                        </div>
                        <div className="flex flex-col items-around justify-center w-[80%] h-[30%]">
                            <Button className="bg-purple-400 hover:bg-purple-300" size="large" variant="contained" onClick={sendPwdRecoveryRequest}>Send request</Button>
                            {loading && <LinearProgress/>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}