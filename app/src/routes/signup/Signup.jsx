import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setErrorMsg } from "../../reducers/authentification.js";
import { signup } from "../../actions/rootActions.js";
import { resetAuth } from "../../reducers/authentification.js";
import { Button, TextField, LinearProgress } from "@mui/material";

export default function Signup() {
    const { loading, error, success } = useSelector((state) => state.authentification); // we get the loading, error and success var from the authentification reducer
    const dispatch = useDispatch();
    const navigate = useNavigate(); // useNavigate is a React Router Hooks to navigate programmatically trougth route
    const [errorMsg, setErrorMsg] = useState("");
    const [values, setValues] = useState({
        username: {
            value: "",
            error: false
        },
        password: {
            value: "",
            error: false
        },
        confirmPassword: {
            value: "",
            error: false
        }
    }); // we create a State React Hook to retain all the inputs value and also if the input should be labbeled like an error

    const [errorText, setErrorText] = useState(""); // we create a State React Hook that contain the text for the error if the user failed to enter hsi user info

    useEffect(() => {
        if (error) setErrorText(error);
        // redirect user to login page if registration was successful
        if (success) {
            navigate("/login");
        }
    }, [loading, error, success]); // the useEffect react for change from the loading, error and success

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

    const sendSignupData = () => { // the function send the data from the inputs to register a new user into the DB
        let valueArray = Object.values(values).map(element=> {
            return element.value;
        }); // we get an array that contain all the values from the inputs

        if (!valueArray.includes("")) { // if all the inputs's values are not empty then
            if (values.password.value == values.confirmPassword.value) // if the password and confirm password are the same then
            {
                // we send them to the authentification reducer with an action signup
                dispatch(signup({username: values.username.value, password: values.password.value}))
                .unwrap()
                .then((originalPromiseResult) => {
                    navigate("/");
                })
                .catch((rejectedValueOrSerializedError) => {
                    // if the action is rejected then
                    setErrorMsg(rejectedValueOrSerializedError); // we update the errorMsg hook with the action error
                });
            }
            else
            {
                // we only change the error property of the password and confirm password from the values hook
                setValues({ ...values, password: {...values.password, error: true }, confirmPassword: {...values.confirmPassword, error: true }});
                setErrorMsg("Passwords do not match");
            }
        }
        else { // or else if at least one the value is empty
            let newObject = JSON.parse(JSON.stringify(values)); // we copy the values hook objects into a new object
            for (const property in newObject) { // for each input that is empty then we change the error property to true
                newObject[property].error = newObject[property].value === "";
            }
            setValues(newObject); // we put the new object into the values hook
        }
    }

    return(
        <>
            <div className='flex flex-col min-w-full justify-center items-center min-h-full bg-authentification'>
                <div className="flex flex-col items-center bg-white rounded-md border-4 border-green-800 w-[600px] h-[400px] p-1">
                    <div className="flex flex-row items-center justify-end w-[100%] h-[5%]">
                        <Button onClick={() => goBack()}>Go back</Button>
                    </div>
                    <div className="flex flex-col items-center justify-between w-[100%] h-[95%]">
                        <h1 className="text-2xl font-bold text-green-800">This is the Sign Up page</h1>
                        <h4 className="text-red-600">{errorMsg}</h4>
                        <div className="flex flex-col items-around justify-around w-[80%] h-[50%]">
                            <TextField id="username" label="Username" variant="outlined" error={values.username.error} value={values.username.value} onChange={handleChange('username')}/>
                            <TextField id="password" label="Password" variant="outlined" error={values.password.error} value={values.password.value} onChange={handleChange('password')}/>
                            <TextField id="confirm-password" label="Confirm password" variant="outlined" error={values.confirmPassword.error} value={values.confirmPassword.value} onChange={handleChange('confirmPassword')}/>
                        </div>
                        <div className="flex flex-col items-around justify-center w-[80%] h-[30%]">
                            <Button className="bg-green-800 hover:bg-green-600" size="large" variant="contained" onClick={sendSignupData}>Sign Up</Button>
                            <div className="flex flex-row items-start justify-around w-[100%] mt-1">
                                <button className="text-sky-500 underline" onClick={() => navigate("/login")}>Already have an account? Log in</button>
                            </div>
                            {loading && <LinearProgress/>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}