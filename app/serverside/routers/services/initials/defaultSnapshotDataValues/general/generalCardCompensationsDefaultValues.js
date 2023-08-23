// this file represent all of the default values of the general card compensations when creating a new configuration

export const generalCardCompensationsDefaultValues = {
    card: Array(4).fill({
        type: 1,
        unit: 1,
        hysteresis: 10,
        compensation: 0,
        isValid: false
    }),
    sensorNb: 0,
    isValid: false
};

// this function set the values of the generalCardAndCompensations section of the config using data from the Px files
export const setGeneralCardCompensationsValues = (confCommonData) => {
    const confCommonCardData = confCommonData.g.card;
    const confCommonCompensationData = confCommonData.g.compensation;
    let generalCardCompensationsValues = generalCardCompensationsDefaultValues;
    generalCardCompensationsValues.card = confCommonCardData.map((card,index)=>{
        return {
            type: card.type,
            unit: card.unit,
            hysteresis: card.hysteresis,
            compensation: confCommonCompensationData.sensorCard[index],
            isValid: false
        };
    });
    generalCardCompensationsValues.sensorNb = confCommonCompensationData.sensorNb;

    //console.log(generalCardCompensationsValues)
    return generalCardCompensationsValues;
};