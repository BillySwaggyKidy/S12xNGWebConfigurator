import FormSelect from "../../Inputs/FormSelect.jsx";
import FormShrink from "../../Inputs/FormShrink.jsx";
import FormText from "../../Inputs/FormText.jsx";
import FormActiveBox from "../../Inputs/FormActiveBox.jsx";

// this component represent all of the initials parameters of the fields in a row in the channels infos table
export default function ChannelsInfosRowInitials({valueFields, handleChangeFunction, readOnly}) {

    const arrayUnitType = [
        {value: 0,label: 'undefined'},
        {value: 1,label: 'cylinder'},
        {value: 2,label: 'inlet'},
        {value: 3,label: 'outlet'},
    ];

    const arrayActive = [
        {value: 0, label: 'inactive'},
        {value: 1, label: 'active'},
    ];

    // this array contain all of the fields data like required, the id, his value as a object
    // the id is really important it represent the path to access the data in the object from the db, each new property or index array is separated with a "."
    let arrayChannelInfosRowFields = [
        {id:"isActive", required:true, toggleItems:arrayActive, value:valueFields.isActive, width:65},
        {id:"type", required:true, items:arrayUnitType, value:valueFields.type, width:150},
        {id:"decimal", required:true, value: valueFields.decimal, condition:(value)=>value>=0, width:75},
        {id:"line1", required:true, value: valueFields.line1, condition:"^[ -~]{0,16}$", width:200},
        {id:"line2", required:true, value: valueFields.line2, condition:"^[ -~]{0,16}$", width:200},
    ];

    return [
        arrayChannelInfosRowFields.slice(0,1).map((field)=>
            <FormActiveBox key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
        ),
        arrayChannelInfosRowFields.slice(1,2).map((field)=>
            <FormSelect key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
        ),
        arrayChannelInfosRowFields.slice(2,3).map((field)=>
            <FormShrink key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
        ),
        arrayChannelInfosRowFields.slice(3).map((field)=>
            <FormText key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
        ),
    ].flat();
};