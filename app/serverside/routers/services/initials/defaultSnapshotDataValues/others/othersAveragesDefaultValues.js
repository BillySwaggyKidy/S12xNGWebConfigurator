// this file represent all of the default values of the averages when creating a new configuration

let averageDefaultValues = {
    isValid: false,
    isActive: false,
    decimal: 1,
    line1: "",
    line2: "",
    cardChannelsActivation: Array(32).fill(0),
    p1Parameters: {
        type: 1,
        value: 1520,
        time: 1000,
        inhGrp: 0,
        relayGrp: 2
    },
    p2Parameters: {
        type: 0,
        value: 0,
        time: 0,
        inhGrp: 0,
        relayGrp: 0
    },
};

export const othersAveragesDefaultValues = {
    averagesList: Array(4).fill(averageDefaultValues),
    isValid: false
};

// this function set the values of the othersAverages section of the config using data from the Px files
export const setOthersAveragesValues = (confCommonData, confPxData) => {
    const confCommonMeanData = confCommonData.g.mean;
    const confCommonAverageTextData =  confCommonData.g.text.slice(-4);
    let othersAveragesValues = {
        averagesList: confCommonMeanData.map((average,index)=>{
            const offset = 1000;
            const averageIndex = index;
            let averageObject = {
                ...averageDefaultValues,
                isActive: average.isActive,
                line1: confCommonAverageTextData[averageIndex].line[0],
                line2: confCommonAverageTextData[averageIndex].line[1],
                decimal: average.decimal,
                cardChannelsActivation: average.isActiveForChannel, 
            };
            confPxData.forEach((pxData, index)=>{
                const pxAverageData = pxData.px.mean[averageIndex].threshold;
                let pxPropertyName = `p${index+1}Parameters`;
                averageObject[pxPropertyName] = {
                    type: pxAverageData.type,
                    value: pxAverageData.value - offset,
                    time: pxAverageData.time - offset,
                    inhGrp: pxAverageData.inhibGroup,
                    relayGrp: pxAverageData.relayGroup
                };
            });
            return averageObject;
        }),
        isValid: false
    };

    //console.log(othersAveragesValues)
    return othersAveragesValues;
};