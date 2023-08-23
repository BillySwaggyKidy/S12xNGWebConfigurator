import fs from "fs";
import { omit, pick } from "../../../../../utils/functions-utils";
import { setGeneralInfosValues } from "../../initials/defaultSnapshotDataValues/general/generalInfosDefaultValues.js";
import { setGeneralRelaysValues } from "../../initials/defaultSnapshotDataValues/general/generalRelaysDefaultValues.js";
import { setGeneralCardCompensationsValues } from "../../initials/defaultSnapshotDataValues/general/generalCardCompensationsDefaultValues.js";
import { setChannelsInfosValues } from "../../initials/defaultSnapshotDataValues/channels/channelsInfosDefaultValues.js";
import { setChannelsThresholdValues } from "../../initials/defaultSnapshotDataValues/channels/channelsThresholdDefaultValues.js";
import { setChannelsMaScalesValues } from "../../initials/defaultSnapshotDataValues/channels/channelsMaScalesDefaultValues.js";
import { setOthersAveragesValues } from "../../initials/defaultSnapshotDataValues/others/othersAveragesDefaultValues.js";
import { setOthersDeviationsValues } from "../../initials/defaultSnapshotDataValues/others/othersDeviationsDefaultValues.js";
import { setOthersGradientsValues } from "../../initials/defaultSnapshotDataValues/others/othersGradientsDefaultValues.js";
import { setChannelsCalibrationValues } from "../../initials/defaultSnapshotDataValues/channels/channelsCalibrationDefaultValues";

// this function convert a set of configuration json files to an snapshot configuration object
export default function convertConfigFilesToSnapshot(confName,confFiles) {
    // we create an array containing all of the json data of the configuration's files
    let confFilesData = confFiles.map((file)=>JSON.parse(fs.readFileSync(file.path, { encoding: 'utf8' })));
    // after reading all the files stored temporaly in the application, we delete them
    confFiles.forEach((file)=> {
        fs.unlink(file.path, (err) => {
            if (err) throw err;
        });
    });
    const firstFileData = confFilesData[0];
    // if an S128 configuration contain only one Px file then we duplicate it to create two parameters files
    if (confName.includes("128") && confFilesData.length < 2) {
        confFiles.push(firstFileData);
    }
    // we create an object containing all of the commun datas from the two Px files 
    const confCommonData = {
        language: firstFileData.language,
        g: firstFileData.g,
        px: {
            channel: firstFileData.px.channel.map((threshold)=>omit(threshold,["threshold"]))
        },
        meta: {
            deviceFw: firstFileData.meta.deviceFw,
            deviceModel: firstFileData.meta.deviceModel
        }
    };
    // we create an array of object representing the specific data from the Px files
    const confPxData = confFilesData.map((file)=>{
        return {
            px: {
                channel: file.px.channel.map((threshold)=>pick(threshold,["threshold"])),
                ...file.px
            },
            meta: {
                devicePx: file.meta.devicePx
            }
        }
    });
    try {
        // we create the new snapshot object using all of the functions
        const snapshotConfigObject = {
            general: {
                informations: setGeneralInfosValues(confName, confCommonData, confPxData),
                relays: setGeneralRelaysValues(confCommonData),
                cardsAndCompensations: setGeneralCardCompensationsValues(confCommonData),
            },
            channels:{
                informations: setChannelsInfosValues(confCommonData),
                thresholds: setChannelsThresholdValues(confCommonData, confPxData),
                calibrations: setChannelsCalibrationValues(confCommonData),
                maScales: setChannelsMaScalesValues(confCommonData),
            },
            others: {
                averages: setOthersAveragesValues(confCommonData, confPxData),
                deviations: setOthersDeviationsValues(confCommonData, confPxData),
                gradients: setOthersGradientsValues(confCommonData, confPxData),
            }
        };
        return snapshotConfigObject; // we return the new snapshot object
    }
    catch(err) { // if the creating the snapshot object somehow fail then we return null
        return null;
    }
    
};