import React, {useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveChangesToOneConfiguration } from '../../../../../actions/rootActions.js';
import TableHandle from '../../../../../components/utils/table/TableHandle/TableHandle.jsx';
import { OthersGradientsInitialsCardChannels, OthersGradientsInitialsP1P2 } from '../../../../../components/utils/initialValues/form/others/OthersGradientsInitials.jsx';
import { pick } from '../../../../../../utils/functions-utils.js';

// this component represent all of the gradients sections of the others parts of the configuration
export default function OthersGradients() {
    const columnNamesTableCardChannels = ["isActive", "decimal","cardChannelsActivation"];
    const columnNamesTableParameters = ["p1Parameters", "p2Parameters"];
    const { snapshotData, handleMode } = useSelector((state) => state.configuration); // we get the userList var from the account reducer
    const dispatch = useDispatch();
    const othersGradientsDatas = useRef(JSON.parse(JSON.stringify(snapshotData.data.others?.gradients ?? {})));
    const linkedObjectsGradientsDatas = useRef(othersGradientsDatas.current.gradientsList?.map((gradients)=>{
        return {
            "Channels": {...pick(gradients, columnNamesTableCardChannels), isValid: true}, // this object represent the value of isActive, decimal and cardChannelsActivation and if they are valid
            "Parameters": {...pick(gradients, columnNamesTableParameters), isValid: true}, // this object represent the value of p1Parameters and p2Parameters and if they are valid
        };
    }) ?? []); // this array represent for each row of the table, an object containing each small part of the parameters and if they are valid

  

    const othersGradientsColumnsLabelsGeneral = {
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

    const othersGradientsColumnsLabelsP1P2 = {
        "Parameter P1": ['type', 'value', 'tempo', 'INH', 'RG'],
        "Parameter P2": ['type', 'value', 'tempo', 'INH', 'RG'],
    };
    const tooltipLabelsP1P2Map = new Map([
        ["value",
        `Measure value per second`],
        ["tempo",
        "Value between 0 and 3600 seconds"],
    ]);

    // this function handle all of the data change made by the fields every Form fields components has an instance of this function as props
    const handleDatasChange = (index, object, ...args) => {
        // we assign the object send by the row into his matching property of the object element in the linkedObjectsAveragesDatas array by using the linkedRef value in the parameter sended by the row
        linkedObjectsGradientsDatas.current[index][args[0].linkedRef] = object;
        const rowLinkedObjects = Object.values(linkedObjectsGradientsDatas.current[index]); // we get the list of all objects representing the parts of the data of the row
        let newRowDataObject = rowLinkedObjects.reduce((obj, item) => ({...obj, ...item}) ,{}); // we create a new rowDataObject by assembling all the value of the fields in each row's parts object in one object 
        newRowDataObject.isValid = rowLinkedObjects.every((item)=>item.isValid); // we add the isValid property by insuring that all parts containg a subset of the row's fields are all valids
        othersGradientsDatas.current.gradientsList[index] = newRowDataObject; // we add the new rowObject into the gradientsList in the proper index
        othersGradientsDatas.current.isValid = othersGradientsDatas.current.gradientsList.every((item)=>item.isValid); // we update the global isValid property by checking if all rows of the gradient list are valids
    };
  
    // this useEffect run when the component will unmount
    useEffect(() => {
        return () => {
            // if the user is in edit mode and the object containg the datas of this part of the configuration is not null (thus an empty object) 
            if (handleMode == "Edit" && Object.keys(othersGradientsDatas.current).length > 0 && snapshotData) {
                // we save the part of data that the user has edited to the correct configuration in the server
                dispatch(saveChangesToOneConfiguration({snapshotId:snapshotData._id, path:"others.gradients", conf:othersGradientsDatas.current}));
            }
        }
    }, []);

    return (
        <div className='w-full h-full flex flex-col items-center'>
            <h1 className='font-bold underline text-red-600'>Gradients</h1>
            <div className='h-[90%] grid grid-cols-1 grid-rows-2 place-items-center'>
                <TableHandle
                    tableData={othersGradientsDatas.current.gradientsList}
                    itemColumnName={"Gradient n°"}
                    itemRowName={"Gradient"}
                    columnLabels={othersGradientsColumnsLabelsGeneral}
                    pickItemRowValues={columnNamesTableCardChannels}
                    linkedTo={"Channels"}
                    tooltipLabels={tooltipLabelsGeneralMap}
                    onChangeToParent={handleDatasChange}
                >
                    {(valueFields, handleChangeFunction, readOnly, hitClip) =>
                        OthersGradientsInitialsCardChannels({valueFields:valueFields, handleChangeFunction:handleChangeFunction, readOnly:readOnly, hitClip:hitClip})
                    }
                </TableHandle>
                <TableHandle
                    tableData={othersGradientsDatas.current.gradientsList}
                    itemColumnName={"Gradient n°"}
                    itemRowName={"Gradient"}
                    columnLabels={othersGradientsColumnsLabelsP1P2}
                    pickItemRowValues={columnNamesTableParameters}
                    linkedTo={"Parameters"}
                    tooltipLabels={tooltipLabelsP1P2Map}
                    onChangeToParent={handleDatasChange}
                >
                    {(valueFields, handleChangeFunction, readOnly, hitClip) =>
                        OthersGradientsInitialsP1P2({valueFields:valueFields, handleChangeFunction:handleChangeFunction, readOnly:readOnly, hitClip:hitClip})
                    }
                </TableHandle>
            </div>
        </div>
    );
};