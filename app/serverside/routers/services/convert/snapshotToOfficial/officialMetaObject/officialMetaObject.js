// don't forget to add the devicePx property (1 for P1 and 2 for P2) when exporting
export default function getOfficialMetaObject(snapshotObject) {
    const officialMetaObject = {
        deviceFw: snapshotObject.general.informations.configurationName.firmwareVersion,
        deviceModel: snapshotObject.general.informations.configurationName.deviceType,
    };
    return officialMetaObject;
};