import React, {useState, useRef} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { updateObjProp, compareKeys } from "../../../../../../utils/functions-utils.js";

// this component represent a row of the TableHandle component
export default function TableHandleRow({linkedRef, index, rowName, rowFieldsObject, changeToTable, readOnly = false, generateRowFieldsFunction}) {
    const [, setState] = useState(false); // this hook only purpose is to manually trigger a rerender only when the user paste the content of a row in another row
    const tableHandleRowInfos = {
        linkedRef,
        rowName
    }
    const clipboardPasteHit = useRef(false);
    const rowFieldClipboardValues = useRef(null);
    const rowFieldValues = useRef((Object.keys(rowFieldsObject).map((key)=>{
        return {
            id: key, // the id is the key name of the property
            value: rowFieldsObject[key], // the value is the value of the property
            valid: true // this handle if the value is correct or not
        }
    }))); // we first convert the boxValues into an array of object

    // this function detect key event on the row's cell name
    const detectKeyDown = async (event) => {
        event.preventDefault();
        const code = event.which || event.keyCode;
        let charCode = String.fromCharCode(code).toLowerCase();
        if ((event.ctrlKey || event.metaKey) && charCode === 'c') { // if the user hit crtl + c keys then
            // we copy the object containing all of the row's fields data
            const rowDataObject = rowFieldValues.current.reduce((acc, field) => ({ ...acc, [field.id]: field.value }), {});
            sessionStorage.setItem("clipboard", JSON.stringify(rowDataObject)); // we store it in a sessionStorage
        } else if ((event.ctrlKey || event.metaKey) && charCode === 'v') { // if the user hit the crtl + v keys then
            const clipboardRowValue = JSON.parse(sessionStorage.getItem("clipboard")); // we retrieved the row's object from the sessionStorage
            if (typeof clipboardRowValue == "object" && compareKeys(clipboardRowValue, rowFieldsObject)) { // we check that it is an object and if it has the same keys than the global field object of the row
                clipboardPasteHit.current = !clipboardPasteHit.current; // we switch the value of clipboardPasteHit to trigger an update for all fields childs
                rowFieldClipboardValues.current = rowFieldValues.current.map((field)=>{
                    return {
                        ...field,
                        value: clipboardRowValue[field.id]
                    }
                }); // we update the temporary rowFieldClipboardValue
            }
            setState((prev) => !prev); // we update manually the row to change the values of each field
        }
    };

    // this function update the fieldValues hook
    const handleRowFieldChange = (fieldId, valueChange, valid) => {
        rowFieldValues.current.forEach((field) => {
            const [id, ...path] = fieldId.split('.');
            if (field.id == id) { // if the id of the field object is the same as the parameter then
                updateObjProp(field,["value",...path].join("."),valueChange);
                field.valid = valid; // we change the valid property
            }
        });
        // we create a new object that contain the field name and their value
        let nextRowValuesObject = rowFieldValues.current.reduce((acc, field) => ({ ...acc, [field.id]: field.value }), {});
        // at last we add a isValid property checking if all of the valid property of fieldValues are true
        nextRowValuesObject.isValid = rowFieldValues.current.every((field)=>field.valid);
        changeToTable(index, nextRowValuesObject, tableHandleRowInfos); // we send the new object to the parent using the index
    };

    let newRowFieldsObject = rowFieldClipboardValues.current ?? rowFieldValues.current; // we create a new var and update it wiht either the content of the paste row data if it exist or the rowFieldValues
    newRowFieldsObject = newRowFieldsObject.reduce((acc, field) => ({ ...acc, [field.id]: field.value }), {}); // we create a new object containing only the fields data instead of an array
    rowFieldClipboardValues.current = null; // we clear the clipboard var
    return (
        <TableRow>
            <TableCell tabIndex={-1} className='bg-slate-300 p-0 text-center select-none focus:border-2 focus:border-current' onKeyDown={!readOnly ? detectKeyDown : undefined}>{rowName}</TableCell>
            {
                // we display all of the TableCell with the fields as content using the generateRowFieldsFunction props
                generateRowFieldsFunction(newRowFieldsObject, handleRowFieldChange, readOnly, clipboardPasteHit.current).map((field, index)=>
                    <TableCell key={rowName+index} className="p-0 text-center">{field}</TableCell>
                )
            }
        </TableRow>
    );
};