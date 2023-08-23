import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormBox from '../../../../../components/utils/FormBox/FormBox.jsx';
import { 
    GeneralInfosInitialsName, 
    GeneralInfosInitialsConf, 
    GeneralInfosInitialsRS485, 
    GeneralInfosInitialsEthernetRJ45 
} from '../../../../../components/utils/formInitialValues/general/GeneralInfosInitials.jsx';
import { saveChangesToOneConfiguration } from '../../../../../actions/rootActions.js';
import { omit } from '../../../../../../utils/functions-utils.js';
import { HandleModeStatus } from '../../../../../../utils/enums-utils.js';

// this component represent all of the informations sections of the general configuration
export default function GeneralInformations() {
    const { snapshotData, handleMode } = useSelector((state) => state.configuration); // we get the userList var from the account reducer
    const dispatch = useDispatch();
    const channelsInformationsDatas = useRef(JSON.parse(JSON.stringify(snapshotData?.data.general.informations ?? {})));
    const [dynamicParameterConfValues, setDynamicParameterConfValues] = useState({
        commCardType: channelsInformationsDatas.current?.parameterConf.commCardType,
        accessCode: channelsInformationsDatas.current?.parameterConf.accessCode,
    });
    const isReadOnlyMode = handleMode == HandleModeStatus.Read;

    // this function handle all of the data change made by the fields every Form fields components has an instance of this function as props
    const handleDatasChange = (id, object) => {
        channelsInformationsDatas.current[id] = object;
        let omitArray = ["isValid","_id", "RS485", "ethernetRJ45"];
        switch(channelsInformationsDatas.current?.parameterConf.commCardType) {
            case 0:
                omitArray.splice(omitArray.indexOf('RS485'),1)
                break;
            case 1:
                omitArray.splice(omitArray.indexOf('ethernetRJ45'),1)
                break;
        }
        channelsInformationsDatas.current.isValid = Object.values(omit(channelsInformationsDatas.current, omitArray)).every((obj)=>obj.isValid);
        if (id == "parameterConf") {
            channelsInformationsDatas.current.configurationName.suffixCode = object.accessCode.padStart(4, '0');
            setDynamicParameterConfValues({
                commCardType: object.commCardType,
                accessCode: object.accessCode.padStart(4, '0')
            })
        }
    };

    // this useEffect run when the component will unmount
    useEffect(() => {
        return () => {
            // if the user is in edit mode and the object containg the datas of this part of the configuration is not null (thus an empty object) 
            if (handleMode == "Edit" && Object.keys(channelsInformationsDatas.current).length > 0) {
                // we save the part of data that the user has edited to the correct configuration in the server
                dispatch(saveChangesToOneConfiguration({snapshotId:snapshotData._id, path:"general.informations", conf:channelsInformationsDatas.current}));
            }
        }
    }, []);


    const DisplayGeneralCardTypeFormBox = ({cardType}) => {
        let cardTypeArray = [];
        switch(cardType) {
            case 0:
                cardTypeArray.push(
                    <FormBox key={"RS485"} id={"RS485"} title={"RS485"} boxValues={channelsInformationsDatas?.current.RS485} readOnly={isReadOnlyMode} onChangeToParent={handleDatasChange}>
                        {(valueFields, handleChangeFunction, readOnly) => (
                            <GeneralInfosInitialsRS485 valueFields={valueFields} handleChangeFunction={handleChangeFunction} readOnly={readOnly}/>
                        )}
                    </FormBox>
                );
                break;
            case 1:
                cardTypeArray.push(
                    <FormBox key={"ethernetRJ45"} id={"ethernetRJ45"} title={"Ethernet RJ45"} boxValues={channelsInformationsDatas.current?.ethernetRJ45} readOnly={isReadOnlyMode} onChangeToParent={handleDatasChange}>
                        {(valueFields, handleChangeFunction, readOnly) => (
                            <GeneralInfosInitialsEthernetRJ45 valueFields={valueFields} handleChangeFunction={handleChangeFunction} readOnly={readOnly}/>
                        )}
                    </FormBox>
                );
                break;
        }

        return (
            <div className='grid grid-rows-2 gap-y-8'>
                {cardTypeArray}
            </div>
        )
    }
  

    return (
        <div className='w-full h-full flex flex-col items-center'>
            <h1 className='font-bold underline text-red-600'>General Informations</h1>
            <div className='h-[90%] grid grid-cols-2 gap-y-4 gap-x-48 mt-4 px-24'>
                <div className='grid grid-rows-2 gap-y-8'>
                    <FormBox key={"configurationName"} id={"configurationName"} title={"Configuration name"} boxValues={channelsInformationsDatas.current?.configurationName} onChangeToParent={handleDatasChange}>
                        {(valueFields, handleChangeFunction, readOnly) => (
                            <GeneralInfosInitialsName 
                                valueFields={{...valueFields, suffixCode: dynamicParameterConfValues.accessCode}}
                                handleChangeFunction={handleChangeFunction}
                                readOnly={isReadOnlyMode}
                            />
                        )}
                    </FormBox>
                    <FormBox key={"parameterConf"} id={"parameterConf"} title={"General configuration"} boxValues={channelsInformationsDatas.current?.parameterConf} onChangeToParent={handleDatasChange}>
                        {(valueFields, handleChangeFunction, readOnly) => (
                            <GeneralInfosInitialsConf valueFields={valueFields} handleChangeFunction={handleChangeFunction} readOnly={isReadOnlyMode}/>
                        )}
                    </FormBox>
                </div>
                <DisplayGeneralCardTypeFormBox cardType={dynamicParameterConfValues.commCardType}/>
            </div>
        </div>
    );
};