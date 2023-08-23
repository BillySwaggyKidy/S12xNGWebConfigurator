import FormActiveBox from "../../Inputs/FormActiveBox.jsx";
import FormSelect from '../../Inputs/FormSelect.jsx';
import FormShrink from "../../Inputs/FormShrink.jsx";

const arrayUnitinhGrp = [
    {value: 0,label: 'none'},
    {value: 1,label: 'inh 1'},
    {value: 2,label: 'inh 2'},
    {value: 3,label: 'inh 3'},
    {value: 4,label: 'inh 4'},
];

// this component represent all of the initials parameters of the fields in a row in the deviations table
export function OthersDeviationsInitialsActive({valueFields, handleChangeFunction, readOnly}) {
    const arrayActive = [
        {value: 0, label: 'inactive'},
        {value: 1, label: 'active'},
    ];
    
    // this array contain all of the fields data like required, the id, his value as a object
    // the id is really important it represent the path to access the data in the object from the db, each new property or index array is separated with a "."
    let arrayOthersDeviationsInitialsRowFieldsP1 = [
        {id:"isActive", required:true, toggleItems:arrayActive, value:valueFields.isActive, width:85},
    ];

    return [
        arrayOthersDeviationsInitialsRowFieldsP1.map((field)=>
            <FormActiveBox key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
        ),
    ].flat();
};

// this component represent all of the initials parameters of the fields in a row in the deviations table
export function OthersDeviationsInitialsP1({valueFields, handleChangeFunction, readOnly}) {
    
    // this array contain all of the fields data like required, the id, his value as a object
    // the id is really important it represent the path to access the data in the object from the db, each new property or index array is separated with a "."
    let arrayOthersDeviationsInitialsRowFieldsP1 = [
        {id:"p1Parameters.lowAverage", required:true, value: valueFields?.p1Parameters.lowAverage, condition:(value)=>value>=-Number.MAX_VALUE, width:92},
        {id:"p1Parameters.fullScale", required:true, value: valueFields?.p1Parameters.fullScale, condition:(value)=>value>=-Number.MAX_VALUE, width:90},
        {id:"p1Parameters.fullScaleValue", required:true, value: valueFields?.p1Parameters.fullScaleValue, condition:(value)=>value>=-Number.MAX_VALUE, width:118},
        {id:"p1Parameters.halfScaleValue", required:true, value: valueFields?.p1Parameters.halfScaleValue, condition:(value)=>value>=-Number.MAX_VALUE, width:120},
        {id:"p1Parameters.inhGrp", required:true, items:arrayUnitinhGrp, value: valueFields?.p1Parameters.inhGrp, width:100},
        {id:"p1Parameters.relayGrp", required:true, value: valueFields?.p1Parameters.relayGrp, condition:(value)=>value>=0&&value<=6, width:90},
        {id:"p1Parameters.time", required:true, value: valueFields?.p1Parameters.time, condition:(value)=>value>=0&&value<=3600, width:90},
    ];

    return [
        arrayOthersDeviationsInitialsRowFieldsP1.slice(0,4).map((field)=>
            <FormShrink key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
        ),
        arrayOthersDeviationsInitialsRowFieldsP1.slice(4,5).map((field)=>
            <FormSelect key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
        ),
        arrayOthersDeviationsInitialsRowFieldsP1.slice(5).map((field)=>
            <FormShrink key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
        ),
    ].flat();
};

export function OthersDeviationsInitialsP2({valueFields, handleChangeFunction, readOnly}) {
    
    // this array contain all of the fields data like required, the id, his value as a object
    // the id is really important it represent the path to access the data in the object from the db, each new property or index array is separated with a "."
    let arrayOthersDeviationsInitialsRowFieldsP2 = [
        {id:"p2Parameters.lowAverage", required:true, value: valueFields?.p2Parameters.lowAverage, condition:(value)=>value>=-Number.MAX_VALUE, width:92},
        {id:"p2Parameters.fullScale", required:true, value: valueFields?.p2Parameters.fullScale, condition:(value)=>value>=-Number.MAX_VALUE, width:90},
        {id:"p2Parameters.fullScaleValue", required:true, value: valueFields?.p2Parameters.fullScaleValue, condition:(value)=>value>=-Number.MAX_VALUE, width:118},
        {id:"p2Parameters.halfScaleValue", required:true, value: valueFields?.p2Parameters.halfScaleValue, condition:(value)=>value>=-Number.MAX_VALUE, width:120},
        {id:"p2Parameters.inhGrp", required:true, items:arrayUnitinhGrp, value: valueFields?.p2Parameters.inhGrp, width:100},
        {id:"p2Parameters.relayGrp", required:true, value: valueFields?.p2Parameters.relayGrp, condition:(value)=>value>=0&&value<=6, width:90},
        {id:"p2Parameters.time", required:true, value: valueFields?.p2Parameters.time, condition:(value)=>value>=0&&value<=3600, width:90},
    ];

    return [
        arrayOthersDeviationsInitialsRowFieldsP2.slice(0,4).map((field)=>
            <FormShrink key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
        ),
        arrayOthersDeviationsInitialsRowFieldsP2.slice(4,5).map((field)=>
            <FormSelect key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
        ),
        arrayOthersDeviationsInitialsRowFieldsP2.slice(5).map((field)=>
            <FormShrink key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
        ),
    ].flat();
};