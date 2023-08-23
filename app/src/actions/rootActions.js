// this file is used to export all the differents actions for the reducers
import login from "./authentification/loginData.js";
import signup from "./authentification/signupData.js"
import editUserInfo from "./authentification/editUserInfo.js";
import getAccounts from "./admin/getAccounts.js";
import operationsAccount from "./admin/operationsAccount.js";
import getAllNotifications from "./notification/getAllNotifications.js";
import addNotification from "./notification/addNotification.js";
import sendRequestToAdmin from "./notification/sendRequestToAdmin.js";
import readNotification from "./notification/readNotification.js";
import deleteOneNotification from "./notification/deleteOneNotification.js";
import deleteAllNotifications from "./notification/deleteAllNotifications.js";
import operationsCustomer from "./configuration/operationsCustomer.js";
import operationsConfiguration from "./configuration/operationsConfiguration.js";
import getAllCustomers from "./configuration/getAllCustomers.js";
import getAllConfigurationsFromCustomer from "./configuration/getAllConfigurationsFromCustomer.js";
import openOneConfiguration from "./configuration/openOneConfiguration.js";
import closeOneConfiguration from "./configuration/closeOneConfiguration.js";
import saveChangesToOneConfiguration from "./configuration/saveChangesToOneConfiguration.js";
import commitOfficialConfiguration from "./configuration/commitOfficialConfiguration.js";
import importConfigurationFiles from "./configuration/importConfigurationFiles.js";

export {
    login,
    signup,
    editUserInfo,
    getAccounts,
    operationsAccount,
    getAllNotifications,
    addNotification,
    readNotification,
    deleteOneNotification,
    deleteAllNotifications,
    sendRequestToAdmin,
    operationsCustomer,
    operationsConfiguration,
    getAllCustomers,
    getAllConfigurationsFromCustomer,
    openOneConfiguration,
    closeOneConfiguration,
    saveChangesToOneConfiguration,
    commitOfficialConfiguration,
    importConfigurationFiles
};