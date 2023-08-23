import React, { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import CheckBox from '@mui/material/Checkbox';

// this component represent a checkbox in a form
export default function FormCheckBox({id, required, readOnly, value, label, onChange, variant="outlined", width="auto"})
{
    const [helperText, setHelperText] = useState(""); // this hook represent the error message when the value is wrong
    const [checkBoxValue,setCheckBoxValue] = useState(value); // this represent the boolean value of the checkbox

    // this function is triggered everytime we click on the checkbox
    const handleChange = (event) => {
        const check = event.target.checked; // we get the new boolean check value
        setCheckBoxValue(check); // we update the checkboxValue hook
        onChange(id, check, true); // we send the change to the parent using the onChange function props
    }

    return (
        <FormControlLabel 
            id={id}
            label={label}
            control={<CheckBox color="primary" checked={checkBoxValue} onChange={!readOnly ? handleChange : undefined}/>}
            labelPlacement="start"
        />
    );
}