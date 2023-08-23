const getRelaysObject = (relays) => {
    const relayConfig = relays.configuration;
    const relaysObject = {
        groupMode: relays.group.groupMode,
        klaxonMode: relays.group.klaxonMode,
        groupFault: relays.group.groupFault,
        groupInsulationFault: relays.group.groupInsulationFault,
        state: Object.keys(relayConfig).filter((key)=>key != "isValid").map((key)=>relayConfig[key])
    };
    // console.log("G relays obj: ");
    // console.log(relaysObject);
    return relaysObject;
};

const getCardArray = (cardsAndCompensation) => {
    const cardArray = cardsAndCompensation.card.map((card)=>{
        return {
            type: card.type,
            unit: card.unit,
            hysteresis: card.hysteresis
        };
    });
    // console.log("G card obj: ");
    // console.log(cardArray);
    return cardArray;
};

const getChannelArray = (channels) => {
    const channelArray = channels.cardChannelsInfo.map((channelInfo)=>{
        return {
            type: channelInfo.type,
            isActive: channelInfo.isActive,
            decimal: channelInfo.decimal
        };
    });
    // console.log("G channel obj: ");
    // console.log(channelArray);
    return channelArray;
};

const getMeanArray = (averages) => {
    const meanArray = averages.averagesList.map((average)=>{
        return {
            isActive: average.isActive,
            decimal: average.decimal,
            isActiveForChannel: average.cardChannelsActivation
        };
    });
    // console.log("G mean obj: ");
    // console.log(meanArray);
    return meanArray;
};

const getGradientArray = (gradients) => {
    const gradientArray = gradients.gradientsList.map((gradient)=>{
        return {
            isActive: gradient.isActive,
            decimal: gradient.decimal,
            isActiveForChannel: gradient.cardChannelsActivation
        };
    });
    // console.log("G gradient obj: ");
    // console.log(gradientArray);
    return gradientArray;
};

const getDeviationArray = (deviations) => {
    const deviationArray = deviations.deviationsList.map((deviation)=>{
        return {
            isActive: deviation.isActive,
        };
    });
    // console.log("G deviation obj: ");
    // console.log(deviationArray);
    return deviationArray;
};

const getCompensationObject = (cardsAndCompensations) => {
    const compensationObject = {
        sensorNb: cardsAndCompensations.sensorNb,
        sensorCard: cardsAndCompensations.card.map((card)=>card.compensation)
    };
    // console.log("G compensation obj: ");
    // console.log(compensationObject);
    return compensationObject;
};

const getTextArray = (channels, averages) => {
    const textChannels = channels.cardChannelsInfo.map((channelInfo)=>{
        return {
            line: [
                channelInfo.line1,
                channelInfo.line2
            ]
        };
    });
    const textAverages = averages.averagesList.map((averageInfo)=>{
        return {
            line: [
                averageInfo.line1,
                averageInfo.line2
            ]
        };
    });
    const textArray = [...textChannels, ...textAverages];
    // console.log("G text obj: ");
    // console.log(textArray);
    return textArray;
};

const getSoftObject = (generalInfo) => {
    const softObject = {
        accessCode: +(generalInfo.parameterConf.accessCode)
    };
    // console.log("G soft obj: ");
    // console.log(softObject);
    return softObject;
};

const getMaScaleValuesObject = (maScalesValues) => {
    const maScaleValuesObject = {
        lowerScale: maScalesValues.cardChannelsMascale.map((channelMascale)=>channelMascale.lowScale),
        upperScale: maScalesValues.cardChannelsMascale.map((channelMascale)=>channelMascale.highScale)
    };
    // console.log("G ma scale obj: ");
    // console.log(maScaleValuesObject);
    return maScaleValuesObject;
};

export default function getOfficialGObject(snapshotObject) {
    const officialGObject = {
        relay: getRelaysObject(snapshotObject.general.relays),
        card: getCardArray(snapshotObject.general.cardsAndCompensations),
        channel: getChannelArray(snapshotObject.channels.informations),
        mean: getMeanArray(snapshotObject.others.averages),
        gradient: getGradientArray(snapshotObject.others.gradients),
        deviation: getDeviationArray(snapshotObject.others.deviations),
        compensation: getCompensationObject(snapshotObject.general.cardsAndCompensations),
        text: getTextArray(snapshotObject.channels.informations, snapshotObject.others.averages),
        soft: getSoftObject(snapshotObject.general.informations),
        mAScaleValues: getMaScaleValuesObject(snapshotObject.channels.maScales)
    };
    return officialGObject;
};