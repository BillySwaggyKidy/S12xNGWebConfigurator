import renderPage from "./renderpage/renderPage.js";
import { serverRoutes, reactRouterRoutes } from "./routes.js";
import express from "express";
import multer from "multer";
import { envIsProduction } from "../envmode/envUtil.js";
const upload = multer({ dest: `build/${envIsProduction() ? 'prod' : 'dev'}/server/tmp` });
import routerLoginDB from "./request/authentification/routerLoginDB.js";
import routerEditUserInfo from "./request/authentification/routerEditUserInfo.js";
import routerGetAccounts from "./request/admin/routerGetAccounts.js";
import routerOperationsAccount from "./request/admin/routerOperationsAccount.js";
import routerAddNotification from "./request/notification/routerAddNotification.js";
import routerReadNotification from "./request/notification/routerReadNotification.js";
import routerDeleteOneNotification from "./request/notification/routerDeleteOneNotification.js";
import routerDeleteAllNotifications from "./request/notification/routerDeleteAllNotifications.js";
import routerGetAllNotifications from "./request/notification/routerGetAllNotifications.js";
import routerSendRequestToAdmin from "./request/notification/routerSendRequestToAdmin.js";
import routerOperationsConfiguration from "./request/configuration/routerOperationsConfiguration.js";
import routerOperationsCustomer from "./request/customer/routerOperationsCustomer.js";
import routerGetAllCustomers from "./request/customer/routerGetAllCustomers.js";
import routerGetAllConfigurationsFromCustomer from "./request/configuration/routerGetAllConfigurationsFromCustomer.js";
import routerOpenOneConfiguration from "./request/configuration/routerOpenOneConfiguration.js";
import routerCloseOneConfiguration from "./request/configuration/routerCloseOneConfiguration.js";
import routerSaveChangesToOneConfiguration from "./request/configuration/routerSaveChangesToOneconfiguration.js";
import routerCommitOfficialConfiguration from "./request/officialData/routerCommitOfficialConfiguration.js";
import routerImportConfigurationFiles from "./request/officialData/routerImportConfigurationFiles.js";
import routerGetAllOfficialVersionsFromConfiguration from "./request/officialData/routerGetAllOfficialVersionsFromConfiguration.js";
import routerExportVersionsOfConfiguration from "./request/officialData/routerExportVersionsOfConfiguration.js";

const router = express.Router();

// Put all your server routes in here

// When the user connect to the root of the server we send the page
router.get(serverRoutes.root, renderPage);

// when this user want to login into his account, we ask for the routerLoginDB to handle it
router.post(serverRoutes.login, routerLoginDB);

// when this user want to refresh his account's informations
router.post(serverRoutes.editUserInfo, routerEditUserInfo);

// when the admin need the list of all accounts
router.post(serverRoutes.getAccounts, routerGetAccounts);

// when the user want to handling an account document in the database
router.post(serverRoutes.operationsAccount, routerOperationsAccount)

// when the user want to send a request to the admin
router.post(serverRoutes.sendRequestToAdmin, routerSendRequestToAdmin);

// when the system want to add a notification linked to a user
router.post(serverRoutes.addNotification, routerAddNotification);

// when the user has readed a notification
router.post(serverRoutes.readNotification, routerReadNotification);

// when the user want to remove a notification
router.post(serverRoutes.deleteOneNotification, routerDeleteOneNotification);

// when the user want to remove all of his notifications
router.post(serverRoutes.deleteAllNotifications, routerDeleteAllNotifications);

// when the user is connected and need all of his notifications
router.post(serverRoutes.getAllNotifications, routerGetAllNotifications);

// when the user want to handling a customer document from the database
router.post(serverRoutes.operationsCustomer, routerOperationsCustomer);

// when the user want to handling a configuration document from the database
router.post(serverRoutes.operationsConfiguration, routerOperationsConfiguration);

// when the user need the list of all the customers from the database
router.post(serverRoutes.getAllCustomers, routerGetAllCustomers);

// when the user need the list of all the configurations from one customer
router.post(serverRoutes.getAllConfigurationsFromCustomer, routerGetAllConfigurationsFromCustomer);

// when the user need to enter a selected configuration
router.post(serverRoutes.openOneConfiguration, routerOpenOneConfiguration);

// when the user need to exit a selected configuration
router.post(serverRoutes.closeOneConfiguration, routerCloseOneConfiguration);

// when the user want to save changes into a configuration he is editing
router.post(serverRoutes.saveChangesToOneConfiguration, routerSaveChangesToOneConfiguration);

// when the user want to commit a new official configuration commit
router.post(serverRoutes.commitOfficialConfiguration, routerCommitOfficialConfiguration);

// when the user want to import new configurations to the server
router.post(serverRoutes.importConfigurationFiles, upload.any() , routerImportConfigurationFiles);

// when the user want to get all the officialDatas of a given configuration to the server before selecting and downloading them
router.post(serverRoutes.getAllOfficialVersionsFromConfiguration, routerGetAllOfficialVersionsFromConfiguration);

// when the user want to export some versions of a configuration from the server
router.post(serverRoutes.exportVersionsOfConfiguration, routerExportVersionsOfConfiguration);

// For all the routes that only react-router need to use, if we refresh on a nested route of the react-router from the client side then we redirect it to the root route "/"
router.get(reactRouterRoutes,(req,res) => {
  res.redirect("/");
});

router.get("*", (req,res) =>{
    res.status(404).send('page not found');
}); //For all other type of request excluding the one specified here, we send back a 404 page;

module.exports = router;