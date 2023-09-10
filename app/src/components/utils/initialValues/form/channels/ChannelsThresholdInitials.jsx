import FormShrink from "../../../Inputs/FormShrink.jsx";
import FormSelect from "../../../Inputs/FormSelect.jsx";

const arrayUnitinhGrp = [
    {value: 0,label: 'none'},
    {value: 1,label: 'inh 1'},
    {value: 2,label: 'inh 2'},
    {value: 3,label: 'inh 3'},
    {value: 4,label: 'inh 4'},
];

export function ChannelsThresholdInitialsP1({valueFields, handleChangeFunction, readOnly, hitClip = false}) {

    const arrayUnitType = [
        {value: 0,label: 'NU'},
        {value: 1,label: 'H'},
        {value: 2,label: 'L'},
        {value: 3,label: 'HH'},
        {value: 4,label: 'LL'},
    ];

    // this array contain all of the fields data like required, the id, his value as a object
    // the id is really important it represent the path to access the data in the object from the db, each new property or index array is separated with a "."
    let arrayChannelsThresholdRowFieldsP1 = [
        {id:"p1Parameters.threshold1.type", required:true, items:arrayUnitType, value: valueFields?.p1Parameters.threshold1.type, width:80},
        {id:"p1Parameters.threshold1.value", required:true, value: valueFields?.p1Parameters.threshold1.value, condition:(value)=>value>=-Number.MAX_VALUE, width:90},
        {id:"p1Parameters.threshold1.time", required:true, value: valueFields?.p1Parameters.threshold1.time, condition:(value)=>value>=0 && value<=3600, width:90},
        {id:"p1Parameters.threshold1.inhGrp", required:true, items:arrayUnitinhGrp, value: valueFields?.p1Parameters.threshold1.inhGrp, width:100},
        {id:"p1Parameters.threshold1.relayGrp", required:true, value: valueFields?.p1Parameters.threshold1.relayGrp, condition:(value)=>value>=0&&value<=6, width:75},
        {id:"p1Parameters.threshold2.type", required:true, items:arrayUnitType, value: valueFields?.p1Parameters.threshold2.type, width:80},
        {id:"p1Parameters.threshold2.value", required:true, value: valueFields?.p1Parameters.threshold2.value, condition:(value)=>value>=-Number.MAX_VALUE, width:90},
        {id:"p1Parameters.threshold2.time", required:true, value: valueFields?.p1Parameters.threshold2.time, condition:(value)=>value>=0 && value<=3600, width:90},
        {id:"p1Parameters.threshold2.inhGrp", required:true, items:arrayUnitinhGrp, value: valueFields?.p1Parameters.threshold2.inhGrp, width:100},
        {id:"p1Parameters.threshold2.relayGrp", required:true, value: valueFields?.p1Parameters.threshold2.relayGrp, condition:(value)=>value>=0&&value<=6, width:75},
    ];


    return Array(2).fill(null).map((value, index)=>{
        const arrayChannels = arrayChannelsThresholdRowFieldsP1.slice(5*index,5*(index+1));
        return [
            arrayChannels.slice(0,1).map((field)=>
                <FormSelect key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table" hitClip={hitClip}/>
            ),
            arrayChannels.slice(1,3).map((field)=>
                <FormShrink key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table" hitClip={hitClip}/>
            ),
            arrayChannels.slice(3,4).map((field)=>
                <FormSelect key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table" hitClip={hitClip}/>
            ),
            arrayChannels.slice(4).map((field)=>
                <FormShrink key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table" hitClip={hitClip}/>
            ),
        ].flat();
    }).flat();
};

export function ChannelsThresholdInitialsP2({valueFields, handleChangeFunction, readOnly, hitClip = false}) {

    const arrayUnitType = [
        {value: 0,label: 'NU'},
        {value: 1,label: 'H'},
        {value: 2,label: 'L'},
        {value: 3,label: 'HH'},
        {value: 4,label: 'LL'},
    ];

    // this array contain all of the fields data like required, the id, his value as a object
    // the id is really important it represent the path to access the data in the object from the db, each new property or index array is separated with a "."
    let arrayChannelsThresholdRowFieldsP2 = [
        {id:"p2Parameters.threshold1.type", required:true, items:arrayUnitType, value: valueFields?.p2Parameters.threshold1.type, width:80},
        {id:"p2Parameters.threshold1.value", required:true, value: valueFields?.p2Parameters.threshold1.value, condition:(value)=>value>=-Number.MAX_VALUE, width:90},
        {id:"p2Parameters.threshold1.time", required:true, value: valueFields?.p2Parameters.threshold1.time, condition:(value)=>value>=0 && value<=3600, width:90},
        {id:"p2Parameters.threshold1.inhGrp", required:true, items:arrayUnitinhGrp, value: valueFields?.p2Parameters.threshold1.inhGrp, width:100},
        {id:"p2Parameters.threshold1.relayGrp", required:true, value: valueFields?.p2Parameters.threshold1.relayGrp, condition:(value)=>value>=0&&value<=6, width:90},
        {id:"p2Parameters.threshold2.type", required:true, items:arrayUnitType, value: valueFields?.p2Parameters.threshold2.type, width:75},
        {id:"p2Parameters.threshold2.value", required:true, value: valueFields?.p2Parameters.threshold2.value, condition:(value)=>value>=-Number.MAX_VALUE, width:90},
        {id:"p2Parameters.threshold2.time", required:true, value: valueFields?.p2Parameters.threshold2.time, condition:(value)=>value>=0 && value<=3600, width:90},
        {id:"p2Parameters.threshold2.inhGrp", required:true, items:arrayUnitinhGrp, value: valueFields?.p2Parameters.threshold2.inhGrp, width:100},
        {id:"p2Parameters.threshold2.relayGrp", required:true, value: valueFields?.p2Parameters.threshold2.relayGrp, condition:(value)=>value>=0&&value<=6,width:75},
    ];


    return Array(2).fill(null).map((value, index)=>{
        const arrayChannels = arrayChannelsThresholdRowFieldsP2.slice(5*index,5*(index+1));
        return [
            arrayChannels.slice(0,1).map((field)=>
                <FormSelect key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table" hitClip={hitClip}/>
            ),
            arrayChannels.slice(1,3).map((field)=>
                <FormShrink key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table" hitClip={hitClip}/>
            ),
            arrayChannels.slice(3,4).map((field)=>
                <FormSelect key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table" hitClip={hitClip}/>
            ),
            arrayChannels.slice(4).map((field)=>
                <FormShrink key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table" hitClip={hitClip}/>
            ),
        ].flat();
    }).flat();
};