import { envIsDevelopment } from "../envmode/envUtil";

export const serverRoutes = { // this object is refferencing all the route that the server use to respond to the client.
    root: "/",
    login: "/authentification/login",
    editUserInfo: "/authentification/editUserInfo",
    getAccounts: "/admin/getAccounts",
    operationsAccount: '/admin/operationsAccount',
    addNotification: "/notification/addNotification",
    getAllNotifications: "/notification/getAllNotifications", 
    readNotification: "/notification/readNotification", 
    deleteOneNotification: "/notification/deleteOneNotification",
    deleteAllNotifications: "/notification/deleteAllNotifications",
    sendRequestToAdmin: "/notification/sendRequestToAdmin",
    addNewCustomer: "/configuration/addNewCustomer",
    removeOneCustomer: "/configuration/removeOneCustomer",
    operationsCustomer: "/configuration/operationsCustomer",
    removeOneConfiguration: "/configuration/removeOneConfiguration",
    addNewConfiguration: "/configuration/addNewConfiguration",
    operationsConfiguration: "/configuration/operationsConfiguration",
    getAllCustomers: "/configuration/getAllCustomers",
    getAllConfigurationsFromCustomer: "/configuration/getAllConfigurationsFromCustomer",
    openOneConfiguration: "/configuration/openOneConfiguration",
    closeOneConfiguration: "/configuration/closeOneConfiguration",
    saveChangesToOneConfiguration: "/configuration/saveChangesToOneConfiguration",
    commitOfficialConfiguration: "/configuration/commitOfficialConfiguration",
    importConfigurationFiles: "/configuration/importConfigurationFiles",
    getAllOfficialVersionsFromConfiguration: "/configuration/getAllOfficialVersionsFromConfiguration",
    exportVersionsOfConfiguration: "/configuration/exportVersionsOfConfiguration"


}

export const reactRouterRoutes = [
    '/login',
    '/manage-accounts',
    '/forget-password'
] // this array is referrencing all the routes that the client side react router use.

export const serverUrl = () => { // this function return the server url depending of the environnement
    return envIsDevelopment() ? "http://localhost:8080" : "http://192.168.1.25:3030";
};