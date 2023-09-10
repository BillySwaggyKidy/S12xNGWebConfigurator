import FormActiveBox from '../../../Inputs/FormActiveBox.jsx';
import FormSelect from '../../../Inputs/FormSelect.jsx';
import FormShrink from '../../../Inputs/FormShrink.jsx';
import FormText from '../../../Inputs/FormText.jsx';

// this component represent all of the initials parameters of the fields in the general infos names box section
export function GeneralInfosInitialsName({valueFields, handleChangeFunction, readOnly}) {

    const arrayUnitDeviceType = [
        {value: 128, label: 'S128'},
        {value: 129, label: 'S129'},
    ];

    // this array contain all of the fields data like required, the id, his value as a object
    // the id is really important it represent the path to access the data in the object from the db, each new property or index array is separated with a "."
    let arrayGeneralInfosNameRowFields = [
        {id:"deviceType", label:"Device Type", required:true, items:arrayUnitDeviceType, value: valueFields.deviceType},
        {id:"firmwareVersion", label:"Firmware version", required:true, value: valueFields.firmwareVersion, condition:(value)=>value>=-Number.MAX_VALUE},
        {id:"affairNumber", label:"Affair number", required:true, value: valueFields.affairNumber, condition:'[a-zA-Z-_0-9]+'},
        {id:"ofNumber", label:"OF number", required:true, value: valueFields.ofNumber, condition:'[a-zA-Z-_0-9]+'},
        {id:"suffixCode", label:"Suffix code", required:true, value: valueFields.suffixCode, condition:'[a-zA-Z-_0-9]+', readOnly:true},
    ];

    return(
        <div className="grid grid-cols-2 grid-rows-3 gap-4">
            {
                arrayGeneralInfosNameRowFields.slice(0,1).map((field)=>
                    <FormSelect key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction}/>
                )
            }
            {
                arrayGeneralInfosNameRowFields.slice(1,2).map((field)=>
                    <FormShrink key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction}/>
                )
            }
            {
                arrayGeneralInfosNameRowFields.slice(2,4).map((field)=>
                    <FormText key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction}/>
                )
            }
            {
                arrayGeneralInfosNameRowFields.slice(4).map((field)=>
                    <FormText key={field.id} {...field} onChange={handleChangeFunction}/>
                )
            }
        </div>
    );
};

// this component represent all of the initials parameters of the fields in the general infos Conf box section
export function GeneralInfosInitialsConf({valueFields, handleChangeFunction, readOnly}) {
    
    const colorVariantLanguage = {
        blue: "bg-blue-500",
        orange: "bg-orange-500"
    };
    const arrayUnitLanguage = [
        {value: 0, label: 'french'},
        {value: 1, label: 'english'},
    ]
    const arrayUnitCommCardType = [
        {value: 0, label: 'RS485'},
        {value: 1, label: 'Ethernet'},
        {value: 2, label: 'none'},
    ];

    // this array contain all of the fields data like required, the id, his value as a object
// the id is really important it represent the path to access the data in the object from the db, each new property or index array is separated with a "."
    let arrayGeneralInfosConfRowFields = [
        {id:"language", label:"Language", required:true, colorVariantObject:colorVariantLanguage, toggleItems:arrayUnitLanguage, value: valueFields.language},
        {id:"accessCode", label:"Access code", required:true, value: valueFields.accessCode, condition:'[0-9]+'},
        {id:"P1ToP2", label:"Commutation time: P1 -> P2", required:true, value: valueFields.P1ToP2, condition:(value)=>value>=0&&value<=3600, unit:"s"},
        {id:"P2ToP1", label:"Commutation time: P2 -> P1", required:true, value: valueFields.P2ToP1, condition:(value)=>value>=0&&value<=3600, unit:"s"},
        {id:"commCardType", label:"Communication card type", required:true, items:arrayUnitCommCardType, value: valueFields.commCardType},
    ];

    return(
        <div className="grid grid-cols-2 grid-rows-3 gap-4">
            {
                arrayGeneralInfosConfRowFields.slice(0,1).map((field)=>
                    <FormActiveBox key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction}/>
                )
            }
            {
                arrayGeneralInfosConfRowFields.slice(1,2).map((field)=>
                    <FormText key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction}/>
                )
            }
            {
                arrayGeneralInfosConfRowFields.slice(2,4).map((field)=>
                    <FormShrink key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction}/>
                )
            }
            {
                arrayGeneralInfosConfRowFields.slice(-1).map((field)=>
                    <FormSelect key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction}/>
                )
            }
        </div>
    );
};

// this component represent all of the initials parameters of the fields in the general infos RS485 box section
export function GeneralInfosInitialsRS485({valueFields, handleChangeFunction, readOnly}) {
    const arrayUnitParity = [
        {value: 0, label: 'none'},
        {value: 1, label: 'odd'},
        {value: 2, label: 'even'},
        {value: 3, label: 'special'},
    ];
    const arrayUnitSpeed = [
        {value: 19200, label: '19200'},
        {value: 38400, label: '38400'},
    ];

    // this array contain all of the fields data like required, the id, his value as a object
// the id is really important it represent the path to access the data in the object from the db, each new property or index array is separated with a "."
    let arrayGeneralInfosRS485RowFields = [
        {id:"parity", label:"Parity", required:true, items:arrayUnitParity, value: valueFields.parity},
        {id:"speed", label:"Speed (Bauds)", required:true, items:arrayUnitSpeed, value: valueFields.speed},
    ];

    return(
        <div className="grid grid-cols-2 grid-rows-1 gap-4">
            {
                arrayGeneralInfosRS485RowFields.map((field)=>
                    <FormSelect key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction}/>
                )
            }
        </div>
    );
};

// this component represent all of the initials parameters of the fields in the general infos Ethernet RJ45 box section
export function GeneralInfosInitialsEthernetRJ45({valueFields, handleChangeFunction, readOnly}) {

    // this array contain all of the fields data like required, the id, his value as a object
// the id is really important it represent the path to access the data in the object from the db, each new property or index array is separated with a "."
    let arrayGeneralInfosRJ45RowFields = [
        {id:"ipAddress", label:"IP address", required:true, value: valueFields.ipAddress, condition:'^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$'},
        {id:"netmask", label:"Netmask", required:true, value: valueFields.netmask, condition:'^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$'},
        {id:"gateWay", label:"Gateway", required:true, value: valueFields.gateWay, condition:'^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$'},
    ];

    return (
        <div className="grid grid-cols-3 grid-rows-1 gap-4">
            {
                arrayGeneralInfosRJ45RowFields.map((field)=>
                    <FormText key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction}/>
                )
            }
        </div>
    );
};