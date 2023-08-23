import React, {useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveChangesToOneConfiguration } from '../../../../../actions/rootActions.js';
import TableHandle from '../../../../../components/utils/table/TableHandle/TableHandle.jsx';
import { OthersAveragesInitialsText, OthersAveragesInitialsCardChannels, OthersAveragesInitialsP1P2 } from '../../../../../components/utils/formInitialValues/others/OthersAveragesInitials.jsx';
import { pick } from '../../../../../../utils/functions-utils.js';

// This case is particular, usually if we display a whole table with not so many row and fields or if we split the 32 rows of a tables into smaller tables with 8 rows each
// we still have the same amounts of rows display for each rows of each tables so the TableHandleRow
// would just have an object containing all the key and value of the fields and if each one are valid
// Hovewer here and for deviatiosn and gratients we have a table with few rows but a huge amounts of fields thus exceed the width max, the solution wound be to instead of splitting the row, 
// we split the fields of a row into smaller tables with a subset of the fields data.
// The TableHandle component and his row don't support this kind of approach because for each row containing a subset of fields, it got instead an object containg all of the fields of the row
// even thought the table only handle a subset of the global field objets (just the fields line1 and line2 for example).
// This cause the user when is editing a feild in a table and then a other field from an another table in the same index row (the row average n°1),
// to reset a part of the the global object with some updated fields and the rest being unchanged by theirs initials values.
// Because instead of sending only an object with the updated fields and if they are valids, we are sending an object with the updated fields and
// the rest with the defaults values and isValid property set by the TableHandleRow.
// Something to point out is that this behavior was happening only on one level (line1, line2, isActive) and not with nested level like object value in properties (p1Parameters, p2Parameters) and I think
// it is because of the shallow copy, the TableHandleRow copy the reference thus when changing a table of P1 or P2, all of the rows of others tables update the nested object
// Now each row of each table only handle a subset of the fields the table is assign to and return an object containing only them and if it is valid or not, then
// the top component will handle the object, store it and update the global list of objects row and check if it is valid or not

