// this file represent all of the default values of the channels threshold when creating a new configuration

let channelsThresholdRowsDatas = {
    p1Parameters : {
        threshold1: {
            type: 1,
            value: 1550,
            time: 1000,
            inhGrp: 0,
            relayGrp: 2
        },
        threshold2: {
            type: 0,
            value: 1900,
            time: 1000,
            inhGrp: 0,
            relayGrp: 4
        },
    },
    p2Parameters : {
        threshold1: {
            type: 0,
            value: 0,
            time: 0,
            inhGrp: 0,
            relayGrp: 0
        },
        threshold2: {
            type: 0,
            value: 0,
            time: 0,
            inhGrp: 0,
            relayGrp: 0
        },
    },
    isValid: false,
};

export const channelsThresholdDefaultValues = {
    cardChannelsThreshold: Array(32).fill(channelsThresholdRowsDatas),
    isValid: false,
};

// this function set the values of the channelsThreshold section of the config using data from the Px files
export const setChannelsThresholdValues = (confCommonData, confPxData) => {
    const confCommonChannelData = confCommonData.px.channel;
    let channelsThresholdValues = {
        cardChannelsThreshold: confCommonChannelData.map((channel, index)=>{
            const offset = 1000;
            const channelIndex = index;
            let channelThreshold = {
                ...channelsThresholdRowsDatas,
            };
            confPxData.forEach((pxData, index)=>{
                const pxChannelData = pxData.px.channel[channelIndex].threshold;
                let pxPropertyName = `p${index+1}Parameters`;
                channelThreshold[pxPropertyName] = {
                    threshold1: {
                        ...pxChannelData[0],
                        value: pxChannelData[0].value - offset,
                        time: pxChannelData[0].time - offset,
                    },
                    threshold2: {
                        ...pxChannelData[1],
                        value: pxChannelData[1].value - offset,
                        time: pxChannelData[1].time - offset,
                    },
                };
            });
            return channelThreshold;
        }),
        isValid: false,
    }

    //console.log(channelsThresholdValues)
    return channelsThresholdValues;
};