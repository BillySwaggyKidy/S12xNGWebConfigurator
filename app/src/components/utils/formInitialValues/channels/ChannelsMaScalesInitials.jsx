import FormShrink from "../../Inputs/FormShrink.jsx";

// this component represent all of the initials parameters of the fields in a row in the channels maScales table
export default function ChannelsMaScalesInitials({valueFields, handleChangeFunction, readOnly}) {

    // this array contain all of the fields data like required, the id, his value as a object
    // the id is really important it represent the path to access the data in the object from the db, each new property or index array is separated with a "."
    let arrayChannelMaScalesRowFields = [
        {id:"lowScale", required:true, value: valueFields.lowScale, condition:(value)=>(value>=-999&&value<=9999&&value<=valueFields.highScale), width:85},
        {id:"highScale", required:true, value: valueFields.highScale, condition:(value)=>(value>=-999&&value<=9999&&value>=valueFields.lowScale), width:85},
    ];

    return [
        arrayChannelMaScalesRowFields.map((field)=>
            <FormShrink key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
        ),
    ].flat();
};