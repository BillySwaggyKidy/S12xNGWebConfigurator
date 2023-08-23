import { generalInfosDefaultValues } from "./general/generalInfosDefaultValues.js";
import { generalRelaysDefaultValues } from "./general/generalRelaysDefaultValues.js";
import { generalCardCompensationsDefaultValues } from "./general/generalCardCompensationsDefaultValues.js";
import { channelsInfosDefaultValues } from "./channels/channelsInfosDefaultValues.js";
import { channelsThresholdDefaultValues } from "./channels/channelsThresholdDefaultValues.js";
import { channelsCalibrationDefaultValues } from "./channels/channelsCalibrationDefaultValues.js";
import { channelsMaScalesDefaultValues } from "./channels/channelsMaScalesDefaultValues.js";
import { othersAveragesDefaultValues } from "./others/othersAveragesDefaultValues.js";
import { othersDeviationsDefaultValues } from "./others/othersDeviationsDefaultValues.js";
import { othersGradientsDefaultValues } from "./others/othersGradientsDefaultValues.js";

// this object represent a default configuration datas with default values when creating a new configuration
const defaultSnapShotDataValues = {
    general: {
        informations: generalInfosDefaultValues,
        relays: generalRelaysDefaultValues,
        cardsAndCompensations: generalCardCompensationsDefaultValues,
    },
    channels:{
        informations: channelsInfosDefaultValues,
        thresholds: channelsThresholdDefaultValues,
        calibrations: channelsCalibrationDefaultValues,
        maScales: channelsMaScalesDefaultValues,
    },
    others: {
        averages: othersAveragesDefaultValues,
        deviations: othersDeviationsDefaultValues,
        gradients: othersGradientsDefaultValues,
    }
};

export default defaultSnapShotDataValues;