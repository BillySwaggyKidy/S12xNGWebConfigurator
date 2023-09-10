import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

// this component represent a shrink field in a form
export default function FormShrink({id, required, label, value, readOnly = false, condition, onChange, variant="outlined", width="auto", unit="", hitClip = false})
{
    const isTableMode = variant === "table"; // this check if the variant paramter value is table or not
    const helperTextDefaultValue = isTableMode ? "" : " ";
    const [errorFormShrink, setErrorFormShrink] = useState(false); // this hook check if the select value is correct or not
    const [helperText, setHelperText] = useState(helperTextDefaultValue); // this hook represent the error message when the value is wrong
    const [shrinkValue,setShrinkValue] = useState(["",null].includes(value) ? 0 : value); // this hook represent the shrink value, if the value is empty then we set "0" or we just put the value from the props

    const sendChanges = (value) => {
        let isValid;
        setShrinkValue(value)
        if (!condition(+value) && required)
        {
            isValid = false;
            setErrorFormShrink(true);
            if (value === "")
            {
                setHelperText("Insert only number");
            }
            else
            {
                setHelperText("Select a correct value");
            }
        }
        else {
            isValid = true;
            setErrorFormShrink(false); // we cancel or state that there is no error in the shrink field
            setHelperText(helperTextDefaultValue); // we clear the error message
        }
        onChange(id, +value, isValid);
    };

    // this function handle the change of the shrink component
    const handleChange = (event) => {
        const fieldValue = event.target.value; // we first get the new value of the shrink
        sendChanges(fieldValue);
    }

    // this useEffect purpose is to react to new value prop
    useEffect(()=>{
        sendChanges(value);
    },[value, hitClip]);

    // this useEffect is to react to the change of condition from the shrink value
    useEffect(() => {
        let isValid;
        // if the value is not valided by the condition function props and the shrink field is required for the form to be valid then
        if (!condition(+shrinkValue) && required)
        {
            isValid = false;
            setErrorFormShrink(true);
            if (shrinkValue === "")
            {
                setHelperText("Insert only number");
            }
            else
            {
                setHelperText("Select a correct value");
            }
        }
        else {
            isValid = true;
            setErrorFormShrink(false); // we cancel or state that there is no error in the shrink field
            setHelperText(helperTextDefaultValue); // we clear the error message
        }
        onChange(id, +shrinkValue, isValid);
    },[condition(parseInt(shrinkValue))]);

    return (
        <TextField 
            id={id} 
            label={label} 
            className={`${isTableMode && 'tableField'}`}
            type="number" required={required}
            InputProps={{
                endAdornment: !isTableMode && <InputAdornment position="end">{unit}</InputAdornment>
            }}
            disabled={readOnly} 
            error={errorFormShrink} 
            value={shrinkValue} 
            InputLabelProps={{shrink: true,}}
            inputProps={{ style: { color: (isTableMode && errorFormShrink) ? 'red' : 'black'} }}
            // if the field has a the table variant, we don't display the helperText so that it dont change the height of the rows of the table
            helperText={isTableMode ? "" : helperText} 
            title={isTableMode ? helperText : ""}
            sx={{ width: width}}
            onChange={handleChange}
        />
    );
}