// this component represent all of the averages sections of the others parts of the configuration
export default function OthersAverages() {
    const columnNamesTableText = ["line1", "line2"];
    const columnNamesTableCardChannels = ["isActive", "decimal","cardChannelsActivation"];
    const columnNamesTableParameters = ["p1Parameters", "p2Parameters"];
    const { snapshotData, handleMode } = useSelector((state) => state.configuration); // we get the userList var from the account reducer
    const dispatch = useDispatch();
    const othersAveragesDatas = useRef(JSON.parse(JSON.stringify(snapshotData.data.others?.averages ?? {})));
    const linkedObjectsAveragesDatas = useRef(othersAveragesDatas.current.averagesList?.map((averages)=>{
        return {
            "Texts": {...pick(averages, columnNamesTableText), isValid: true}, // this object represent the value of line1 and line2 and if they are valid
            "Channels": {...pick(averages, columnNamesTableCardChannels), isValid: true}, // this object represent the value of isActive, decimal and cardChannelsActivation and if they are valid
            "Parameters": {...pick(averages, columnNamesTableParameters), isValid: true} // this object represent the value of p1Parameters and p2Parameters and if they are valid
        };
    }) ?? []); // this array represent for each row of the table, an object containing each small part of the parameters and if they are valid

    const othersAveragesColumnsLabelsText = ["line1","line2"];
    const tooltipLabelsTextMap = new Map([
        ["line1",
        `Restricted to 16 ASCII characters`],
        ["line2",
        `Restricted to 16 ASCII characters`],
    ]);

    const othersAveragesColumnsLabelsGeneral = {
        "": ["state","decimal"],
        "Card 1 channels": ["01","02","03","04","05","06","07","08"],
        "Card 2 channels": ["09","10","11","12","13","14","15","16"],
        "Card 3 channels": ["17","18","19","20","21","22","23","24"],
        "Card 4 channels": ["25","26","27","28","29","30","31","32"],
    };
    const tooltipLabelsGeneralMap = new Map([
        ["decimal",
        `No decimal=>d=0,1,2,3 => 10E-(4-d)`],
    ]);

    const othersAveragesColumnsLabelsP1P2 = {
        "Parameter P1": ['type', 'value', 'tempo', 'INH', 'RG'],
        "Parameter P2": ['type', 'value', 'tempo', 'INH', 'RG'],
    };
    const tooltipLabelsP1P2Map = new Map([
        ["value",
        `Value in unit of measure`],
        ["tempo",
        "Value between 0 and 3600 seconds"],
    ]);

    // this function handle all of the data change made by the fields every Form fields components has an instance of this function as props
    const handleDatasChange = (index, object, ...args) => {
        // we assign the object send by the row into his matching property of the object element in the linkedObjectsAveragesDatas array by using the linkedRef value in the parameter sended by the row
        linkedObjectsAveragesDatas.current[index][args[0].linkedRef] = object;
        const rowLinkedObjects = Object.values(linkedObjectsAveragesDatas.current[index]); // we get the list of all objects representing the parts of the data of the row
        let newRowDataObject = rowLinkedObjects.reduce((obj, item) => ({...obj, ...item}) ,{}); // we create a new rowDataObject by assembling all the value of the fields in each row's parts object in one object 
        newRowDataObject.isValid = rowLinkedObjects.every((item)=>item.isValid); // we add the isValid property by insuring that all parts containg a subset of the row's fields are all valids
        othersAveragesDatas.current.averagesList[index] = newRowDataObject; // we add the new rowObject into the averagesList in the proper index
        othersAveragesDatas.current.isValid = othersAveragesDatas.current.averagesList.every((item)=>item.isValid); // we update the global isValid property by checking if all rows of the averages list are valids
    };
  
    // this useEffect run when the component will unmount
    useEffect(() => {
        return () => {
            // if the user is in edit mode and the object containg the datas of this part of the configuration is not null (thus an empty object) 
            if (handleMode == "Edit" && Object.keys(othersAveragesDatas.current).length > 0) {
                // we save the part of data that the user has edited to the correct configuration in the server
                dispatch(saveChangesToOneConfiguration({snapshotId:snapshotData._id, path:"others.averages", conf:othersAveragesDatas.current}));
            }
        }
    }, []);

    return (
        <div className='w-full h-full flex flex-col items-center'>
            <h1 className='font-bold underline text-red-600'>Averages</h1>
            <div className='h-[90%] grid grid-cols-1 grid-rows-3 place-items-center'>
                <TableHandle
                    tableData={othersAveragesDatas.current.averagesList}
                    columnLabels={othersAveragesColumnsLabelsText}
                    tooltipLabels={tooltipLabelsTextMap}
                    itemColumnName={"Average n°"}
                    itemRowName={"Average"}
                    pickItemRowValues={columnNamesTableText}
                    linkedTo={"Texts"}
                    onChangeToParent={handleDatasChange}
                >
                    {(valueFields, handleChangeFunction, readOnly) =>
                        OthersAveragesInitialsText({valueFields: pick(valueFields, columnNamesTableText), handleChangeFunction:handleChangeFunction, readOnly:readOnly})
                    }
                </TableHandle>
                <TableHandle
                    tableData={othersAveragesDatas.current.averagesList}
                    columnLabels={othersAveragesColumnsLabelsGeneral}
                    tooltipLabels={tooltipLabelsGeneralMap}
                    itemColumnName={"Average n°"}
                    itemRowName={"Average"}
                    pickItemRowValues={columnNamesTableCardChannels}
                    linkedTo={"Channels"}
                    onChangeToParent={handleDatasChange}
                >
                    {(valueFields, handleChangeFunction, readOnly) =>
                        OthersAveragesInitialsCardChannels({valueFields:pick(valueFields, columnNamesTableCardChannels), handleChangeFunction:handleChangeFunction, readOnly:readOnly})
                    }
                </TableHandle>
                <TableHandle
                    tableData={othersAveragesDatas.current.averagesList}
                    columnLabels={othersAveragesColumnsLabelsP1P2}
                    tooltipLabels={tooltipLabelsP1P2Map}
                    itemColumnName={"Average n°"}
                    itemRowName={"Average"}
                    pickItemRowValues={columnNamesTableParameters}
                    linkedTo={"Parameters"}
                    onChangeToParent={handleDatasChange}
                >
                    {(valueFields, handleChangeFunction, readOnly) =>
                        OthersAveragesInitialsP1P2({valueFields:pick(valueFields, columnNamesTableParameters), handleChangeFunction:handleChangeFunction, readOnly:readOnly})
                    }
                </TableHandle>
            </div>
        </div>
    );
};