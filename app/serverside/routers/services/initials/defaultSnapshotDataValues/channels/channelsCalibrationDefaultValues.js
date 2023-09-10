// this file represent all of the default values of the channels Calibration when creating a new configuration

let channelsCalibrationRowsDatas = {
    detOffset: 1000,
    gain: 2000,
    offset: 1000,
    smooth: 1000,
    isValid: false,
};

export const channelsCalibrationDefaultValues = {
    cardChannelsCalibration: Array(32).fill(channelsCalibrationRowsDatas),
    isValid: false,
};

// this function set the values of the channelsCalibration section of the config using data from the Px files
export const setChannelsCalibrationValues = (confCommonData) => {
    const confCommonChannelData = confCommonData.px.channel;
    let channelsCalibrationValues = {
        cardChannelsCalibration: confCommonChannelData.map((channel)=>{
            const offset = 1000;
            let channelCalibration = {
                ...channelsCalibrationRowsDatas, 
                detOffset: channel.detOffset - offset,
                gain: channel.gain - offset,
                offset: channel.offset - offset,
                smooth: channel.smooth - offset, 
            };
            return channelCalibration;
        }),
        isValid: false,
    }

    //console.log(channelsCalibrationValues)
    return channelsCalibrationValues;
};