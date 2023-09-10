
import FormSelect from "../../../Inputs/FormSelect.jsx";

// this component represent all of the initials parameters of the fields in the general relays box section
export function GeneralRelaysInitials({valueFields, handleChangeFunction, readOnly}) {

    const arrayUnitRelay = [
        {value:0,label:"not activated"},
        {value:1,label:"normally excited"},
        {value:2,label:"normally de-excited"},
    ];

    // this array contain all of the fields data like required, the id, his value as a object
    // the id is really important it represent the path to access the data in the object from the db, each new property or index array is separated with a "."
    let arrayGeneralRelaysInitialsFields = [
        {id:"relay1", label:"Relay 1", required:true, items:arrayUnitRelay, value: valueFields.relay1},
        {id:"relay2", label:"Relay 2", required:true, items:arrayUnitRelay, value: valueFields.relay2},
        {id:"relay3", label:"Relay 3", required:true, items:arrayUnitRelay, value: valueFields.relay3},
        {id:"relay4", label:"Relay 4", required:true, items:arrayUnitRelay, value: valueFields.relay4},
        {id:"relay5", label:"Relay 5", required:true, items:arrayUnitRelay, value: valueFields.relay5},
        {id:"relay6", label:"Relay 6", required:true, items:arrayUnitRelay, value: valueFields.relay6},
        {id:"relayKlaxon", label:"Relay klaxon", required:true, items:arrayUnitRelay, value: valueFields.relayKlaxon},
    ];

    return (
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
            {
                arrayGeneralRelaysInitialsFields.map((field)=>
                    <FormSelect key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction}/>
                )
            }
        </div>
    );
};

// this component represent all of the initials parameters of the fields in the general relays group box section
export function GeneralRelaysInitialsGroup({valueFields, handleChangeFunction, readOnly}) {

    const arrayUnitMode = [
        {value:1,label:"steady"},
        {value:2,label:"pulse"},
    ];

    const arrayUnitGroup = [
        {value:0,label: "none"},
        {value:1,label:"relay 1"},
        {value:2,label:"relay 2"},
        {value:3,label:"relay 3"},
        {value:4,label:"relay 4"},
        {value:5,label:"relay 5"},
        {value:6,label:"relay 6"},
    ];

    // this array contain all of the fields data like required, the id, his value as a object
    // the id is really important it represent the path to access the data in the object from the db, each new property or index array is separated with a "."
    let arrayGeneralRelaysInitialsGroupFields = [
        {id:"groupMode", label:"Group mode", required:true, items:arrayUnitMode, value: valueFields.groupMode},
        {id:"klaxonMode", label:"Klaxon mode", required:true, items:arrayUnitMode, value: valueFields.klaxonMode},
        {id:"groupFault", label:"Group fault", required:true, items:arrayUnitGroup, value: valueFields.groupFault},
        {id:"groupInsulationFault", label:"Group insulation fault", items:arrayUnitGroup, required:true, value: valueFields.groupInsulationFault},
    ];

    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
            {
                arrayGeneralRelaysInitialsGroupFields.map((field)=>
                    <FormSelect key={field.id} {...field} readOnly={readOnly} onChange={handleChangeFunction}/>
                )
            }
        </div>
    );
};