import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

// this component represent a text area field in a form
export default function FormTextArea({id, required, label, value, readOnly = false, condition, onChange, variant="outlined", width="auto"})
{
    const [errorFormText, setErrorFormText] = useState(false); // this hook check if the select value is correct or not
    const [helperText, setHelperText] = useState(""); // this hook represent the error message when the value is wrong
    const [textValue, setTextValue] = useState(value); // this hook represent the text value, we set it with the props value
    const isTableMode = variant === "table"; // this check if the variant paramter value is table or not
    
    // this function handle the change of the text component
    const handleChange = (event) => {
        const text = event.target.value;
        setTextValue(text);
        let isValid;
        // if the text match the regex or is the text field is not required for the form to be valid then
        if (text.toString().match(new RegExp(condition)))
        {
            isValid = true;
            setErrorFormText(false); // we cancel or state that there is no error in the text field
            setHelperText(""); // we clear the error message
        }
        else
        {
            isValid = false;
            setErrorFormText(true); // we set the error
            setHelperText("empty field"); // we indicate that the text is empty
        }
        onChange(id, text.toString(), isValid); // either way, we then send the change to the parent using the onChange function props
    }

    useEffect(()=>{
        let isValid;
        // if the text match the regex or is the text field is not required for the form to be valid then
        if (value.toString().match(new RegExp(condition)) || required == false)
        {
            isValid = true;
            setErrorFormText(false); // we cancel or state that there is no error in the text field
            setHelperText(""); // we clear the error message
        }
        else
        {
            isValid = false;
            setErrorFormText(true); // we set the error
            setHelperText("empty field or word already taken"); // we indicate that the text is empty or that word is already taken
        }
        onChange(id, value.toString(),isValid); // either way, we then send the change to the parent using the onChange function props
        
    },[value]);

    return (
        <TextField 
            id={id}
            label={label}
            multiline
            rows={4} 
            className={`${isTableMode && 'tableField'}`}
            error={errorFormText}
            disabled={readOnly}
            value={textValue}
            // if the field has a the table variant, we don't display the helperText so that it dont change the height of the rows of the table
            helperText={isTableMode ? "" : helperText}
            title={isTableMode ? helperText : ""}
            inputProps={{ style: { color: (isTableMode && errorFormText) ? 'red' : 'black'} }}
            sx={{ width: width }}
            nChange={handleChange}
        />
    );
}