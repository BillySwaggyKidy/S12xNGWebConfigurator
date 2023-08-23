import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

// this component represent a small box that can have as many fields/input and with a title
export default function FormBox({id, title, boxValues, children, onChangeToParent, readOnly}) {
    const [formBoxFieldValues, setFormBoxFieldValues] = useState(Object.keys(boxValues).map((key)=>{
        return {
            id: key, // the id is the key name of the property
            value: boxValues[key], // the value is the value of the property
            valid: true // this handle if the value is correct or not
        }
    })); // we first convert the boxValues into an array of object

    // this function update the fieldValues hook
    const handleFieldChange = (fieldId, valueChange, valid) => {
        const nextValues = formBoxFieldValues.map((field) => {
            if (field.id == fieldId) { // if the id of the field object is the same as the parameter then
                field.value = valueChange; // we change the value property
                field.valid = valid; // we change the valid property
            }
            return field; // we return the object
        });
        setFormBoxFieldValues(nextValues); // we update the boxValues state
    };

    // this hook send the a data object to the parent by the onChangeToParents function
    useEffect(()=>{
        // we create a new object that contain the field name and their value
        let nextBoxValuesObject = formBoxFieldValues.reduce((acc, field) => ({ ...acc, [field.id]: field.value }), {});
        // at last we add a isValid property checking if all of the valid property of fieldValues are true
        nextBoxValuesObject.isValid = formBoxFieldValues.every((field)=>field.valid);
        onChangeToParent(id, nextBoxValuesObject); // we send the new object to the parent
    },[formBoxFieldValues]);

    return (
        <Card className='w-full rounded-md'>
            <CardHeader className='bg-gray-400 text-center text-white p-1' title={<p className='font-bold text-lg'>{title}</p>}/>
            <CardContent>
                {Object.keys(boxValues).length !== 0 && children(boxValues, handleFieldChange, readOnly)}
            </CardContent>
        </Card>
    );

};