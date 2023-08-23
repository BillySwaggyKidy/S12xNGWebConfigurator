import { Schema } from "mongoose";
import snapshotGeneralInfo from "./snapshotGeneral/snapshotGeneralInfos";
import snapshotGeneralRelays from "./snapshotGeneral/snapshotGeneralRelays";
import snapshotGeneralCardsCompensations from "./snapshotGeneral/snapshotGeneralCardsCompensations";
import snapshotChannelsInfos from "./snapshotChannels/snapshotChannelsInfos";
import snapshotChannelsThresholds from "./snapshotChannels/snapshotChannelsThresholds";
import snapshotChannelsCalibrations from "./snapshotChannels/snapshotChannelsCalibrations";
import snapshotChannelsMascales from "./snapshotChannels/snapshotChannelsMascales";
import snapshotOthersAverages from "./snapshotOthers/snapshotOthersAverages";
import snapshotOthersDeviations from "./snapshotOthers/snapshotOthersDeviations";
import snapshotOthersGradients from "./snapshotOthers/snapshotOthersGradients";

// this file export a use model for the mongoDB database by mongoose
// it is important to splite the creation of a model and the exportation or else mongoose will not support the creation of 2 distincs models
let snapshotDataObject = new Schema(
    {
        general : {
            informations: snapshotGeneralInfo,
            relays: snapshotGeneralRelays,
            cardsAndCompensations: snapshotGeneralCardsCompensations,
        },
        channels: {
            informations: snapshotChannelsInfos,
            thresholds: snapshotChannelsThresholds,
            calibrations: snapshotChannelsCalibrations,
            maScales: snapshotChannelsMascales,
        },
        others: {
            averages: snapshotOthersAverages,
            deviations: snapshotOthersDeviations,
            gradients: snapshotOthersGradients,
        }
    },
    {_id: false}
);

export default snapshotDataObject; // we export the snapshotData model