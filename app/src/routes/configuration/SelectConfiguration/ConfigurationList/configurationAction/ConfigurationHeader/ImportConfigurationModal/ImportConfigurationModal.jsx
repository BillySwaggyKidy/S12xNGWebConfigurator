import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import Button from "@mui/material/Button";
import { importConfigurationFiles } from "../../../../../../../actions/rootActions.js";
import { ConfFilesItemStatus } from "../../../../../../../../utils/enums-utils.js";
import DragDropFile from "../../../../../../../components/utils/DragDropFile/DragDropFile.jsx";
import ConfigurationFilesItems from "./ConfigurationFilesItems.jsx";

// regex name config file test: S128_Fw888_P2_112233_P0125874_1122.json

// this component represent the modal to import a configuration files to the database
export default function ImportConfigurationModal({close}) {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.authentification); // we get the userInfo var from the authentification reducer
    const { customerData } = useSelector((state) => state.configuration); // we get the customerData var from the configuration reducer
    // the following regex purpose is to match all the json file with the correct name format
    const configFileNameRegex = new RegExp("^S12(8_Fw[0-9]{3}(_P1|_P2)|9_Fw[0-9]{3}(_P1)?)_[a-zA-Z0-9]{1,9}_[a-zA-Z0-9]{1,9}_[0-9]{4}.json$");
    // this regex purpose is to catch the devicetype in the filename
    const deviceTypeRegex = new RegExp('S(12[8-9])');
        // this regex purpose is to catch the Px parameter in the filename
    const devicePxRegex = new RegExp('S12[8-9]_Fw[0-9]{3}_(P[1-2])');
    const [configFiles, setConfigFiles] = useState([]); // this array contain all of the configuration object
    const [errorMsg, setErrorMsg] = useState(""); // this state represent the error msg that display in the modal

    // this function update the configFiles array when the user drop or upload some files throught the drag and drop component
    const handleFiles = (files) => {
        let newConfigFiles = structuredClone(configFiles); // we deep copy the array with this function to keep the special var like File
        files.forEach(file => { // for each file sended by the DargAndDropComponent
            // if the file name is in the right name format
            if (configFileNameRegex.test(file.name)) {
                const configDeviceType = deviceTypeRegex.exec(file.name)[1]; // we catch the devicetype using the regex
                const pxResult = devicePxRegex.exec(file.name); // we catch the Px using the regex
                const configDevicePx = pxResult ? pxResult[1] : "P1"; // we catch the devicetype using the regex
                // we create the configuration name without the Px paramter on it
                const configFileName = (pxResult ? file.name.replace(`_${configDevicePx}`,'') : file.name).replace('.json','');
                // we check if there is already an object with then same configuration name
                if (newConfigFiles.findIndex((config)=>config.name == configFileName) > -1) {
                    // we edit the configFiles to add or push a new px file into the configuration object
                    newConfigFiles.map((config)=>{
                        if (config.name == configFileName) {
                            // we first check if there is also an object in the fileInfoList property that contain the same parameter name
                            const pxIndex = config.fileInfoList.findIndex((file)=>file.parameter == configDevicePx); 
                            if (pxIndex === -1) { // if there's not then we push the new Px file into the fileInfoList array
                                config.fileInfoList.push({
                                    parameter: configDevicePx, 
                                    file: file
                                });
                                config.fileInfoList.sort((a,b)=>{
                                    const pA = a.parameter.toUpperCase();
                                    const pB = b.parameter.toUpperCase();
                                    if (pA < pB) {
                                        return -1;
                                    }
                                    if (pA > pB) {
                                        return 1;
                                    }
                                    return 0;
                                });
                            } 
                            else { // or else if yes then we simply replace the file by the current one
                                config.fileInfoList[pxIndex].file = file;
                            }
                            // we then change the status to Complete or Incomplete depending of if it is an S128 with two files or an S129 with only one file 
                            config.status = (configDeviceType == 128 && config.fileInfoList.length == 2) || (configDeviceType == 129 && config.fileInfoList.length == 1) ? ConfFilesItemStatus.Complete : ConfFilesItemStatus.Incomplete;
                        }
                    });
                }
                else { // the configuration name doesn't exist then we are creating a new configuration file object in the confFiles array
                    newConfigFiles.push({
                        status: configDeviceType == 129 ? ConfFilesItemStatus.Complete : ConfFilesItemStatus.Incomplete,
                        deviceType: configDeviceType,
                        name: configFileName,
                        fileInfoList: [
                            {
                                parameter: configDeviceType == 129 ? "P1" : configDevicePx, 
                                file: file
                            }
                        ]
                    })
                }
            }
            else { // the file is not in the good name format then 
                // we create an empty configuration file object with no file and device type with the Wrong status
                newConfigFiles.push({
                    status: ConfFilesItemStatus.Wrong,
                    deviceType: null,
                    name: file.name,
                    fileInfoList: null
                })
            }
        });
        setErrorMsg(""); // we clear the error message
        setConfigFiles(newConfigFiles); // we update the configFiles array with the new configFiles array
    };

    // this function delete a configuration files object from the configFiles array
    const deleteConfigurationFilesItem = (fileName) => {
        setConfigFiles(configFiles.filter((conf)=>conf.name !== fileName));
    };

    // this function send the files to the server to create new configurations in the database
    const sendConfigurationFilesToServer = () => {
        const completeConfigFilesList = configFiles.filter((conf)=>[ConfFilesItemStatus.Complete,ConfFilesItemStatus.Incomplete].includes(conf.status)); // we filter the lsit to keep onlyt the complete config object
        // if the filteredList contain at least one complete configuration object
        if (completeConfigFilesList.length > 0) {
            const confData = new FormData(); // we create a formData var to contain all of the
            confData.append("hostId", userInfo._id); // we add a key for the host id
            confData.append("customerId", customerData._id); // we add a key for the customer id
            // for each conf object, append all of the file of the fileInfoList in the same key as the configuration name
            completeConfigFilesList.forEach((conf)=>{
                // in order for file uploads to work, we really need to add one at a time the file in the same key, we can't create an array of file and append it in the key
                conf.fileInfoList.forEach((pxObj)=>{
                    confData.append(conf.name, pxObj.file, pxObj.parameter);
                })
            });
            dispatch(importConfigurationFiles({confFiles: confData}))
            .unwrap()
            .then((originalPromiseResult) => {
                setErrorMsg(""); // we clear the error message
                setConfigFiles([]); // we clear the confiFiles array
                close(); // we exit the import modal
            })
            .catch((rejectedValueOrSerializedError) => {
                // if the action is rejected then
                setErrorMsg(rejectedValueOrSerializedError);
            });
        }
        else {
            setErrorMsg("No valid file to import !");
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-300 bg-opacity-80 overflow-y-auto h-full w-full z-50 animate-fade-in-center">
            <div className="relative top-20 mx-auto p-5 w-[700px] h-[550px] h-max-[550px] shadow-lg rounded-md bg-white border-4 border-amber-700">
                <div className="h-full flex flex-col items-center">
                    <div className="h-[10%] flex flex-col items-center justify-around">
                        <h1 className="text-3xl leading-6 text-gray-900 font-bold">Import configurations</h1>
                    </div>
                    <div className="w-[95%] h-[80%] flex flex-col items-center justify-">
                        <DragDropFile extensions={['.json']} handleFiles={handleFiles}/>
                        <div className="w-[90%] h-[80%] h-max-[80%] flex flex-col items-center justify-start mt-4 text-center">
                            <h3>Configuration files list</h3>
                            <p className="font-bold text-xl text-red-500 underline">{errorMsg}</p>
                            <div className="w-full h-[80%] h-max-[80%] flex flex-col items-center justify-start overflow-y-auto border-2 border-amber-600 bg-slate-100 px-2 py-1">
                                {
                                    configFiles.map((conf)=>
                                        <ConfigurationFilesItems key={conf.name} status={conf.status} deviceType={conf.deviceType} name={conf.name} files={conf.fileInfoList} deleteConfItem={deleteConfigurationFilesItem}/>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[10%] flex flex-row justify-around items-center mt-2">
                        <Button className="bg-amber-600 hover:bg-amber-500 text-white" variant="contained" onClick={sendConfigurationFilesToServer}>Import</Button>
                        <Button className="bg-slate-500 hover:bg-slate-400 text-white" variant="contained" onClick={close}>Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}