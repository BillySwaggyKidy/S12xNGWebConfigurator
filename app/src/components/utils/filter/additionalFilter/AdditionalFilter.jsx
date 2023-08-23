import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FilterField from "../../field/FilterField/FilterField.jsx";

// this component represent a additional filter item on the list on the bottom of the search bar
export default function AdditionalFilter({infos, hookUpdater}) {
    
    // this function purpose is to remove this additional filter
    const removeFilterItem = () => {
        // we change the property added of this filter to false
        hookUpdater(infos.id, "added", false);
    };

    return (
        <div className="flex flex-row items-center w-48 my-2 mx-1">
            <IconButton onClick={removeFilterItem}>
                <HighlightOffIcon/>
            </IconButton>
            <FilterField type={infos.type} id={infos.id} value={infos.value} label={infos.label} items={infos.items} handleChange={hookUpdater}/>
        </div>
    );
}