import React, {useState} from "react";
import {ManageAccountsFilterData} from "../../../../components/utils/FilterInitialValues.js";
import FilterSection from "../../../../components/utils/filter/FilterSection.jsx";
import { multiplesFilterCallback } from "../../../../../utils/functions-utils.js";
import CircularProgress from '@mui/material/CircularProgress';
import TableDisplay from "../../../../components/utils/table/TableDisplay/TableDisplay.jsx";
import AccountsHeaderActions from "./accountsActions/accountsHeader/AccountsHeaderActions.jsx";
import AccountRowActions from "./accountsActions/accountsRow/AccountRowActions.jsx";

export default function AccountsList({accountList , loading}) {
    const [filterValues, setFilterValues] = useState(ManageAccountsFilterData.map((filter)=>{return {...filter}}));

    const handleFilterChange = (id, prop, value) => { // this function handle the change from the inputs to update the filtering of the accounts
        const nextFilterValues = filterValues.map((filter)=> {
            if (filter.id === id) { // if the id of the filter is the same id from the parameter
                filter[prop] = value; // we changed the specified prop of the object to the specified value
            }
            return filter;
        });
        // we update the value hook with the new value
        setFilterValues(nextFilterValues);
    };

    return(
        <div className="flex flex-col justify-start items-center mt-8 w-[70%] h-full ">
            <FilterSection filterInfos={filterValues} hookUpdater={handleFilterChange}/>
            {
                loading ? 
                // the request is loading than we display a circular progress 
                <div className="w-full h-full flex flex-row justify-center items-center">
                    <CircularProgress />
                </div> : 
                <TableDisplay 
                    rowsData={accountList.filter(user => multiplesFilterCallback(user, filterValues))}
                    columnLabels={["username","profile"]}
                    HeaderActionsElement={AccountsHeaderActions}
                    RowsActionsElement={AccountRowActions}
                    emptyMessage={"There is no accounts found"}
                />
            }
        </div>
    );
}