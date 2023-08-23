import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

// this component represent a select field in a form
export default function FormSelect({id, required, label, items, value, readOnly = false, onChange, variant="outlined", width="auto"})
{
    let arrayItems = [...items]; // we first make a new array of items and the rest of the items array
    const gotDefaultValue = (element) => element.value == 0;
    if (items.findIndex(gotDefaultValue) == -1 ) { // if the items props don't have a default 0 value then
        arrayItems.unshift({value: -1, label: '-- --'}); // we add a default one
    }
    
    const [errorFormSelect, setErrorFormSelect] = useState(false); // this hook check if the select value is correct or not
    const [helperText, setHelperText] = useState("     "); // this hook represent the error message when the value is wrong
    const [selectValue, setSelectValue] = useState(value === "" ? arrayItems[0].value : value); // this hook represent the select value, if the value is empty then we set the first value of the new items array or we just put the value from the props
    const isTableMode = variant === "table"; // this check if the variant paramter value is table or not

    // this function react to key event in the select component
    const detectKeyDown = async (event) => {
        event.preventDefault();
        const code = event.which || event.keyCode;

        let charCode = String.fromCharCode(code).toLowerCase();
        if ((event.ctrlKey || event.metaKey) && charCode === 'c') { // if the user hit crtl + c keys then
            sessionStorage.setItem("clipboard", arrayItems.find((item)=>item.value == selectValue).label); // we store the select text in the sessionStorage
        } else if ((event.ctrlKey || event.metaKey) && charCode === 'v') { // if the user hit the crtl + v keys then
            const clipboardValue = sessionStorage.getItem("clipboard"); // we retrieved the value from the sessionStorage
            const newSelectItem = arrayItems.find((item)=>item.label == clipboardValue); // we then get the newSelectValue from the arrayItems
            if (newSelectItem) { // if the value exist in the arrayItems
                setSelectValue(newSelectItem.value); // we update the select hook
            }
        }
    };

    // this function handle the change of the select component
    const handleChange = (event) => {
        const text = event.target.value; // we first get the value of the select
        setSelectValue(text); // we update the selectValue hook with the current value
        let isValid;
        // if the value is not "-- --" or the select field is not required for the form to be valid then
        if (text != -1 || required == false)
        {
            isValid = true;
            setErrorFormSelect(false); // we cancel or state that there is no error in the select field
            setHelperText("     "); // we clear the error message
        }
        else
        {
            isValid = false;
            setErrorFormSelect(true); // we set the error mode of the select
            setHelperText("Please select an item"); // we display the error message
        }
        onChange(id, text, isValid); // either way, we then send the change to the parent using the onChange function props

    }

    // when the value props change, we run the useEffect
    useEffect(()=>{
        let isValid;
        // if the value is empty then we set the first value of the new items array or we just put the value from the props
        setSelectValue(value === "" ? arrayItems[0].value : value);
        // if the value props don't contain ("" -- --) OR the select field is not required for the form to be valid then
        if (!["",-1].includes(value) || required == false)
        {
            isValid = true;
            setErrorFormSelect(false); // we cancel or state that there is no error in the select field
            setHelperText("     "); // we clear the error message
        }
        else
        {
            isValid = false;
            setErrorFormSelect(true); // we set the error mode of the select
            setHelperText("Please select an item"); // we display the error message
        }
        onChange(id, value, isValid); // either way, we then send the change to the parent using the onChange function props
    },[value]);


    return(
        <TextField 
            id={id} 
            className={`${isTableMode && 'tableField'}`} 
            label={label}
            disabled={readOnly} 
            error={errorFormSelect} 
            select
            value={selectValue}
            // if the field has a the table variant, we don't display the helperText so that it dont change the height of the rows of the table
            helperText={isTableMode ? "" : helperText} 
            title={isTableMode ? helperText : ""}
            inputProps={{ style: { color: (isTableMode && errorFormSelect) ? 'red' : 'black'} }}
            sx={{ width: width}}
            onKeyDown={!readOnly ? detectKeyDown : undefined}
            onChange={handleChange} 
        >
            {arrayItems.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
}