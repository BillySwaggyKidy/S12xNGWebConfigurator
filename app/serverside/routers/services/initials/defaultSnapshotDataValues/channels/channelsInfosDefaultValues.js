// this file represent all of the default values of the channels infos when creating a new configuration

let channelInfo = {
    type: 0,
    decimal: 0,
    line1: "",
    line2: "",
    isActive: true,
    isValid: false
};

export const channelsInfosDefaultValues = {
    cardChannelsInfo: Array(32).fill(channelInfo),
    isValid: false,
};

// this function set the values of the channelsInfos section of the config using data from the Px files
export const setChannelsInfosValues = (confCommonData) => {
    const confCommonChannelData =  confCommonData.g.channel;
    const confCommonTextData =  confCommonData.g.text;
    let channelsInfosValues = {
        cardChannelsInfo: confCommonChannelData.map((channel, index)=>{
            return {
                type: channel.type == -1 ? 0 : channel.type,
                decimal: channel.decimal,
                line1: confCommonTextData[index].line[0],
                line2: confCommonTextData[index].line[1],
                isActive: channel.isActive,
                isValid: false
            };
        }),
        isValid: false
    };

    return channelsInfosValues;
};