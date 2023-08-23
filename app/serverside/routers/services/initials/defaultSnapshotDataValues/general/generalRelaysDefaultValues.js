// this file represent all of the default values of the general relays when creating a new configuration

export const generalRelaysDefaultValues = {
    configuration: {
        relay1: 1,
        relay2: 1,
        relay3: 1,
        relay4: 1,
        relay5: 1,
        relay6: 1,
        relayKlaxon: 1,
        isValid: false
    },
    group: {
        groupMode: 1,
        klaxonMode: 1,
        groupFault: 1,
        groupInsulationFault: 1,
        isValid: false
    },
    isValid: false
};

// this function set the values of the generalRelays section of the config using data from the Px files
export const setGeneralRelaysValues = (confCommonData) => {
    const confCommonRelaysData = confCommonData.g.relay;
    let generalRelaysValues = generalRelaysDefaultValues;
    const confRelaysKeys = Object.keys(generalRelaysValues.configuration).filter((key)=>key != "isValid");
    confRelaysKeys.forEach((relay, index)=>{
        generalRelaysValues.configuration[relay] = confCommonRelaysData.state[index];
    });
    generalRelaysValues.group = {
        groupMode: confCommonRelaysData.groupMode,
        klaxonMode: confCommonRelaysData.klaxonMode,
        groupFault: confCommonRelaysData.groupFault,
        groupInsulationFault: confCommonRelaysData.groupInsulationFault,
        isValid: false
    };

    //console.log(generalRelaysValues);
    return generalRelaysValues;
};