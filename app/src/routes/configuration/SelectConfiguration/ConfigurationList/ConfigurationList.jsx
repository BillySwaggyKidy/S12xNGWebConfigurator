import React, {useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import FilterSection from "../../../../components/utils/filter/FilterSection.jsx";
import { SelectConfigurationFilterData } from "../../../../components/utils/FilterInitialValues.js";
import { multiplesFilterCallback } from "../../../../../utils/functions-utils.js";
import TableDisplay from "../../../../components/utils/table/TableDisplay/TableDisplay.jsx";
import ConfigurationHeaderActions from "./configurationAction/ConfigurationHeader/ConfigurationHeaderAction.jsx";
import ConfigurationRowActions from "./configurationAction/ConfigurationRow/ConfigurationRowActions.jsx";

// this component display in a table the list of configurations items
export default function ConfigurationList({configurationList, loading, userProfile}) {
    const [configurationFilterValues, setConfigurationFilterValues] = useState(SelectConfigurationFilterData.map((filter)=>{return {...filter}}));

    const handleConfigurationFilterChange = (id, prop, value) => { // this function handle the change from the inputs to update the filtering of the accounts
        const nextFilterValues = configurationFilterValues.map((filter)=> {
            if (filter.id === id) { // if the id of the filter is the same id from the parameter
                filter[prop] = value; // we changed the specified prop of the object to the specified value
            }
            return filter;
        });
        // we update the value hook with the new value
        setConfigurationFilterValues(nextFilterValues);
    };


    return (
        <div className="flex flex-col justify-start items-center8 w-[70%] h-full ">
            <FilterSection filterInfos={configurationFilterValues} hookUpdater={handleConfigurationFilterChange}/>
            {
                loading ? 
                <div className="w-full h-full flex flex-row justify-center items-center">
                    <CircularProgress />
                </div> : 
                <TableDisplay 
                    rowsData={configurationList.filter(config => multiplesFilterCallback(config, configurationFilterValues))}
                    columnLabels={["name","version","createdAt"]}
                    HeaderActionsElement={ConfigurationHeaderActions}
                    HeaderDisplayCondition={userProfile == "Configurator"}
                    RowsActionsElement={ConfigurationRowActions} 
                    emptyMessage={"No configuration were found"}
                />
            }
        </div>
    );
}