import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHandleRow from "./TableHandleRow/TableHandleRow.jsx";
import ArrowTooltips from "../../ArrowTooltips/ArrowTooltips.jsx";
import { HandleModeStatus } from '../../../../../utils/enums-utils.js';
import { useSelector } from 'react-redux';
import { omit, pick } from '../../../../../utils/functions-utils.js';

// rowsData must contain be an array of array containing objects
// columnLabels must contain an array like the following:
/*
    {
        Country: [
            "name",
            "ISO code",
        ],
        Details: [
            "Population",
            "Size",
            "Dense"
        ],
    },
*/
// startIndex represent the index you want the items number to start

// this component represent a custom table to display a list of items with some functionnalities
export default function TableHandle({tableTitle, tableData, columnLabels, tooltipLabels, itemColumnName, itemRowName, omitItemRowValues = [], linkedTo, pickItemRowValues = [], startIndex = 1, emptyMessage = "There is no Data in the table", onChangeToParent, children}) {
    const { handleMode } = useSelector((state) => state.configuration); // we get the handleMode var from the account reducer
    const isReadOnlyMode = handleMode == HandleModeStatus.Read;
    // this function purpose is to count the number of key in an object
    const deepColumnsCounts = (object, count = 0) => {
        // the isLastFlat var check if the object is an array and that don't have any nested object in his elements
        const isLastFlat = Array.isArray(object) && object.every((label) => typeof label !== 'object');
        if (isLastFlat) {
          return object.length; // we return the length of the array
        }
        else {
            // for each object element of the array
          Object.values(object).forEach((value)=>{
            // we increment the count var with a recursive call of the function
            count += deepColumnsCounts(value,count); 
          })
        }
      
        return count; // we return the count
    };

    // this function purpose is to generate the Header rows in the table
    const generateColumnLabels = (labels, columnsList = []) => {
        // if the labels var is and object and is not null then
        if (typeof labels === 'object' && labels != null) {
            // the isLastFlat var check if the object is an array and that don't have any nested object in his elements
            const isLastFlat = Array.isArray(labels) && labels.every((label) => typeof label !== 'object');
            // the isArray var check if the object is an array
            const isArray = Array.isArray(labels);
            // the firstLabels check first is the labels is last flat then it is only the labels or if it is an array then we create an array of all of the key of the objects value or else we only get the key
            const firstLabels = isLastFlat ? labels : isArray ? Object.values(labels).reduce((acc, current) => [...acc, ...Object.keys(current)],[]) : Object.keys(labels);
            // the firstLabels check first is the labels is last flat then it is only the labels or if it is an array then we create an array of all of the values of the objects value or else we only get the values
            const secondLabels = isLastFlat ? null : isArray ? Object.values(labels).reduce((acc, current) => [...acc, ...Object.values(current)],[]) : Object.values(labels);
            // the colSpanArray check that if the secondLabels is not null than we create an array containing the count of each property or else just null
            const colSpanArray = secondLabels ? secondLabels.map((value) => deepColumnsCounts(value)) : null;

            // we push in the columnsList a new tableRow component
            columnsList.push(
                <TableRow key={firstLabels[0]}>
                    {/*we display a tableCell on the left: if labels isLastFlat then we display the column name or else nothing*/}
                    <TableCell className="bg-gray-400 font-bold text-base underline pl-2 px-1 py-0 w-[110px] text-center" align="left"><p className="p-0 m-0 select-none">{isLastFlat && itemColumnName}</p></TableCell>
                    {
                        // for every element of the array, we display the TableCell with colSpan and the column label
                        firstLabels.map((column, index)=>
                            <TableCell key={index} className={`bg-gray-400 font-bold text-base p-0.5 ${column && 'border-x-2 border-gray-200'} text-center`} colSpan={secondLabels ? colSpanArray[index] : 1}>
                                {
                                    tooltipLabels ?
                                    <ArrowTooltips text={tooltipLabels.get(column)} placement="top">
                                        <p className="p-0 m-0 select-none">{column}</p>
                                    </ArrowTooltips>
                                    :
                                    <p className="p-0 m-0 select-none">{column}</p>
                                }
                            </TableCell>
                        )
                    }
                </TableRow>
            );
            // if the labels is still not an array with no object then we make a recursive call of the functiuon with new labels and columnLists var
            if (!isLastFlat) {
                generateColumnLabels(secondLabels.flat(), columnsList);
            }
        }
        
        // we return the whole columnsList react component
        return <>{columnsList}</>;
      };

    return (
        <div className="m-1 w-fit">
            <Paper className="overflow-hidden">
                <TableContainer className="max-h-[400px] overflow-x-hidden">
                    <Table stickyHeader>
                        <TableHead>
                            {
                                // if the tableTitle is not null then we display a table row on top of the table as a title
                                tableTitle && 
                                <TableRow key={tableTitle}>
                                    <TableCell className="bg-gray-800 font-bold text-2xl px-2 py-1 select-none" align="center" colSpan={deepColumnsCounts(columnLabels) + 1}><p className="text-white">{tableTitle}</p></TableCell>
                                </TableRow>
                            }
                            {generateColumnLabels(columnLabels)}
                        </TableHead>
                        <TableBody>
                            {
                                // if the row list is not empty then we display all of the row data
                                tableData !== undefined && tableData.length > 0 ? 
                                    tableData.map((row, index) => {
                                        let editedRow = omit(row, [...omitItemRowValues, "isValid"]);
                                        if (pickItemRowValues.length > 0) {
                                            editedRow = pick(editedRow, pickItemRowValues);
                                        }
                                        const rowName = `${itemRowName} ${(startIndex + index)}`;
                                        return (
                                            <TableHandleRow key={rowName} linkedRef={linkedTo} index={(startIndex + index) - 1} rowName={rowName} rowFieldsObject={editedRow} readOnly={isReadOnlyMode} changeToTable={onChangeToParent} generateRowFieldsFunction={children}/>
                                        )
                                    }) 
                                :
                                // or else we display a empty message
                                <TableRow>
                                    <TableCell className="w-full" align="justify">
                                        <div className="flex flex-row justify-center items-center mt-4">
                                            <h1 className="font-bold">{emptyMessage}</h1>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}