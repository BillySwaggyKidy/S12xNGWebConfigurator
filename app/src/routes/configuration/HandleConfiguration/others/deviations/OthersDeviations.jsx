import React, {useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveChangesToOneConfiguration } from '../../../../../actions/rootActions.js';
import TableHandle from '../../../../../components/utils/table/TableHandle/TableHandle.jsx';
import { OthersDeviationsInitialsActive, OthersDeviationsInitialsP1, OthersDeviationsInitialsP2 } from '../../../../../components/utils/formInitialValues/others/OthersDeviationsInitials.jsx';
import { pick } from '../../../../../../utils/functions-utils.js';

// this component represent all of the deviations sections of the others parts of the configuration
export default function OthersDeviations() {
    const columnNamesTableText = ["isActive"];
    const columnNamesTableP1Parameters = ["p1Parameters"];
    const columnNamesTableP2Parameters = ["p2Parameters"];
    const { snapshotData, handleMode } = useSelector((state) => state.configuration); // we get the userList var from the account reducer
    const dispatch = useDispatch();
    const othersDeviationsDatas = useRef(JSON.parse(JSON.stringify(snapshotData.data.others?.deviations ?? {})));
    const linkedObjectsDeviationsDatas = useRef(othersDeviationsDatas.current?.deviationsList?.map((deviations)=>{
        return {
            "Activation": {...pick(deviations, columnNamesTableText), isValid: true}, // this object represent the value of isActive and if they are valid
            "Parameter P1": {...pick(deviations, columnNamesTableP1Parameters), isValid: true}, // this object represent the value of p1Parameters and if they are valid
            "Parameter P2": {...pick(deviations, columnNamesTableP2Parameters), isValid: true} // this object represent the value of p2Parameters and if they are valid
        };
    }) ?? []); // this array represent for each row of the table, an object containing each small part of the parameters and if they are valid


    const othersDeviationsColumnsLabelsP1 = ['low average', 'full-scale', 'full-scale value', 'half-scale value', 'INH', 'RG', 'tempo'];
    const othersDeviationsColumnsLabelsP2 = ['low average', 'full-scale', 'full-scale value', 'half-scale value', 'INH', 'RG', 'tempo'];
    const tooltipLabelsMap = new Map([
        ["low average",`Value in unit of measure`],
        ["full-scale",`Value in unit of measure`],
        ["full-scale value",`Value in unit of measure`],
        ["half-scale value",`Value in unit of measure`],
        ["tempo",`Value between 0 and 3600 seconds`],
    ]);

    // this function handle all of the data change made by the fields every Form fields components has an instance of this function as props
    const handleDatasChange = (index, object, ...args) => {
        // we assign the object send by the row into his matching property of the object element in the linkedObjectsAveragesDatas array by using the linkedRef value in the parameter sended by the row
        linkedObjectsDeviationsDatas.current[index][args[0].linkedRef] = object;
        const rowLinkedObjectsArray = Object.values(linkedObjectsDeviationsDatas.current[index]); // we get the list of all objects representing the parts of the data of the row
        let newRowDataObject = rowLinkedObjectsArray.reduce((obj, item) => ({...obj, ...item}) ,{}); // we create a new rowDataObject by assembling all the value of the fields in each row's parts object in one object 
        newRowDataObject.isValid = rowLinkedObjectsArray.every((item)=>item.isValid); // we add the isValid property by insuring that all parts containg a subset of the row's fields are all valids
        othersDeviationsDatas.current.deviationsList[index] = newRowDataObject; // we add the new rowObject into the deviationsList in the proper index
        othersDeviationsDatas.current.isValid = othersDeviationsDatas.current.deviationsList.every((item)=>item.isValid); // we update the global isValid property by checking if all rows of the deviation list are valids
    };

    // this useEffect run when the component will unmount
    useEffect(() => {
        return () => {
            // if the user is in edit mode and the object containg the datas of this part of the configuration is not null (thus an empty object) 
            if (handleMode == "Edit" && Object.keys(othersDeviationsDatas.current).length > 0) {
                // we save the part of data that the user has edited to the correct configuration in the server
                dispatch(saveChangesToOneConfiguration({snapshotId:snapshotData._id, path:"others.deviations", conf:othersDeviationsDatas.current}));
            }
        }
    }, []);

    return (
        <div className='w-full h-full flex flex-col items-center'>
            <h1 className='font-bold underline text-red-600'>Deviations</h1>
            <div className='h-[90%] flex flex-col justify-around items-center'>
                <TableHandle
                    tableTitle={"Activation"}
                    tableData={othersDeviationsDatas.current.deviationsList}
                    itemColumnName={"Deviation n°"}
                    itemRowName={"Deviation"}
                    columnLabels={["state"]}
                    pickItemRowValues={columnNamesTableText}
                    linkedTo={"Activation"}
                    onChangeToParent={handleDatasChange}
                >
                    {(valueFields, handleChangeFunction, readOnly) =>
                        OthersDeviationsInitialsActive({valueFields:valueFields, handleChangeFunction:handleChangeFunction, readOnly:readOnly})
                    }
                </TableHandle>
                <TableHandle
                    tableTitle={"Parameter P1"}
                    tableData={othersDeviationsDatas.current.deviationsList}
                    itemColumnName={"Deviation n°"}
                    itemRowName={"Deviation"}
                    columnLabels={othersDeviationsColumnsLabelsP1}
                    pickItemRowValues={columnNamesTableP1Parameters}
                    linkedTo={"Parameter P1"}
                    tooltipLabels={tooltipLabelsMap}
                    onChangeToParent={handleDatasChange}
                >
                    {(valueFields, handleChangeFunction, readOnly) =>
                        OthersDeviationsInitialsP1({valueFields:valueFields, handleChangeFunction:handleChangeFunction, readOnly:readOnly})
                    }
                </TableHandle>
                <TableHandle
                    tableTitle={"Parameter P2"}
                    tableData={othersDeviationsDatas.current.deviationsList}
                    itemColumnName={"Deviation n°"}
                    itemRowName={"Deviation"}
                    columnLabels={othersDeviationsColumnsLabelsP2}
                    pickItemRowValues={columnNamesTableP2Parameters}
                    linkedTo={"Parameter P2"}
                    tooltipLabels={tooltipLabelsMap}
                    onChangeToParent={handleDatasChange}
                >
                    {(valueFields, handleChangeFunction, readOnly) =>
                        OthersDeviationsInitialsP2({valueFields:valueFields, handleChangeFunction:handleChangeFunction, readOnly:readOnly})
                    }
                </TableHandle>
            </div>
        </div>
    );
};