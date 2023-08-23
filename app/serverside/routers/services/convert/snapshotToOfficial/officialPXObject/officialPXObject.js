const getCommutationTime = (generalInfo) => {
    const commutationTime = {
        P1: generalInfo.parameterConf.P1ToP2,
        P2: generalInfo.parameterConf.P2ToP1
    };
    // console.log("Px commutation time obj: ");
    // console.log(commutationTime);
    return commutationTime;
};

const getChannelArray = (threholdData, calibrationData) => {
    const offset = 1000;
    const channelArray = threholdData.cardChannelsThreshold.map((thresholdChannel, index)=> {
        const calibrationChannel = calibrationData.cardChannelsCalibration[index];
        return {
            detOffset: calibrationChannel.detOffset + offset,
            gain: calibrationChannel.gain + offset,
            offset: calibrationChannel.offset + offset,
            smooth: calibrationChannel.smooth + offset,
            threshold: {
                P1: Object.values(thresholdChannel.p1Parameters).map((thresholdX)=>{
                    return {
                        ...thresholdX,
                        value: thresholdX.value + offset,
                        time: thresholdX.time + offset,
                    };
                }),
                P2: Object.values(thresholdChannel.p2Parameters).map((thresholdX)=>{
                    return {
                        ...thresholdX,
                        value: thresholdX.value + offset,
                        time: thresholdX.time + offset,
                    };
                }),
            }
        }
    });
    // console.log("Px channel obj: ");
    // console.log(channelArray);
    return channelArray;
};

const getMeanArray = (means) => {
    const offset = 1000;
    const meanArray = means.averagesList.map((average)=>{
        return {
            P1:  {
                threshold: {
                    type: average.p1Parameters.type,
                    value: average.p1Parameters.value + offset,
                    time: average.p1Parameters.time + offset,
                    inhibGroup: average.p1Parameters.inhGrp,
                    relayGroup: average.p1Parameters.relayGrp
                }
            },
            P2: {
                threshold: {
                    type: average.p2Parameters.type,
                    value: average.p2Parameters.value + offset,
                    time: average.p2Parameters.time + offset,
                    inhibGroup: average.p2Parameters.inhGrp,
                    relayGroup: average.p2Parameters.relayGrp
                }
            },
        }
    });
    // console.log("Px mean obj: ");
    // console.log(meanArray);
    return meanArray;
};

const getGradientArray = (gradients) => {
    const offset = 1000;
    const gradientArray = gradients.gradientsList.map((gradient)=>{
        return {
            P1:  {
                threshold: {
                    type: gradient.p1Parameters.type,
                    value: gradient.p1Parameters.value + offset,
                    time: gradient.p1Parameters.time + offset,
                    inhibGroup: gradient.p1Parameters.inhGrp,
                    relayGroup: gradient.p1Parameters.relayGrp
                }
            },
            P2: {
                threshold: {
                    type: gradient.p2Parameters.type,
                    value: gradient.p2Parameters.value + offset,
                    time: gradient.p2Parameters.time + offset,
                    inhibGroup: gradient.p2Parameters.inhGrp,
                    relayGroup: gradient.p2Parameters.relayGrp
                }
            },
        }
    });
    // console.log("Px gradient obj: ");
    // console.log(gradientArray);
    return gradientArray;
};

const getDeviationArray = (deviations) => {
    const offset = 1000;
    const deviationArray = deviations.deviationsList.map((deviation)=>{
        return {
            P1: {
                fullScale: deviation.p1Parameters.fullScale + offset,
                fullScaleValue: deviation.p1Parameters.fullScaleValue + offset,
                halfScaleValue: deviation.p1Parameters.halfScaleValue + offset,
                lowAverage: deviation.p1Parameters.lowAverage + offset,
                threshold: {
                    time: deviation.p1Parameters.time + offset,
                    inhibGroup: deviation.p1Parameters.inhGrp,
                    relayGroup: deviation.p1Parameters.relayGrp
                }
            },
            P2: {
                fullScale: deviation.p2Parameters.fullScale + offset,
                fullScaleValue: deviation.p2Parameters.fullScaleValue + offset,
                halfScaleValue: deviation.p2Parameters.halfScaleValue + offset,
                lowAverage: deviation.p2Parameters.lowAverage + offset,
                threshold: {
                    time: deviation.p2Parameters.time + offset,
                    inhibGroup: deviation.p2Parameters.inhGrp,
                    relayGroup: deviation.p2Parameters.relayGrp
                }
            },
        }
    });
    // console.log("Px deviation obj: ");
    // console.log(deviationArray);
    return deviationArray;
};

export default function getOfficialPXObject(snapshotObject) {
    const officialPXObject = {
        commutationTime: getCommutationTime(snapshotObject.general.informations),
        channel: getChannelArray(snapshotObject.channels.thresholds, snapshotObject.channels.calibrations),
        mean: getMeanArray(snapshotObject.others.averages),
        gradient: getGradientArray(snapshotObject.others.gradients),
        deviation: getDeviationArray(snapshotObject.others.deviations),
    };
    return officialPXObject;
};