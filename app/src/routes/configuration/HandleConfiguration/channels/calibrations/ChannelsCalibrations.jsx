import React, {useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveChangesToOneConfiguration } from '../../../../../actions/rootActions.js';
import TableHandle from '../../../../../components/utils/table/TableHandle/TableHandle.jsx';
import { ChannelsCalibrationsInitialsData } from '../../../../../components/utils/initialValues/form/channels/ChannelsCalibrationsInitials.jsx';

// this component represent all of the calibrations sections of the channels
export default function ChannelsCalibrations() {
    const { snapshotData, handleMode } = useSelector((state) => state.configuration); // we get the userList var from the account reducer
    const dispatch = useDispatch();
    const channelsCalibrationsDatas = useRef(JSON.parse(JSON.stringify(snapshotData?.data.channels.calibrations ?? {})));


    const channelsCalibrationsColumnsLabelsData = ["Det Offset", "Gain", "Offset", "Smooth"];
    const tooltipLabelsMap = new Map([
        ["Det Offset",
        `Value in degree`],
        ["Gain",
        "1000 represent one gain"],
        ["Offset",
        "value in tenth of a degree"],
        ["Smooth",
        "Value between 0 and 1000"]
    ]);

    // this function handle all of the data change made by the fields every Form fields components has an instance of this function as props
    const handleDatasChange = (index, object, ...args) => {
        channelsCalibrationsDatas.current.cardChannelsCalibration[index] = object;
        channelsCalibrationsDatas.current.isValid = channelsCalibrationsDatas.current.cardChannelsCalibration.every((item)=>item.isValid);
    };

    // this useEffect run when the component will unmount
    useEffect(() => {
        return () => {
            // if the user is in edit mode and the object containg the datas of this part of the configuration is not null (thus an empty object) 
            if (handleMode == "Edit" && Object.keys(channelsCalibrationsDatas.current).length > 0 && snapshotData) {
                // we save the part of data that the user has edited to the correct configuration in the server
                dispatch(saveChangesToOneConfiguration({snapshotId:snapshotData._id, path:"channels.calibrations", conf:channelsCalibrationsDatas.current}));
            }
        }
    }, []);

    return (
        <div className='w-full h-full flex flex-col items-center'>
            <h1 className='font-bold underline text-red-600'>Calibrations</h1>
            <div className='h-[90%] grid grid-cols-2 gap-x-8 mt-4 p-4'>
                <div className='grid grid-rows-2 gap-y-8'>
                    <TableHandle
                        tableTitle={"Card 1"}
                        tableData={channelsCalibrationsDatas.current.cardChannelsCalibration.slice(0,8)}
                        itemColumnName={"Channel n°"}
                        itemRowName={"Channel"}
                        columnLabels={channelsCalibrationsColumnsLabelsData}
                        tooltipLabels={tooltipLabelsMap}
                        onChangeToParent={handleDatasChange}
                    >
                        {(valueFields, handleChangeFunction, readOnly, hitClip) =>
                            ChannelsCalibrationsInitialsData({valueFields:valueFields, handleChangeFunction:handleChangeFunction, readOnly:readOnly, hitClip:hitClip})
                        }
                    </TableHandle>
                    <TableHandle
                        tableTitle={"Card 2"}
                        tableData={channelsCalibrationsDatas.current.cardChannelsCalibration.slice(8,16)}
                        itemColumnName={"Channel n°"}
                        itemRowName={"Channel"}
                        columnLabels={channelsCalibrationsColumnsLabelsData}
                        tooltipLabels={tooltipLabelsMap}
                        onChangeToParent={handleDatasChange}
                        startIndex={9}
                    >
                        {(valueFields, handleChangeFunction, readOnly, hitClip) =>
                            ChannelsCalibrationsInitialsData({valueFields:valueFields, handleChangeFunction:handleChangeFunction, readOnly:readOnly, hitClip:hitClip})
                        }
                    </TableHandle>
                </div>
                <div className='grid grid-rows-2 gap-y-8'>
                    <TableHandle
                        tableTitle={"Card 3"}
                        tableData={channelsCalibrationsDatas.current.cardChannelsCalibration.slice(16,24)}
                        itemColumnName={"Channel n°"}
                        itemRowName={"Channel"}
                        columnLabels={channelsCalibrationsColumnsLabelsData}
                        tooltipLabels={tooltipLabelsMap}
                        onChangeToParent={handleDatasChange}
                        startIndex={17}
                    >
                        {(valueFields, handleChangeFunction, readOnly, hitClip) =>
                            ChannelsCalibrationsInitialsData({valueFields:valueFields, handleChangeFunction:handleChangeFunction, readOnly:readOnly, hitClip:hitClip})
                        }
                    </TableHandle>
                    <TableHandle
                        tableTitle={"Card 4"}
                        tableData={channelsCalibrationsDatas.current.cardChannelsCalibration.slice(24)}
                        itemColumnName={"Channel n°"}
                        itemRowName={"Channel"}
                        columnLabels={channelsCalibrationsColumnsLabelsData}
                        tooltipLabels={tooltipLabelsMap}
                        onChangeToParent={handleDatasChange}
                        startIndex={25}
                    >
                        {(valueFields, handleChangeFunction, readOnly, hitClip) =>
                            ChannelsCalibrationsInitialsData({valueFields:valueFields, handleChangeFunction:handleChangeFunction, readOnly:readOnly, hitClip:hitClip})
                        }
                    </TableHandle>
                </div>
            </div>
        </div>
    );
};