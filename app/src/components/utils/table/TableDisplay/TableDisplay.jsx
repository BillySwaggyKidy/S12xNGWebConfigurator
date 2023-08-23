import React, {useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import TablePaginationActions from "./TablePaginationActions/TablePaginationActions.jsx";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { pick } from "../../../../../utils/functions-utils.js";

// this component represent a custom table to display a list of items with some functionnalities
export default function TableDisplay({rowsData, columnLabels, maxRow = 5, HeaderDisplayCondition = true, HeaderActionsElement , RowsActionsElement, emptyMessage = "There is no Data in the table"}) {
    const [page, setPage] = useState(0); // this state represent the index the page is in
    const [rowsPerPage, setRowsPerPage] = useState(maxRow); // this state represent the number of row rendered per pages
    const [sortColumnIndex , setSortColumnIndex] = useState(0); // this state represent the index of the columnSortLabelArray Array for the sorting
    const [columnSortLabelArray , setColumnSortLabelArray] = useState(columnLabels.map((label)=>{
        return {
            label,
            sortByDescendingOrder: false
        }
    }));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // this function purpose is change the index of the hook sortColumnIndex to select the property of the object we use for the sorting
    const handleChangeColumnIndex = (newIndex) => {
        const newColumnSortLabelArray = columnSortLabelArray.map((columnObject, index)=>{
            if (newIndex === index) {
                columnObject.sortByDescendingOrder = !columnObject.sortByDescendingOrder
            }
            return columnObject
        });
        setColumnSortLabelArray(newColumnSortLabelArray);
        setSortColumnIndex(newIndex);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // this function purpose is to sort depending of the sortColumnIndex all of the row data objects
    const bySelectedColumnIndex = (a,b) => {
        let valuesSortArray = [
            convertDateStringToDate(a[columnSortLabelArray[sortColumnIndex].label]),
            convertDateStringToDate(b[columnSortLabelArray[sortColumnIndex].label])
        ]; // this array got the two value (a and b) to compare for the sorting
        // if the user have clicked to be sorted in a descendingOrder then we reverse the array
        if (columnSortLabelArray[sortColumnIndex].sortByDescendingOrder) valuesSortArray.reverse();

        // if the two value (A and B) are the same type, we can start comparing depending of the type of the value
        if (valuesSortArray.every((value)=>typeof value === typeof valuesSortArray[0])) {
            switch(Object.prototype.toString.call(valuesSortArray[0])) {
                case "[object String]":
                    return valuesSortArray[0].toLowerCase().localeCompare(valuesSortArray[1].toLowerCase());
                case "[object Number]":
                    return valuesSortArray[0]-valuesSortArray[1];
                case "[object Boolean]":
                    return valuesSortArray[0]-valuesSortArray[1];
                case "[object Date]":
                    return new Date(valuesSortArray[0]).getTime() - new Date(valuesSortArray[1]).getTime();
            }
        }
        else {
            return 0;
        }
    };

    // this function check if the value is a string of a UTC Date and return a Date object or the actual value
    const convertDateStringToDate = (value) => {
        if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(value)) return value;
        const d = new Date(value); 
        return d instanceof Date && !isNaN(d.getTime()) && d.toISOString()===value ? d : value; // valid date 
    };

    // this function check if the value is a string of a UTC Date and return a local timezone date string or the actual value
    const convertDateStringToLocaleString = (value) => {
        if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(value)) {
            return new Date(value).toLocaleString();
        } 
        return value;
    };

    return (
        <div className="m-4 w-full">
            {
                // if the HeaderActionsElement and HeaderDisplayCondition are not null or true then we display all of the HeaderActionsElement
                HeaderActionsElement && HeaderDisplayCondition ?
                <div className="w-full flex flex-row justify-start bg-gray-200 p-2 border-x-2 border-t-2 rounded-t-lg border-gray-400">
                    <HeaderActionsElement/>
                </div> :
                // or else we display nothing
                <></>
            }
            <Paper className="overflow-hidden w-full">
                <TableContainer className="max-h-[450px]">
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {
                                    // if the row list is not empty then we display the column cell in the header
                                    rowsData.length > 0 ?
                                    <>
                                        {
                                            columnSortLabelArray.map((column, index)=>
                                                <TableCell className="bg-gray-400 font-bold hover:bg-gray-600 text-base" key={index}>
                                                    <div className="flex flex-row items-center justify-between">
                                                        <p className="hover:cursor-pointer hover:underline" onClick={()=>handleChangeColumnIndex(index)}>{column.label}</p>
                                                        {!column.sortByDescendingOrder ? <ArrowUpwardIcon/> : <ArrowDownwardIcon/>}
                                                    </div>
                                                </TableCell>
                                            )
                                        }
                                        <TableCell className="bg-gray-400 font-bold text-base underline" align="right">Actions</TableCell>
                                    </> :
                                    // or else we display nothing
                                    <TableCell className="bg-gray-400"></TableCell>
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                // if the row list is not empty then we display all of the row data
                                rowsData.length > 0 ? 
                                    // we have selected a number of row other than -1 (ALL mode) then  we display witht slice or else we display the entire array of rowsData
                                    // then we sort the array of rowsData depending of the property of each row selected by the sortColumnIndex hook
                                    (rowsPerPage > 0 ? rowsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rowsData).sort(bySelectedColumnIndex).map((row, index) => (
                                        <TableRow key={Object.values(row)[0]}>
                                            {
                                                // we pick only the property of the row"s object that we want to display in a column
                                                Object.values(pick(row,columnSortLabelArray.map((column)=>column.label))).map((value)=>
                                                    <TableCell key={value} className={index % 2 == 0 ? 'bg-slate-100' : 'bg-white'}>{convertDateStringToLocaleString(value)}</TableCell>
                                                )
                                            }
                                            {/* We always render at the last in the right the buttons that represent the action the user can perform on the row object */}
                                            <TableCell className={index % 2 == 0 ? 'bg-slate-100' : 'bg-white'} align="right">
                                                <div className="flex flex-row justify-end">
                                                    <RowsActionsElement object={row}/>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )) 
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
                <TablePagination
                    className="bg-gray-400"
                    component="div"
                    rowsPerPageOptions={[maxRow, { label: 'All', value: -1 }]}
                    colSpan={99}
                    count={rowsData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: {
                        'aria-label': 'rows per page',
                        },
                        native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </Paper>
        </div>
    );
}