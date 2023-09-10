import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveChangesToOneConfiguration } from '../../../../../actions/rootActions.js';
import TableHandle from '../../../../../components/utils/table/TableHandle/TableHandle.jsx';
import GeneralCardCompensationsInitials from '../../../../../components/utils/initialValues/form/general/GeneralCardCompensationsInitials.jsx';

// this component represent all of the cards and compensations sections of the general configuration
export default function GeneralCardsAndCompensations() {
    const { snapshotData, handleMode } = useSelector((state) => state.configuration); // we get the userList var from the account reducer
    const dispatch = useDispatch();
    const generalCardsAndCompensationsDatas = useRef(JSON.parse(JSON.stringify(snapshotData?.data.general.cardsAndCompensations ?? {})));
    const [nbSensor, setNbSensor] = useState(generalCardsAndCompensationsDatas.current.sensorNb);

    const tooltipLabelsMap = new Map([
        ["hysteresis",
        `0 = 0
        0.10% = 1
        10% = 100`],
        ["compensation",
        "Only for Thermocouple card"]
    ]);
    
    // this function handle all of the data change made by the fields every Form fields components has an instance of this function as props
    const handleDatasChange = (index, object, ...args) => {
        generalCardsAndCompensationsDatas.current.card[index] = object;
        const nbSensor = generalCardsAndCompensationsDatas.current.card.filter((card)=>card.compensation > 0).length;
        generalCardsAndCompensationsDatas.current.nbSensor = nbSensor
        generalCardsAndCompensationsDatas.current.isValid = generalCardsAndCompensationsDatas.current.card.every((item)=>item.isValid);
        setNbSensor(nbSensor);
    };

    // this useEffect run when the component will unmount
    useEffect(() => {
        return () => {
            // if the user is in edit mode and the object containg the datas of this part of the configuration is not null (thus an empty object) 
            if (handleMode == "Edit" && Object.keys(generalCardsAndCompensationsDatas.current).length > 0 && snapshotData) {
                // we save the part of data that the user has edited to the correct configuration in the server
                dispatch(saveChangesToOneConfiguration({snapshotId:snapshotData._id, path:"general.cardsAndCompensations", conf:generalCardsAndCompensationsDatas.current}));
            }
        }
    }, []);

    return (
        <div className='w-full h-full flex flex-col items-center'>
            <h1 className='font-bold underline text-red-600'>Cards & Compensations</h1>
            <div className='h-[90%] flex flex-col justify-center items-center'>
                <TableHandle 
                    tableData={generalCardsAndCompensationsDatas.current.card}
                    itemColumnName={"Card n°"}
                    itemRowName={"Card"}
                    columnLabels={["type","unit","hysteresis","compensation"]}
                    tooltipLabels={tooltipLabelsMap}
                    onChangeToParent={handleDatasChange}
                >
                    {(valueFields, handleChangeFunction, readOnly, hitClip) =>
                        GeneralCardCompensationsInitials({valueFields:valueFields, handleChangeFunction:handleChangeFunction, readOnly:readOnly, hitClip:hitClip})
                    }
                </TableHandle>
                <div className='bg-slate-400 p-2 mt-6 rounded-md'>
                    <p className='text-center font-bold'>Number of Sensors: {nbSensor}</p>
                </div>
            </div>
        </div>
    );
};