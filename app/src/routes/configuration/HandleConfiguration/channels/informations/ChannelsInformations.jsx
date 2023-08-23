import React, {useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { saveChangesToOneConfiguration } from '../../../../../actions/rootActions.js';
import TableHandle from '../../../../../components/utils/table/TableHandle/TableHandle.jsx';
import ChannelsInfosRowInitials from '../../../../../components/utils/formInitialValues/channels/ChannelsInfosInitials.jsx';

// this component represent all of the informations sections of the channels
export default function ChannelsInformations() {
    const { snapshotData, handleMode } = useSelector((state) => state.configuration); // we get the userList var from the account reducer
    const dispatch = useDispatch();
    const channelsInformationsDatas = useRef(JSON.parse(JSON.stringify(snapshotData?.data.channels.informations ?? {})));


    // this function handle all of the data change made by the fields every Form fields components has an instance of this function as props
    const handleDatasChange = (index, object, ...args) => {
        channelsInformationsDatas.current.cardChannelsInfo[index] = object;
        channelsInformationsDatas.current.isValid = channelsInformationsDatas.current.cardChannelsInfo.every((item)=>item.isValid);
    };

    useEffect(() => {
        return () => {
            // if the user is in edit mode and the object containg the datas of this part of the configuration is not null (thus an empty object) 
            if (handleMode == "Edit" && Object.keys(channelsInformationsDatas.current).length > 0) {
                // we save the part of data that the user has edited to the correct configuration in the server
                dispatch(saveChangesToOneConfiguration({snapshotId:snapshotData._id, path:"channels.informations", conf:channelsInformationsDatas.current}));
            }
        }
    }, []);
      
    
    const columnLabels = ["state","type","decimal","line1","line2"];
    const tooltipLabelsMap = new Map([
        ["decimal",
        `No decimal=>d=0,1,2,3 => 10E-(4-d)`],
        ["line1",
        `Restricted to 16 ASCII characters`],
        ["line2",
        `Restricted to 16 ASCII characters`],
    
    ]);

    return (
        <div className='w-full h-full flex flex-col items-center'>
            <h1 className='font-bold underline text-red-600'>Channels Informations</h1>
            <div className='h-[94%] grid grid-cols-2 gap-x-12 p-1'>
                <div className='grid grid-rows-2'>
                    <TableHandle
                        tableTitle={"Card 1"}
                        tableData={channelsInformationsDatas.current.cardChannelsInfo.slice(0,8)}
                        itemColumnName={"Channel n°"}
                        itemRowName={"Channel"}
                        columnLabels={columnLabels}
                        tooltipLabels={tooltipLabelsMap}
                        onChangeToParent={handleDatasChange}
                    >
                        {(valueFields, handleChangeFunction, readOnly) => 
                            ChannelsInfosRowInitials({valueFields:valueFields, handleChangeFunction:handleChangeFunction, readOnly:readOnly})
                        }
                    </TableHandle>
                    <TableHandle
                        tableTitle={"Card 2"}
                        tableData={channelsInformationsDatas.current.cardChannelsInfo.slice(8,16)}
                        itemColumnName={"Channel n°"}
                        itemRowName={"Channel"}
                        columnLabels={columnLabels}
                        tooltipLabels={tooltipLabelsMap}
                        onChangeToParent={handleDatasChange}
                        startIndex={9}
                    >
                        {(valueFields, handleChangeFunction, readOnly) =>
                            ChannelsInfosRowInitials({valueFields:valueFields, handleChangeFunction:handleChangeFunction, readOnly:readOnly})
                        }
                    </TableHandle>
                </div>
                <div className='grid grid-rows-2'>
                    <TableHandle
                        tableTitle={"Card 3"}
                        tableData={channelsInformationsDatas.current.cardChannelsInfo.slice(16,24)}
                        itemColumnName={"Channel n°"}
                        itemRowName={"Channel"}
                        columnLabels={columnLabels}
                        tooltipLabels={tooltipLabelsMap}
                        onChangeToParent={handleDatasChange}
                        startIndex={17}
                    >
                        {(valueFields, handleChangeFunction, readOnly) =>
                            ChannelsInfosRowInitials({valueFields:valueFields, handleChangeFunction:handleChangeFunction, readOnly:readOnly})
                        }
                    </TableHandle>
                <TableHandle
                    tableTitle={"Card 4"}
                    tableData={channelsInformationsDatas.current.cardChannelsInfo.slice(24)}
                    itemColumnName={"Channel n°"}
                    itemRowName={"Channel"}
                    columnLabels={columnLabels}
                    tooltipLabels={tooltipLabelsMap}
                    onChangeToParent={handleDatasChange}
                    startIndex={25}
                >
                    {(valueFields, handleChangeFunction, readOnly) =>
                        ChannelsInfosRowInitials({valueFields:valueFields, handleChangeFunction:handleChangeFunction, readOnly:readOnly})
                    }
                </TableHandle>
                </div>
            </div>
        </div>
    );
};