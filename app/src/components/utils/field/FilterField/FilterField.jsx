import React, { useState } from 'react';
import { TextField, InputLabel, MenuItem, Select, FormControlLabel, Checkbox, FormControl } from '@mui/material';

// this component adapt depending of the value of the type property (ex: "Text" for a text input, "Date" for a date input )
export default function FilterField({type, id, value, label, items, readOnly = false, handleChange})
{
    const [fieldValue, setFieldValue] = useState(value);

    const handleFieldChange = (event) => {
        const newValue = event.target.value;
        setFieldValue(newValue);
        handleChange(id, "value", newValue)
    };

    switch(type)
    {
        case "Text":
            return (
                <TextField id={id} label={label} value={fieldValue} variant="filled" onChange={handleFieldChange} disabled={readOnly}/>
            );
        case "Shrink":
            return (
                <TextField id={id} label={label} value={fieldValue} type="number" InputLabelProps={{shrink: true,}} variant="filled" onChange={handleFieldChange} disabled={readOnly}/>
            );
        case "Select":
            return (
                <FormControl className='bg-white w-full' variant="filled">
                    <InputLabel id={id}>{label}</InputLabel>
                    <Select
                        id={id}
                        value={fieldValue}
                        label={label}
                        onChange={handleFieldChange}
                        disabled={readOnly}
                    >
                        {
                            items.map((option)=>
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl >
            );

        case "Checkbox":
            return (
                <FormControlLabel
                    id={id}
                    control={<Checkbox color="primary"/>}
                    label={label}
                    value={fieldValue}
                    onChange={handleFieldChange}
                />
            );

        case "Date":
            return (
                <TextField
                    id={id}
                    label={label}
                    type="date"
                    defaultValue={value}
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={fieldValue}
                    onChange={handleFieldChange}
                />
            );
    }
}
