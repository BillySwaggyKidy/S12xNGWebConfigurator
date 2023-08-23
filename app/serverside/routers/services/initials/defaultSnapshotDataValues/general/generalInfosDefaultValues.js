// this file represent all of the default values of the general infos when creating a new configuration
export const generalInfosDefaultValues = {
    configurationName:{
        deviceType: 128,
        firmwareVersion: 890,
        affairNumber: "",
        ofNumber: "",
        suffixCode: "",
        isValid: false
    },
    parameterConf:{
        language: 1,
        accessCode: "0000",
        versionSoft: "",
        versionConf: "",
        commCardType: 0,
        P1ToP2: 5,
        P2ToP1: 5,
        isValid: false,
    },
    RS485: {
        parity: 1,
        speed: 19200,
        isValid: false
    },
    ethernetRJ45: {
        ipAddress: "",
        netmask: "",
        gateWay: "",
        isValid: false
    },
    isValid: false
};

// this function set the values of the generalInfos section of the config using data from the Px files
export const setGeneralInfosValues = (confName, confCommonData, confPxData) => {
    let confNameSplit = confName.split('_');
    let generalInfosValues = generalInfosDefaultValues;
    generalInfosValues.configurationName = {
        deviceType: confCommonData.meta.deviceModel,
        firmwareVersion: confCommonData.meta.deviceFw.toString(), // we convert the number value to a string
        affairNumber: confNameSplit[2],
        ofNumber: confNameSplit[3],
        suffixCode: confNameSplit[4],
        isValid: false
    };
    generalInfosValues.parameterConf = {
        language: confCommonData.language,
        accessCode: confCommonData.g.soft.accessCode.toString(), // we convert the number value to a string
        versionSoft: "",
        versionConf: "",
        commCardType: 0,
        P1ToP2: confPxData[0].px.commutationTime,
        P2ToP1: confPxData.length > 1 ? confPxData[1].px.commutationTime : confPxData[0].px.commutationTime,
        isValid: false,
    };

    //console.log(generalInfosValues);
    return generalInfosValues;
};