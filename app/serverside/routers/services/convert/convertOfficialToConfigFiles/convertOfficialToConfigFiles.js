

export default function convertOfficialToConfigFiles(admZip, configName, deviceType, officialObj) {
    let filePerPx = ["P1","P2"]; // this array represent all of the existing Px parameter a config can have
    if (deviceType == 129) { // if the deviceType of the configuration is 129 then it only need the P1 parameter
        filePerPx = filePerPx.slice(0,1); // we split the filePerPx array to only keep the P1 element
    }
    filePerPx.forEach((px)=>{ // for each existing Px parameter, we create a new json file
        let newPxOfficialData = JSON.parse(JSON.stringify(officialObj.data, null, "\t")); // we copy all of the officialData object
        let pxFileName = configName;
        if (deviceType == 128) { // if the deviceType of the configuration is 128 then the file name need to include the Px parameter name on it
            pxFileName = pxFileName.split('_'); // we make an array out of the configName string
            pxFileName.splice(2, 0, px); // we insert the Px parameter name in the right place on the array
            pxFileName = pxFileName.join('_'); // we remake the string out of the array 
        }
        pxFileName = pxFileName + ".json"; // we add the json extension at the end of the file
        // next we are selecting some part of the data depending of the Px parameter name
        newPxOfficialData.px.commutationTime = newPxOfficialData.px.commutationTime[px];
        newPxOfficialData.px.channel = newPxOfficialData.px.channel.map((channel)=>{
            return {
                ...channel,
                threshold: channel.threshold[px]
            }
        });
        newPxOfficialData.px.deviation = newPxOfficialData.px.deviation.map((deviation)=>deviation[px]);
        newPxOfficialData.px.gradient = newPxOfficialData.px.gradient.map((gradient)=>gradient[px]);
        newPxOfficialData.px.mean = newPxOfficialData.px.mean.map((mean)=>mean[px]);
        newPxOfficialData.meta.devicePx = +px.substring(1); // we add at the end of the json file a property to indicate the number of the Px parameter

        let jsonContent = JSON.stringify(newPxOfficialData, null, "\t"); // we make a JSON string out of the newPxOfficialData
        // we insert the new config json file in the archive
        admZip.addFile("version_"+officialObj.version+"/"+pxFileName, Buffer.alloc(jsonContent.length, jsonContent), "");
    });

}