import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',   
        },   
        secondary: {
            main: '#19857b',   
        },
        error: {   
            main: red.A400,   
        },  
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                  // this is styles for the new variants of a field in a table
                  "&.tableField": {
                    "& .MuiSelect-select": {
                        padding: `2px 14px 2px 14px;`,
                        margin: "0"
                    },
                    "& input": {
                        padding: `2px 14px 2px 14px;`,
                        margin: "0",
                        width: "fit-content"
                      },
                    },
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
              root: {
                "&.Mui-disabled": {
                    opacity: 1
                }
              }
            }
        }
    }
});
export default theme;