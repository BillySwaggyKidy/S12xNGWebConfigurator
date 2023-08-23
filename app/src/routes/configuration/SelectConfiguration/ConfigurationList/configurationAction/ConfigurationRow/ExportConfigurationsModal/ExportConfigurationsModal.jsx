import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { serverUrl } from '../../../../../../../../serverside/routers/routes';

export default function ExportConfigurationsModal({configurationId, configurationName, close})
{
    const { userInfo } = useSelector((state) => state.authentification); // we get the userInfo var from the authentification reducer
    const [configurationVersionsList, setConfigurationVersionsList] = useState([]);
    const [errorMsg, setErrorMsg] = useState(""); // this state represent the error msg that display in the modal

    // this function send a request to download a list of versions of a configuration choosed by the user from the server
    const exportConfigurationFiles = () => {
        // we first filter the configurationVersionsList to keep only the select version then we extract only the official selected id
        const filteredConfigurationVersionsList = configurationVersionsList.filter((version)=>version.selected).map((version)=>version.id);
        if (filteredConfigurationVersionsList.length > 0) {
            let dataDownload = {
                userId: userInfo._id, // this is the id of the user performing the action
                configurationId: configurationId, // this is the id of the configuration
                // this is the list of all the officialData object we want to export
                officialIdList: filteredConfigurationVersionsList
            }
            // we send to server the list of version we want to download
            fetch(`${serverUrl()}/configuration/exportVersionsOfConfiguration`, {
                method: 'POST',
                body: JSON.stringify(dataDownload),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            .then(async (resp) => {
                const contentType = resp.headers.get("content-type"); // we check the content type of the response
                switch(contentType) {
                    case "application/zip":
                        return resp.blob();
                    case "text/html; charset=utf-8":
                        return resp.text();
                }
            })
            .then((resp)=>{
                if (resp instanceof Blob) { // if the response is an instance of a Blob then
                    const newFile = new Blob([resp]); // we create a Blob instance
                    const fileUrl = window.URL.createObjectURL(newFile); // we create an objectUrl
        
                    const link = document.createElement('a'); // we create a temporary link element
                    link.href = fileUrl; // we link the href to the objectUrl
                    link.download = configurationName + "_output.zip"; // we set the file name for the download on the browser
                    link.click(); // we simulate a click
                    close();
                }
                else {
                    setErrorMsg(resp); // we set the error message with the text response sent from the server
                }
            })
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
            versionList = versionList.slice(1).map((v)=>{ // we create a list of object from the list of versions
                return {
                    id: v._id,
                    version: v.version,
                    selected: false
                };
            });
            setErrorMsg(versionList.length == 0 ? "Error: no version available" : "");
            setConfigurationVersionsList(versionList); // we update the configurationVersionsList hook
        });
    },[]);


    // this function component represent an item for a version of a configuration
    const ConfigurationVersionsItems = ({selected, index, version}) => {
        return (
            <div className={`w-36 h-12 flex flex-row justify-center items-center p-1 border-2 rounded-lg border-gray-700 ${selected ? 'bg-green-500' : 'bg-red-500'} cursor-pointer drop-shadow-lg my-2`} onClick={()=>{selectConfigurationVersions(index)}}>
                <p className='text-xl font-bold select-none'>Version {version}</p>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-slate-300 bg-opacity-80 overflow-y-auto h-full w-full z-50 animate-fade-in-center">
            <div className="relative top-20 mx-auto p-5 w-[500px] h-[500px] shadow-lg rounded-md bg-green-300 border-4 border-green-700">
                <div className="h-full flex flex-col items-center">
                    <div className="h-1/6 flex flex-col items-center justify-around">
                        <h2 className="text-2xl leading-6 text-gray-900 font-bold text-center mt-1">Versions of <p className='text-base'>{configurationName}</p></h2>
                        <p className='text-lg text-gray-500 text-center'>Please select the version(s) you want to export</p>
                        <p className="font-bold text-red-500 underline text-center">{errorMsg}</p>
                    </div>
                    <div className="w-1/2 h-[80%] flex flex-col items-center justify-start overflow-y-auto mt-3 border border-3 border-gray-500 bg-slate-200 drop-shadow-xl rounded-lg m-4 px-2 py-1">
                        {
                            configurationVersionsList.map((versionObj, index)=>
                                <ConfigurationVersionsItems key={versionObj.id} index={index} selected={versionObj.selected} version={versionObj.version}/>
                            )
                        }
                    </div>
                    <div className="w-full h-1/6 flex flex-row justify-around items-center mt-2">
                        <Button className="bg-green-600 hover:bg-green-500 text-white" variant="contained" onClick={exportConfigurationFiles}>Download</Button>
                        <Button className="bg-slate-500 hover:bg-slate-400 text-white" variant="contained" onClick={close}>Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}