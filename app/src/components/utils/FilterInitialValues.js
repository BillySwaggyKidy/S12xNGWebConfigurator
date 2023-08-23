// When creating a new Filter Data array, the first attribut must be designed for a textfield
// you don't need to add the handleChange function

export const ManageAccountsFilterData = [
    {
        id: "ManageAccounts_username",
        type: "Text",
        label: "Search username",
        value: "",
        condition(a, b) {return a.toLowerCase().includes(b.toLowerCase())},
        ref: "username"
    },
    {
        id: "ManageAccounts_profile",
        added: false,
        type: "Select",
        label: "Profile",
        value: "",
        condition(a, b) {return b == "" || a == b},
        ref: "profile",
        items: [
            {
                label: "-- --",
                value: ""
            },
            {
                label: "Viewer",
                value: "Viewer"
            },
            {
                label: "Configurator",
                value: "Configurator"
            },
        ]
    }
];

export const SelectCustomerFilterData = [
    {
        id: "SelectCustomer_name",
        type: "Text",
        label: "Search customer name",
        value: "",
        condition(a, b) {return a.toLowerCase().includes(b.toLowerCase())},
        ref: "name"
    },
    {
        id: "SelectCustomer_code",
        type: "Text",
        label: "Search customer code",
        value: "",
        condition(a, b) {return a.toLowerCase().includes(b.toLowerCase())},
        ref: "code"
    },
];

export const SelectConfigurationFilterData = [
    {
        id: "SelectConfiguration_name",
        type: "Text",
        label: "Search configuration name",
        value: "",
        condition(a, b) {return a.toLowerCase().includes(b.toLowerCase())},
        ref: "name"
    },
    {
        id: "SelectConfiguration_version",
        type: "Shrink",
        label: "Config version",
        value: "",
        condition(a, b) {return a >= b},
        ref: "version"
    },
    {
        id: "SelectConfiguration_affairNumber",
        type: "Text",
        label: "Affair number",
        value: "",
        condition(a, b) {return a.toLowerCase().includes(b.toLowerCase())},
        ref: "affairNumber"
    },
    {
        id: "SelectConfiguration_deviceType",
        type: "Text",
        label: "Device type",
        value: "",
        condition(a, b) {return a.toLowerCase().includes(b.toLowerCase())},
        ref: "deviceType"
    },
    {
        id: "SelectConfiguration_firmwareVersion",
        type: "Text",
        label: "Firmware version",
        value: "",
        condition(a, b) {return a.toLowerCase().includes(b.toLowerCase())},
        ref: "firmwareVersion"
    },
    {
        id: "SelectConfiguration_ofNumber",
        type: "Text",
        label: "OF number",
        value: "",
        condition(a, b) {return a.toLowerCase().includes(b.toLowerCase())},
        ref: "ofNumber"
    },
    {
        id: "SelectConfiguration_suffixCode",
        type: "Text",
        label: "Suffix code",
        value: "",
        condition(a, b) {return a.toLowerCase().includes(b.toLowerCase())},
        ref: "suffixCode"
    },
];
