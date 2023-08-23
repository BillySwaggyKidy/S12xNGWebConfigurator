import { omit, pick } from "../../../../../utils/functions-utils";
import { setGeneralInfosValues } from "../../initials/defaultSnapshotDataValues/general/generalInfosDefaultValues.js";
import { setGeneralRelaysValues } from "../../initials/defaultSnapshotDataValues/general/generalRelaysDefaultValues.js";
import { setGeneralCardCompensationsValues } from "../../initials/defaultSnapshotDataValues/general/generalCardCompensationsDefaultValues.js";
import { setChannelsInfosValues } from "../../initials/defaultSnapshotDataValues/channels/channelsInfosDefaultValues.js";
import { setChannelsThresholdValues } from "../../initials/defaultSnapshotDataValues/channels/channelsThresholdDefaultValues.js";
import { setChannelsCalibrationValues } from "../../initials/defaultSnapshotDataValues/channels/channelsCalibrationDefaultValues";
import { setChannelsMaScalesValues } from "../../initials/defaultSnapshotDataValues/channels/channelsMaScalesDefaultValues.js";
import { setOthersAveragesValues } from "../../initials/defaultSnapshotDataValues/others/othersAveragesDefaultValues.js";
import { setOthersDeviationsValues } from "../../initials/defaultSnapshotDataValues/others/othersDeviationsDefaultValues.js";
import { setOthersGradientsValues } from "../../initials/defaultSnapshotDataValues/others/othersGradientsDefaultValues.js";

export default function convertOfficialConfToSnapshot(confName, officialDataObj) {
    let PxArray = ["P1","P2"]; // this array represent all of the existing Px parameter a config can have
    // we create an object containing all of the commun datas from the two Px files 
    const confCommonData = {
        language: officialDataObj.language,
        g: officialDataObj.g,
        px: {
            channel: officialDataObj.px.channel.map((threshold)=>omit(threshold,["threshold"]))
        },
        meta: {
            deviceFw: officialDataObj.meta.deviceFw,
            deviceModel: officialDataObj.meta.deviceModel
        }
    };
    // we create an array of object representing the specific data from the Px files
    const officialDataObjPx = officialDataObj.px;
    const confPxData = PxArray.map((pxParameter)=>{
        return {
            px: {
                commutationTime: officialDataObjPx.commutationTime[pxParameter],
                channel: officialDataObjPx.channel.map((channelObj)=>{
                    let editChannelObj = pick(channelObj,["threshold"]);
                    editChannelObj.threshold = editChannelObj.threshold[pxParameter];
                    return editChannelObj;
                }),
                deviation: officialDataObjPx.deviation.map((deviation)=>deviation[pxParameter]),
                gradient: officialDataObjPx.gradient.map((gradient)=>gradient[pxParameter]),
                mean: officialDataObjPx.mean.map((mean)=>mean[pxParameter]),
            },
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
        //console.log(err);
        return null;
    }

}