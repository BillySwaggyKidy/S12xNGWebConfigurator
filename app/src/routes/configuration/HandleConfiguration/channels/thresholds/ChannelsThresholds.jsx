import React, {useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveChangesToOneConfiguration } from '../../../../../actions/rootActions.js';
import TableHandle from '../../../../../components/utils/table/TableHandle/TableHandle.jsx';
import { ChannelsThresholdInitialsP1, ChannelsThresholdInitialsP2 } from '../../../../../components/utils/formInitialValues/channels/ChannelsThresholdInitials.jsx';

// this component represent all of the thresholds sections of the channels
export default function ChannelsThresholds() {
    const { snapshotData, configurationData, handleMode } = useSelector((state) => state.configuration); // we get the userList var from the account reducer
    const dispatch = useDispatch();
    const channelsThresholdsDatas = useRef(JSON.parse(JSON.stringify(snapshotData?.data.channels.thresholds ?? {})));
    const deviceType = configurationData.deviceType;


    const channelsThresholdColumnsLabelsP1 = {
        "Threshold 1": ['type', 'value', 'tempo', 'INH', 'RG'],
        "Threshold 2": ['type', 'value', 'tempo', 'INH', 'RG']
    };
    const channelsThresholdColumnsLabelsP2 = {
        "Threshold 1": ['type', 'value', 'tempo', 'INH', 'RG'],
        "Threshold 2": ['type', 'value', 'tempo', 'INH', 'RG']
    };
    const tooltipLabelsMap = new Map([
        ["value",
        `Threshold value between the low and high scale`],
        ["tempo",
        "Threshold value between the low and high scale"]
    ]);

    // this function handle all of the data change made by the fields every Form fields components has an instance of this function as props
    const handleDatasChange = (index, object, ...args) => {
        channelsThresholdsDatas.current.cardChannelsThreshold[index] = object;
        channelsThresholdsDatas.current.isValid = channelsThresholdsDatas.current.cardChannelsThreshold.every((item)=>item.isValid);
    };

    // this useEffect run when the component will unmount
    useEffect(() => {
        return () => {
            // if the user is in edit mode and the object containg the datas of this part of the configuration is not null (thus an empty object) 
            if (handleMode == "Edit" && Object.keys(channelsThresholdsDatas.current).length > 0) {
                // we save the part of data that the user has edited to the correct configuration in the server
                dispatch(saveChangesToOneConfiguration({snapshotId:snapshotData._id, path:"channels.thresholds", conf:channelsThresholdsDatas.current}));
            }
        }
    }, []);

    return (
        <div className='w-full h-full flex flex-col items-center overflow-y-auto'>
            <h1 className='h-[3%] font-bold underline text-red-600'>Thresholds</h1>
            <div className='h-[97%] grid grid-cols-1 grid-rows-2 items-center justify-center'>
                <TableHandle 
                    tableTitle={"P1"}
                    tableData={channelsThresholdsDatas.current.cardChannelsThreshold}
                    itemColumnName={"Channel n°"}
                    itemRowName={"Channel"}
                    columnLabels={channelsThresholdColumnsLabelsP1}
                    tooltipLabels={tooltipLabelsMap}
                    onChangeToParent={handleDatasChange}
                >
                    {(valueFields, handleChangeFunction, readOnly) =>
                        ChannelsThresholdInitialsP1({valueFields:valueFields, handleChangeFunction:handleChangeFunction, readOnly:readOnly})
                    }
                </TableHandle>
                <TableHandle
                    className="grow"
                    tableTitle={"P2"}
                    tableData={channelsThresholdsDatas.current.cardChannelsThreshold}
                    itemColumnName={"Channel n°"}
                    itemRowName={"Channel"}
                    columnLabels={channelsThresholdColumnsLabelsP2}
                    tooltipLabels={tooltipLabelsMap}
                    onChangeToParent={handleDatasChange}
                >
                    {(valueFields, handleChangeFunction, readOnly) =>
                        ChannelsThresholdInitialsP2({valueFields:valueFields, handleChangeFunction:handleChangeFunction, readOnly:readOnly})
                    }
                </TableHandle>
            </div>
        </div>
    );
};