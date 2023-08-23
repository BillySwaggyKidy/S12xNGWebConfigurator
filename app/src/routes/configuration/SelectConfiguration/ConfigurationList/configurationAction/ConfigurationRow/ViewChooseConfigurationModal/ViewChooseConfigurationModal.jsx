import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { openOneConfiguration } from '../../../../../../../actions/rootActions.js';
import { serverUrl } from '../../../../../../../../serverside/routers/routes.js';

// this component is a modal to choose whatever configuration data (snapshot or official) we want to read
export default function ViewChooseConfigurationModal({configurationId, configurationName, close})
{
    const { userInfo } = useSelector((state) => state.authentification); // we get the userInfo var from the authentification reducer
    const [configurationVersionsList, setConfigurationVersionsList] = useState([]);
    const [errorMsg, setErrorMsg] = useState(""); // this state represent the error msg that display in the modal
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    // this function send a request to read a snapshot or an official configuration
    const readConfiguration = () => {
        // we only get the version selected by the user
        const selectedConfigurationVersion = configurationVersionsList.find((version)=>version.selected);
        if (selectedConfigurationVersion) {
            dispatch(openOneConfiguration({
                userId: userInfo._id,
                configurationId: configurationId,
                configurationDataId: selectedConfigurationVersion.id,
                handleMode: "Read"
            }))
            .unwrap()
            .then((originalPromiseResult) => {
                // if the action is fulfilled then
                setErrorMsg(""); // we update the errorMsg hook with the action error
                // we navigate to the edit configuration part
                navigate(location.pathname+'/'+configurationId+'/handle', {
                    state: {
                        paramObject: {
                            id: configurationId,
                        }
                    }
                });
                close();
            })
            .catch((rejectedValueOrSerializedError) => {
                // if the action is rejected then
                setErrorMsg(rejectedValueOrSerializedError); // we update the errorMsg hook with the action error
            });
        }
        else {
            setErrorMsg("Error: no version selected !");
        }
    };

    // this function toggle an version item to be selected or not for the download
    const selectConfigurationVersions = (versionIndex) => {
        setConfigurationVersionsList(configurationVersionsList.map((version, index)=>{
            if (index == versionIndex) { // if the index match the index parameter from the calling item then
                version.selected = !version.selected; // we switch the bool value of the selected
            }
            else {
                version.selected = false;
            }
            return version;
        }))
    };
    
    // when the component mount, we get the list of all the version of the configuration
    useEffect(()=>{
        // we first send a request to retrieve all of the official data from the same configuration
        fetch(`${serverUrl()}/configuration/getAllOfficialVersionsFromConfiguration`, {
            method: 'POST',
            body: JSON.stringify({
                userId: userInfo._id, 
                configurationId: configurationId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then((resp)=>resp.json())
        .then((versionList) => {
            versionList = versionList.map((v)=>{ // we create a list of object from the list of versions
                return {
                    id: v._id,
                    version: v.version,
                    selected: false
                };
            });
            setErrorMsg(versionList.length == 0 ? "Error: no version selected !" : "");
            setConfigurationVersionsList(versionList); // we update the configurationVersionsList hook
        });
    },[]);


    // this function component represent an item for a version of a configuration
    const ConfigurationVersionsItems = ({selected, index, version}) => {
        return (
            <div className={`w-36 h-12 flex flex-row justify-center items-center p-1 border-2 rounded-lg border-gray-700 ${selected ? 'bg-green-500' : 'bg-red-500'} cursor-pointer drop-shadow-lg my-2`} onClick={()=>{selectConfigurationVersions(index)}}>
                <p className='text-xl font-bold select-none text-center'>Version {version}</p>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-slate-300 bg-opacity-80 overflow-y-auto h-full w-full z-50 animate-fade-in-center">
            <div className="relative top-20 mx-auto p-5 w-[500px] h-[500px] shadow-lg rounded-md bg-blue-300 border-4 border-blue-700">
                <div className="h-full flex flex-col items-center">
                    <div className="h-1/6 flex flex-col items-center justify-around">
                        <h3 className="text-xl leading-6 text-gray-900 font-bold text-center">{configurationName}</h3>
                        <p className='text-lg text-gray-500 text-center'>Please select the type of configuration you want to read</p>
                        <p className="font-bold text-red-500 underline text-center">{errorMsg}</p>
                    </div>
                    <div className="h-[80%] flex flex-row items-center justify-start">
                        <div className='h-full flex flex-col justify-start items-center border border-3 border-gray-500 bg-slate-200 drop-shadow-xl rounded-lg m-4 px-2 py-1'>
                            <p className='text-lg underline'>Snapshot</p>
                            <div className='h-[90%] flex flex-col justify-center items-center overflow-y-auto'>
                                {
                                    configurationVersionsList.slice(0,1).map((versionObj, index)=>
                                        <ConfigurationVersionsItems key={versionObj.id} index={index} selected={versionObj.selected} version={versionObj.version}/>
                                    )
                                }
                            </div>
                        </div>
                        {
                            configurationVersionsList.slice(1).length > 0 &&
                            <div className='h-full flex flex-col justify-start items-center border border-3 border-gray-500 bg-slate-200 drop-shadow-xl rounded-lg m-4 px-2 py-1'>
                                <p className='text-lg underline'>Officials</p>
                                <div className='h-[90%] flex flex-col justify-start items-center overflow-y-auto'>
                                    {
                                        configurationVersionsList.slice(1).map((versionObj, index)=>
                                            <ConfigurationVersionsItems key={versionObj.id} index={index + 1} selected={versionObj.selected} version={versionObj.version}/>
                                        )
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    <div className="w-full h-1/6 flex flex-row justify-around items-center mt-2">
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white" variant="contained" onClick={readConfiguration}>Read</Button>
                        <Button className="bg-slate-500 hover:bg-slate-400 text-white" variant="contained" onClick={close}>Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}