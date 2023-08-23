import FormSelect from "../../Inputs/FormSelect.jsx";
import FormShrink from "../../Inputs/FormShrink.jsx";

// this component represent all of the initials parameters of the fields in a row in the Card and comppensations table
export default function GeneralCardCompensationsInitials({valueFields, handleChangeFunction, readOnly}) {

    const arrayUnitType = [
        {value: 0, label: 'no card'},
        {value: 1, label: 'thermocouple K'},
        {value: 11, label: 'thermocouple J'},
        {value: 2, label: 'mA'},
        {value: 3, label: 'PT100'},
    ];

    const arrayUnitUnit = [
        {value: 0, label: 'no unit'},
        {value: 1, label: 'celcius degree'},
        {value: 2, label: 'fahrenheit degree'},
        {value: 3, label: 'mA'},
    ];

    const arrayUnitCompensation = [
        {value: 0, label: 'none'},
        {value: 1, label: 'card 1'},
        {value: 2, label: 'card 2'},
        {value: 3, label: 'card 3'},
        {value: 4, label: 'card 4'},
    ];

    // this array contain all of the fields data like required, the id, his value as a object
    // the id is really important it represent the path to access the data in the object from the db, each new property or index array is separated with a "."
    let arrayGeneralCardCompensationsRowFields = [
        {id:"type", required:true, items:arrayUnitType, value: valueFields.type, width:180},
        {id:"unit", required:true, items:arrayUnitUnit, value: valueFields.unit, width:180},
        {id:"hysteresis", required:true, value: valueFields.hysteresis, condition:(value)=>value>=0&&value<=100, width:80},
        {id:"compensation", required:true, items:arrayUnitCompensation, value: valueFields.compensation, width:110},
    ];

    return [
        arrayGeneralCardCompensationsRowFields.slice(0,2).map((field)=>
            <FormSelect key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
        ),
        arrayGeneralCardCompensationsRowFields.slice(2,3).map((field)=>
            <FormShrink key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
        ),
        arrayGeneralCardCompensationsRowFields.slice(3).map((field)=>
            <FormSelect key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
        ),
    ].flat();

};