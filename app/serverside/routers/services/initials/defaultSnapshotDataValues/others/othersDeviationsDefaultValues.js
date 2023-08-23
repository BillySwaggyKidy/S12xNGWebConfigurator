// this file represent all of the default values of the deviations when creating a new configuration

let deviationDefaultValues = {
    p1Parameters: {
        lowAverage: 1200,
        fullScale: 1800,
        fullScaleValue: 1050,
        halfScaleValue: 1050,
        inhGrp: 0,
        relayGrp: 2,
        time: 1000
    },
    p2Parameters: {
        lowAverage: 0,
        fullScale: 0,
        fullScaleValue: 0,
        halfScaleValue: 0,
        inhGrp: 0,
        relayGrp: 0,
        time: 0
    },
    isActive: false,
    isValid: false,
};


export const othersDeviationsDefaultValues = {
    deviationsList: Array(4).fill(deviationDefaultValues),
    isValid: false,
};

// this function set the values of the othersDeviations section of the config using data from the Px files
export const setOthersDeviationsValues = (confCommonData, confPxData) => {
    const confCommonDeviationData = confCommonData.g.deviation;
    let othersDeviationsValues = {
        deviationsList: confCommonDeviationData.map((deviation,index)=>{
            const offset = 1000;
            const deviationIndex = index;
            let deviationObject = {...deviationDefaultValues, ...deviation};
            confPxData.forEach((pxData, index)=>{
                const pxDeviationData = pxData.px.deviation[deviationIndex];
                let pxPropertyName = `p${index+1}Parameters`;
                deviationObject[pxPropertyName] = {
                    lowAverage: pxDeviationData.lowAverage - offset,
                    fullScale: pxDeviationData.fullScale - offset,
                    fullScaleValue: pxDeviationData.fullScaleValue - offset,
                    halfScaleValue: pxDeviationData.halfScaleValue - offset,
                    inhGrp: pxDeviationData.threshold.inhibGroup,
                    relayGrp: pxDeviationData.threshold.relayGroup,
                    time: pxDeviationData.threshold.time - offset
                };
            });
            return deviationObject;
        }),
        isValid: false
    };

    //console.log(othersDeviationsValues)
    return othersDeviationsValues;
};