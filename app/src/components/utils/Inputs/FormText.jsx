import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

// this component represent a text field in a form
export default function FormText({id, required, label, value, readOnly = false, condition, onChange, variant="outlined", width="auto", hitClip = false})
{
    const [errorFormText, setErrorFormText] = useState(false); // this hook check if the select value is correct or not
    const [helperText, setHelperText] = useState(" "); // this hook represent the error message when the value is wrong
    const [textValue, setTextValue] = useState(value); // this hook represent the text value, we set it with the props value
    const isTableMode = variant === "table"; // this check if the variant paramter value is table or not

    const sendChanges = (value) => {
        setTextValue(value);
        let isValid;
        // if the text match the regex or is the text field is not required for the form to be valid then
        if (new RegExp(condition).test(value) || required == false)
        {
            isValid = true;
            setErrorFormText(false); // we cancel or state that there is no error in the text field
            setHelperText(""); // we clear the error message
        }
        else
        {
            isValid = false;
            setErrorFormText(true); // we set the error
            setHelperText(value == "" ? "Empty field" : "Incorrect input"); // if the text is empty then we indicate that the text is empty or else we indicate that the input is incorrect
        }
        onChange(id, value, isValid); // either way, we then send the change to the parent using the onChange function props
    };
    
    // this function handle the change of the text component
    const handleChange = (event) => {
        const text = event.target.value;
        sendChanges(text);
    }

    useEffect(()=>{
        sendChanges(value);
    },[value, hitClip]);

    return (
        <TextField 
            id={id}
            label={label}
            className={`${isTableMode && 'tableField'}`}
            error={errorFormText}
            value={textValue}
            disabled={readOnly}
            // if the field has a the table variant, we don't display the helperText so that it dont change the height of the rows of the table
            helperText={isTableMode ? "" : helperText}
            title={isTableMode ? helperText : ""}
            inputProps={{ style: { color: (isTableMode && errorFormText) ? 'red' : 'black'} }}
            sx={{ width: width }}
            onChange={handleChange}
        />
    );
}