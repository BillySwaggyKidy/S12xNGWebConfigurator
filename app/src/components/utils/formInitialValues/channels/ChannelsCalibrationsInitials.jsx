import FormShrink from "../../Inputs/FormShrink.jsx";

// this component represent all of the initials parameters of the fields in a row in the channels Calibration table
export function ChannelsCalibrationsInitialsData({valueFields, handleChangeFunction, readOnly}) {

    // this array contain all of the fields data like required, the id, his value as a object
    // the id is really important it represent the path to access the data in the object from the db, each new property or index array is separated with a "."
    let arrayChannelCalibrationsRowFields = [
        {id:"detOffset", required:true, value: valueFields.detOffset, condition:(value)=>value>=-Number.MAX_VALUE, width:90},
        {id:"gain", required:true, value: valueFields.gain, condition:(value)=>value>=-Number.MAX_VALUE, width:90},
        {id:"offset", required:true, value: valueFields.offset, condition:(value)=>value>=-Number.MAX_VALUE, width:90},
        {id:"smooth", required:true, value: valueFields.smooth, condition:(value)=>value>=-Number.MAX_VALUE, width:90},
    ];

    return [
        arrayChannelCalibrationsRowFields.map((field)=>
            <FormShrink key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
        )
    ].flat();
};