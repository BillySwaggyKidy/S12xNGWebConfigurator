import FormActiveBox from '../../Inputs/FormActiveBox.jsx';
import FormSelect from '../../Inputs/FormSelect.jsx';
import FormShrink from '../../Inputs/FormShrink.jsx';

// this component represent all of the initials parameters of the fields in a row in the gradients card channels table
export function OthersGradientsInitialsCardChannels({valueFields, handleChangeFunction, readOnly}) {
    const arrayActive = [
        {value: 0, label: 'inactive'},
        {value: 1, label: 'active'},
    ];

    const arrayChannelActive = [
        {value: 0, label: '0'},
        {value: 1, label: '1'},
    ];

    // this array contain all of the fields data like required, the id, his value as a object
    // the id is really important it represent the path to access the data in the object from the db, each new property or index array is separated with a "."
    let arrayOthersGradientsInitialsCardChannelsRowFields = [
        {id:"isActive", required:true, toggleItems:arrayActive, value:valueFields.isActive, width:85},
        {id:"decimal", required:true, value: valueFields.decimal, condition:(value)=>value>=0, width:90},
        {id:"cardChannelsActivation.0", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[0]},
        {id:"cardChannelsActivation.1", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[1]},
        {id:"cardChannelsActivation.2", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[2]},
        {id:"cardChannelsActivation.3", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[3]},
        {id:"cardChannelsActivation.4", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[4]},
        {id:"cardChannelsActivation.5", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[5]},
        {id:"cardChannelsActivation.6", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[6]},
        {id:"cardChannelsActivation.7", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[7]},
        {id:"cardChannelsActivation.8", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[8]},
        {id:"cardChannelsActivation.9", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[9]},
        {id:"cardChannelsActivation.10", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[10]},
        {id:"cardChannelsActivation.11", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[11]},
        {id:"cardChannelsActivation.12", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[12]},
        {id:"cardChannelsActivation.13", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[13]},
        {id:"cardChannelsActivation.14", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[14]},
        {id:"cardChannelsActivation.15", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[15]},
        {id:"cardChannelsActivation.16", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[16]},
        {id:"cardChannelsActivation.17", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[17]},
        {id:"cardChannelsActivation.18", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[18]},
        {id:"cardChannelsActivation.19", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[19]},
        {id:"cardChannelsActivation.20", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[20]},
        {id:"cardChannelsActivation.21", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[21]},
        {id:"cardChannelsActivation.22", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[22]},
        {id:"cardChannelsActivation.23", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[23]},
        {id:"cardChannelsActivation.24", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[24]},
        {id:"cardChannelsActivation.25", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[25]},
        {id:"cardChannelsActivation.26", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[26]},
        {id:"cardChannelsActivation.27", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[27]},
        {id:"cardChannelsActivation.28", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[28]},
        {id:"cardChannelsActivation.29", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[29]},
        {id:"cardChannelsActivation.30", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[30]},
        {id:"cardChannelsActivation.31", required:true, toggleItems:arrayChannelActive, value: valueFields.cardChannelsActivation[31]},
    ];

    return [
        arrayOthersGradientsInitialsCardChannelsRowFields.slice(0,1).map((field)=>
            <FormActiveBox key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
        ),
        arrayOthersGradientsInitialsCardChannelsRowFields.slice(1,2).map((field)=>
            <FormShrink key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
        ),
        arrayOthersGradientsInitialsCardChannelsRowFields.slice(2).map((field)=>
            <FormActiveBox key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
        ),
    ].flat();
    
};

// this component represent all of the initials parameters of the fields in a row in the gradients P1P2 table
export function OthersGradientsInitialsP1P2({valueFields, handleChangeFunction, readOnly}) {
    const arrayUnitType = [
        {value:0,label:"NU"},
        {value:1,label:"H"},
        {value:2,label:"L"},
    ];

    const arrayUnitinhGrp = [
        {value: 0,label: 'none'},
        {value: 1,label: 'inh 1'},
        {value: 2,label: 'inh 2'},
        {value: 3,label: 'inh 3'},
        {value: 4,label: 'inh 4'},
    ];

    // this array contain all of the fields data like required, the id, his value as a object
    // the id is really important it represent the path to access the data in the object from the db, each new property or index array is separated with a "."
    let arrayOthersGradientsInitialsP1P2RowFields = [
        {id:"p1Parameters.type", required:true, items:arrayUnitType, value:valueFields?.p1Parameters.type, width:85},
        {id:"p1Parameters.value", required:true, value: valueFields?.p1Parameters.value, condition:(value)=>value>=0&&value<=3600, width:90},
        {id:"p1Parameters.time", required:true, value: valueFields?.p1Parameters.time, condition:(value)=>value>=-Number.MAX_VALUE, width:90},
        {id:"p1Parameters.inhGrp", required:true, items:arrayUnitinhGrp, value: valueFields?.p1Parameters.inhGrp, width:100},
        {id:"p1Parameters.relayGrp", required:true, value: valueFields?.p1Parameters.relayGrp, condition:(value)=>value>=0&&value<=6, width:90},
        {id:"p2Parameters.type", required:true, items:arrayUnitType, value:valueFields?.p2Parameters.type, width:85},
        {id:"p2Parameters.value", required:true, value: valueFields?.p2Parameters.value, condition:(value)=>value>=0&&value<=3600, width:90},
        {id:"p2Parameters.time", required:true, value: valueFields?.p2Parameters.time, condition:(value)=>value>=-Number.MAX_VALUE, width:90},
        {id:"p2Parameters.inhGrp", required:true, items:arrayUnitinhGrp, value: valueFields?.p2Parameters.inhGrp, width:100},
        {id:"p2Parameters.relayGrp", required:true, value: valueFields?.p2Parameters.relayGrp, condition:(value)=>value>=0&&value<=6, width:90},
    ];

    return Array(2).fill(null).map((value, index)=>{
        const arrayGradients = arrayOthersGradientsInitialsP1P2RowFields.slice(5*index,5*(index+1));
        return [
            arrayGradients.slice(0,1).map((field)=>
                <FormSelect key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
            ),
            arrayGradients.slice(1,3).map((field)=>
                <FormShrink key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
            ),
            arrayGradients.slice(3,4).map((field)=>
                <FormSelect key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
            ),
            arrayGradients.slice(4).map((field)=>
                <FormShrink key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction} variant="table"/>
            ),
        ].flat();
    }).flat();
};