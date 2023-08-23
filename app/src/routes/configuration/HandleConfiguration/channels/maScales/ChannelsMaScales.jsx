import React, {useEffect} from 'react';
import useListenerState from '../../../../../../utils/customHooks/useListenerState.js';
import { useSelector, useDispatch } from 'react-redux';
import { saveChangesToOneConfiguration } from '../../../../../actions/rootActions.js';
import TableHandle from '../../../../../components/utils/table/TableHandle/TableHandle.jsx';
import ChannelsMaScalesInitials from '../../../../../components/utils/formInitialValues/channels/ChannelsMaScalesInitials.jsx';

// this component represent all of the ma scales sections of the channels
export default function ChannelsMaScales() {
    const { snapshotData, handleMode } = useSelector((state) => state.configuration); // we get the userList var from the account reducer
    const dispatch = useDispatch();
    const [channelsMaScalesDatas, setChannelsMaScalesDatas] = useListenerState(JSON.parse(JSON.stringify(snapshotData?.data.channels.maScales ?? {})));

    
    const channelsMaScalesLabels = ["Low scale","High scale"];
    
    // this function handle all of the data change made by the fields every Form fields components has an instance of this function as props
    const handleDatasChange = (indexChange, object) => {
        const newCardChannelsMascale = channelsMaScalesDatas.current.cardChannelsMascale.map((channel, index) =>{
            if (index == indexChange) {
                channel = object;
            }
            return channel;
        });
        setChannelsMaScalesDatas({
            cardChannelsMascale: newCardChannelsMascale,
            isValid: newCardChannelsMascale.every((item)=>item.isValid)
        });
    };

    // this useEffect run when the component will unmount
    useEffect(() => {
        return () => {
            // if the user is in edit mode and the object containg the datas of this part of the configuration is not null (thus an empty object) 
            if (handleMode == "Edit" && Object.keys(channelsMaScalesDatas.current).length > 0) {
                // we save the part of data that the user has edited to the correct configuration in the server
                dispatch(saveChangesToOneConfiguration({snapshotId:snapshotData._id, path:"channels.maScales", conf:channelsMaScalesDatas.current}));
            }
        }
    }, []);

    return (
        <div className='w-full h-full flex flex-col items-center'>
            <h1 className='font-bold underline text-red-600'>mA scale</h1>
            <div className='h-[90%] grid grid-cols-2 gap-x-8 mt-4 p-4'>
                <div className='grid grid-rows-2 gap-y-8'>
                    <TableHandle
                        tableTitle={"Card 1"}
                        tableData={channelsMaScalesDatas.current.cardChannelsMascale.slice(0,8)}
                        itemColumnName={"Channel n°"}
                        itemRowName={"Channel"}
                        columnLabels={channelsMaScalesLabels}
                        onChangeToParent={handleDatasChange}
                    >
                        {(valueFields, handleChangeFunction, readOnly) =>
                            ChannelsMaScalesInitials({valueFields:valueFields, handleChangeFunction:handleChangeFunction, readOnly:readOnly})
                        }
                    </TableHandle>
                    <TableHandle
                        tableTitle={"Card 2"}
                        tableData={channelsMaScalesDatas.current.cardChannelsMascale.slice(8,16)}
                        itemColumnName={"Channel n°"}
                        itemRowName={"Channel"}
                        columnLabels={channelsMaScalesLabels}
                        onChangeToParent={handleDatasChange}
                        startIndex={9}
                    >
                        {(valueFields, handleChangeFunction, readOnly) =>
                            ChannelsMaScalesInitials({valueFields:valueFields, handleChangeFunction:handleChangeFunction, readOnly:readOnly})
                        }
                    </TableHandle>
                </div>
                <div className='grid grid-rows-2 gap-y-8'>
                    <TableHandle
                        tableTitle={"Card 3"}
                        tableData={channelsMaScalesDatas.current.cardChannelsMascale.slice(16,24)}
                        itemColumnName={"Channel n°"}
                        itemRowName={"Channel"}
                        columnLabels={channelsMaScalesLabels}
                        onChangeToParent={handleDatasChange}
                        startIndex={17}
                    >
                        {(valueFields, handleChangeFunction, readOnly) =>
                            ChannelsMaScalesInitials({valueFields:valueFields, handleChangeFunction:handleChangeFunction, readOnly:readOnly})
                        }
                    </TableHandle>
                    <TableHandle
                        tableTitle={"Card 4"}
                        tableData={channelsMaScalesDatas.current.cardChannelsMascale.slice(24)}
                        itemColumnName={"Channel n°"}
                        itemRowName={"Channel"}
                        columnLabels={channelsMaScalesLabels}
                        onChangeToParent={handleDatasChange}
                        startIndex={25}
                    >
                        {(valueFields, handleChangeFunction, readOnly) =>
                            ChannelsMaScalesInitials({valueFields:valueFields, handleChangeFunction:handleChangeFunction, readOnly:readOnly})
                        }
                    </TableHandle>
                </div>
            </div>
        </div>
    );
};