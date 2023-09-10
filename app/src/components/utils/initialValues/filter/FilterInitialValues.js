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
        added: false,
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
        added: false,
        type: "Shrink",
        label: "Config version",
        value: "",
        condition(a, b) {return a >= b},
        ref: "version"
    },
    {
        id: "SelectConfiguration_affairNumber",
        added: false,
        type: "Text",
        label: "Affair number",
        value: "",
        condition(a, b) {return a.toLowerCase().includes(b.toLowerCase())},
        ref: "affairNumber"
    },
    {
        id: "SelectConfiguration_deviceType",
        added: false,
        type: "Select",
        label: "Device type",
        value: "",
        condition(a, b) {return b == "" || a == b},
        ref: "deviceType",
        items: [
            {
                label: "-- --",
                value: ""
            },
            {
                label: "S128",
                value: 128
            },
            {
                label: "S129",
                value: 129
            },
        ]
    },
    {
        id: "SelectConfiguration_firmwareVersion",
        added: false,
        type: "Text",
        label: "Firmware version",
        value: "",
        condition(a, b) {return a.toLowerCase().includes(b.toLowerCase())},
        ref: "firmwareVersion"
    },
    {
        id: "SelectConfiguration_ofNumber",
        added: false,
        type: "Text",
        label: "OF number",
        value: "",
        condition(a, b) {return a.toLowerCase().includes(b.toLowerCase())},
        ref: "ofNumber"
    },
    {
        id: "SelectConfiguration_suffixCode",
        added: false,
        type: "Text",
        label: "Suffix code",
        value: "",
        condition(a, b) {return a.toLowerCase().includes(b.toLowerCase())},
        ref: "suffixCode"
    },
];
