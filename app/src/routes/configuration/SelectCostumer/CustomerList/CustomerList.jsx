import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import FilterSection from "../../../../components/utils/filter/FilterSection.jsx";
import { SelectCustomerFilterData } from "../../../../components/utils/initialValues/filter/FilterInitialValues.js";
import TableDisplay from "../../../../components/utils/table/TableDisplay/TableDisplay.jsx";
import CustomerRowsActions from "./customerAction/CustomerRowActions.jsx";
import CustomerHeaderActions from "./customerAction/CustomerHeader/CustomerHeaderActions.jsx";
import { multiplesFilterCallback } from "../../../../../utils/functions-utils.js";

// this component display in a table the list of customers items
export default function CustomerList({customerList, loading, userProfile}) {
    const [customerFilterValues, setCustomerFilterValues] = useState(SelectCustomerFilterData.map((filter)=>{return {...filter}}));
    
    const handleCustomerFilterChange = (id, prop, value) => { // this function handle the change from the inputs to update the filtering of the accounts
        const nextFilterValues = customerFilterValues.map((filter)=> {
            if (filter.id === id) { // if the id of the filter is the same id from the parameter
                filter[prop] = value; // we changed the specified prop of the object to the specified value
            }
            return filter;
        });
        // we update the value hook with the new value
        setCustomerFilterValues(nextFilterValues);
    };

    return (
        <div className="flex flex-col justify-start items-center mt-8 w-[70%] h-full ">
            <FilterSection filterInfos={customerFilterValues} hookUpdater={handleCustomerFilterChange}/>

            {
                loading ? 
                <div className="w-full h-full flex flex-row justify-center items-center">
                    <CircularProgress />
                </div> : 
                <TableDisplay 
                    rowsData={customerList.filter(customer => multiplesFilterCallback(customer, customerFilterValues))}
                    columnLabels={["name","code"]}
                    HeaderActionsElement={CustomerHeaderActions}
                    HeaderDisplayCondition={userProfile == "Configurator"}
                    RowsActionsElement={CustomerRowsActions}
                    emptyMessage={"No customers were found"}
                />
            }
        </div>
    );
}