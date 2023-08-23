import getOfficialGObject from "./officialGObject/officialGObject";
import getOfficialPXObject from "./officialPXObject/officialPXObject";
import getOfficialMetaObject from "./officialMetaObject/officialMetaObject";


// this function convert a snapshot configuration object to an official configuration object
export default function convertSnapshotConfToOfficial(snapshotObject) {
    const officialConfig = {
        language: snapshotObject.general.informations.parameterConf.language,
        g: getOfficialGObject(snapshotObject),
        px: getOfficialPXObject(snapshotObject),
        meta: getOfficialMetaObject(snapshotObject),
    }

    return officialConfig;
};