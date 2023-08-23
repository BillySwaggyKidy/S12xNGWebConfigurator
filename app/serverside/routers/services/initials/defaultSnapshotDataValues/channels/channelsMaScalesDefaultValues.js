// this file represent all of the default values of the channels ma scales when creating a new configuration

let channelMascale = {
    lowScale: null,
    highScale: null,
    isValid: false
};

export const channelsMaScalesDefaultValues = {
    cardChannelsMascale: Array(32).fill(channelMascale),
    isValid: false
};

// this function set the values of the channelsMaScales section of the config using data from the Px files
export const setChannelsMaScalesValues = (confCommonData) => {
    const confCommonMaScalesData = confCommonData.g.mAScaleValues;
    let channelsMaScalesValues = {
        cardChannelsMascale: Array(32).fill(null).map((maScale, index)=>{
            return {
                lowScale: confCommonMaScalesData.lowerScale[index],
                highScale: confCommonMaScalesData.upperScale[index],
                isValid: false
            }
        }),
        isValid: false
    };

    //console.log(channelsMaScalesValues)
    return channelsMaScalesValues;
};