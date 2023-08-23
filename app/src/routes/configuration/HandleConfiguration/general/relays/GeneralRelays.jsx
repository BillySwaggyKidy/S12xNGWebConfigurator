import React, {useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormBox from '../../../../../components/utils/FormBox/FormBox.jsx';
import { saveChangesToOneConfiguration } from '../../../../../actions/rootActions.js';
import { GeneralRelaysInitials, GeneralRelaysInitialsGroup } from '../../../../../components/utils/formInitialValues/general/GeneralRelaysInitials.jsx';
import { omit } from '../../../../../../utils/functions-utils.js';
import { HandleModeStatus } from '../../../../../../utils/enums-utils.js';

// this component represent all of the relays sections of the general configuration
export default function GeneralRelays() {
    const { snapshotData, handleMode } = useSelector((state) => state.configuration); // we get the userList var from the account reducer
    const dispatch = useDispatch();
    const channelsRelaysDatas = useRef(JSON.parse(JSON.stringify(snapshotData?.data.general.relays ?? {})));
    const isReadOnlyMode = handleMode == HandleModeStatus.Read;

    // this function handle all of the data change made by the fields every Form fields components has an instance of this function as props
    const handleDatasChange = (id, object) => {
        channelsRelaysDatas.current[id] = object;
        channelsRelaysDatas.current.isValid = Object.values(omit(channelsRelaysDatas.current, ["isValid","_id"])).every((obj)=>obj.isValid);
    };
  
    // this useEffect run when the component will unmount
    useEffect(() => {
        return () => {
            // if the user is in edit mode and the object containg the datas of this part of the configuration is not null (thus an empty object) 
            if (handleMode == "Edit" && Object.keys(channelsRelaysDatas.current).length > 0) {
                // we save the part of data that the user has edited to the correct configuration in the server
                dispatch(saveChangesToOneConfiguration({snapshotId:snapshotData._id, path:"general.relays", conf:channelsRelaysDatas.current}));
            }
        }
    }, []);

    return (
        <div className='w-full h-full flex flex-col items-center'>
            <h1 className='font-bold underline text-red-600'>Relays</h1>
            <div className='h-[90%] grid grid-cols-2 gap-x-10 mt-4 p-4'>
                <div className='flex flex-col justify-center items-center'>
                    <FormBox id={"configuration"} title={"Relay Configuration"} boxValues={channelsRelaysDatas.current.configuration}  readOnly={isReadOnlyMode} onChangeToParent={handleDatasChange}>
                        {(valueFields, handleChangeFunction, readOnly) => (
                            <GeneralRelaysInitials valueFields={valueFields} handleChangeFunction={handleChangeFunction} readOnly={readOnly}/>
                        )}
                    </FormBox>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <FormBox id={"group"} title={"Group Configuration"} boxValues={channelsRelaysDatas.current.group} readOnly={isReadOnlyMode} onChangeToParent={handleDatasChange}>
                        {(valueFields, handleChangeFunction, readOnly) => (
                            <GeneralRelaysInitialsGroup valueFields={valueFields} handleChangeFunction={handleChangeFunction} readOnly={readOnly}/>
                        )}
                    </FormBox>
                </div>
            </div>
        </div>
    );
};