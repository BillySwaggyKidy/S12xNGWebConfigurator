// this file represent all of the default values of the gradients when creating a new configuration

let gradientDefaultValues = {
    isValid: false,
    isActive: false,
    decimal: 1,
    cardChannelsActivation: Array(32).fill(0),
    p1Parameters: {
        type: 1,
        value: 1005,
        time: 1000,
        inhGrp: 0,
        relayGrp: 0
    },
    p2Parameters: {
        type: 0,
        value: 0,
        time: 0,
        inhGrp: 0,
        relayGrp: 0
    },
};

export const othersGradientsDefaultValues = {
    gradientsList: Array(4).fill(gradientDefaultValues),
    isValid: false
};

// this function set the values of the othersGradients section of the config using data from the Px files
export const setOthersGradientsValues = (confCommonData, confPxData) => {
    const confCommonGradientData = confCommonData.g.gradient;
    let othersgradientsValues = {
        gradientsList: confCommonGradientData.map((gradient,index)=>{
            const offset = 1000;
            const gradientIndex = index;
            let gradientObject = {
                ...gradientDefaultValues,
                isActive: gradient.isActive,
                decimal: gradient.decimal,
                cardChannelsActivation: gradient.isActiveForChannel,
            };
            confPxData.forEach((pxData, index)=>{
                const pxGradientData = pxData.px.gradient[gradientIndex].threshold;
                let pxPropertyName = `p${index+1}Parameters`;
                gradientObject[pxPropertyName] = {
                    type: pxGradientData.type,
                    value: pxGradientData.value - offset,
                    time: pxGradientData.time - offset,
                    inhGrp: pxGradientData.inhibGroup,
                    relayGrp: pxGradientData.relayGroup
                };
            });
            return gradientObject;
        }),
        isValid: false
    };

    //console.log(othersgradientsValues)
    return othersgradientsValues;
};