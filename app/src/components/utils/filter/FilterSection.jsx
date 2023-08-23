import React, {useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FilterListIcon from '@mui/icons-material/FilterList';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AdditionalFilter from "./additionalFilter/AdditionalFilter.jsx";

// this component represent a filter section that can be reuse on other part of the app
export default function FilterSection({filterInfos, hookUpdater}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [searchInfo, setSearchInfo] = useState(filterInfos[0]);

    const handleOpen = (event) => { // open the menu for additional items
        // if there is at least one filter available (that asn't been added yet) then we can open the menu
        if (filterInfos.slice(1).filter(filter => !filter.added).length > 0) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => { // close the additional filters menus
        setAnchorEl(null);
    };

    // this function add a new filter on the list of filter from the state hook of the parent
    const addFilterItem = (id, prop) => {
        // we update the parent hook which is the list of active filters
        hookUpdater(id, prop, true); // here we change the "added" property of a filter on the list to specify that this filter is now use to sort the items
        if (filterInfos.slice(1).filter(filter => !filter.added).length == 0) { // if there is no filter that didn't been added left then we close the menu
            handleClose();
        }
    };

    // this function handle all change from the search bar
    const handleSearchChange = (event) => {
        const newValue = event.target.value;
        setSearchInfo({...searchInfo, "value": newValue});
        hookUpdater(searchInfo.id, "value", newValue);
    };

    return (
        <div className="flex flex-col justify-around items-center w-full mt-5">
            <div className="flex flex-row justify-between items-center w-full">
                <TextField className="bg-white w-4/6" label={searchInfo.label} variant="filled" InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }} value={searchInfo.value} onChange={handleSearchChange}/>
                <div>
                    <Button
                        id="filter-button"
                        className='bg-white hover:bg-white text-blue-500'
                        variant="contained"
                        startIcon={<FilterListIcon/>}
                        aria-controls={open ? 'filter-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleOpen}
                    >
                        Add filter
                    </Button>
                    <Menu
                        id="filter-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            // we only display the filter the list of filter that wasn't added to the additional filters list by the user
                            filterInfos.slice(1).filter(filter => !filter.added).map((filterMenu, index) =>
                                <MenuItem key={index} onClick={()=>addFilterItem(filterMenu.id, "added")}>{filterMenu.label}</MenuItem>
                            )
                        }
                    </Menu>
                </div>
            </div>
            <div className="flex flex-row justify-start overflow-x-auto snap-x w-full bg-gray-300 rounded">
                {
                    // we only display the list of additional filter added by the user
                    filterInfos.slice(1).filter(filter => filter.added).map(filterMenu =>
                        <AdditionalFilter key={filterMenu.id} infos={filterMenu} hookUpdater={hookUpdater}/>
                    )
                }
            </div>
        </div>
    );
}