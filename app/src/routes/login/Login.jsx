import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/rootActions.js";
import { Button, OutlinedInput, InputAdornment, InputLabel, IconButton, LinearProgress } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Login() {
    const { loading, online } = useSelector((state) => state.authentification); // we get the loading, online and error var from the authentification reducer
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
        }
    }); // we create a State React Hook to retain all the inputs value and also if the input should be labbeled like an error

    const [showPassword, setShowPassword] = useState(false); // we create a State React Hook to see if we show the password in the password input

    useEffect(() => {
        // redirect user to the main page if login is successful
        if (online) {
            navigate("/");
        }
        else if (typeof error === 'string' && error.trim().length !== 0) { // if the user is not online but there is an error text than
            // we set all the error property of each input to true to label them as an error
            setValues({ ...values, username: {...values.username, error: true }, password: {...values.password, error: true }});
        }
    }, [loading, online]) // the useEffect react for change from the loading, online and error

    const handleChange = (prop) => (event) => { // this function handle the change from the inputs
        let errorInput = values[prop].error; // we get the error property from the input that have been changed
        if (event.target.value !== "") { // if the value is no longer empty then
            errorInput = false // we change the error property from the values hook
        }
        // we update the value hook with the new value
        setValues({ ...values, [prop]: {...values[prop], value: event.target.value, error: errorInput }});
    };

    const handleClickShowPassword = () => { // this function change the showPassword hook
        setShowPassword(!showPassword); // we alternate the showPassword boolean value
    };

    const sendLoginData = () => { // the function send the data from the inputs to login into a account
        let valueArray = Object.values(values).map(element=>{
            return element.value;
        }); // we get an array that contain all the values from the inputs

        if (!valueArray.includes("")) { // if all the inputs's values are not empty then
            // we send them to the authentification reducer with an login action
            dispatch(login({username: values.username.value, password: values.password.value}))
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
    };

    // this function purpose is to handle all keyboard event
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') { // if the key pressed is the enter key then
            sendLoginData(); // we try to login in the server
        }
    };

    return(
        <>
            <div className='flex flex-col min-w-full justify-center items-center min-h-full bg-authentification'>
                <div className="flex flex-col items-center bg-white rounded-md border-4 border-purple-800 w-[600px] h-[400px] p-1">
                    <div className="flex flex-col items-center justify-between w-[100%] h-[95%]" onKeyDown={handleKeyDown}>
                        <h1 className="text-2xl text-yellow-800 font-bold">S12xNG Web Configurator</h1>
                        <h3 className="text-xl text-black">Please sign in</h3>
                        <h4 className="text-red-600">{errorMsg}</h4>
                        <div className="flex flex-col items-around justify-around w-[80%] h-[50%]">
                            <InputLabel htmlFor="outlined-adornment-username" error={values.username.error}>Username</InputLabel>
                            <OutlinedInput id="outlined-adornment-username" type='text' error={values.username.error} value={values.username.value} onChange={handleChange('username')}/>
                            <InputLabel htmlFor="outlined-adornment-password" error={values.password.error}>Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                error={values.password.error}
                                value={values.password.value}
                                onChange={handleChange('password')}
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
                        <div className="flex flex-col items-around justify-center w-[80%] h-[30%]">
                            <Button className="bg-purple-800 hover:bg-purple-600" size="large" variant="contained" onClick={sendLoginData}>Login</Button>
                            <div className="flex flex-row items-start justify-around w-[100%] mt-1">
                                <button className="text-sky-500 underline" onClick={()=>navigate("/forget-password")}>Forgot password?</button>
                            </div>
                            {loading && <LinearProgress/>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}