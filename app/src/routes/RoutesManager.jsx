import {Routes, Route, useLocation, Outlet} from "react-router-dom";
import Home from '../components/Home.jsx';
import Login from './login/Login.jsx';
import ManageAccounts from "./admin/manageAccounts/ManageAccounts.jsx";
import ForgePwd from "./forgetPwd/ForgetPwd.jsx";
import AccountInfo from "./accountInfo/AccountInfo.jsx";
import MainInformation from "./accountInfo/mainSection/mainInformation/MainInformation.jsx";
import MainPassword from "./accountInfo/mainSection/mainPassword/MainPassword.jsx";
import SelectCustomer from "./configuration/SelectCostumer/SelectCustomer.jsx";
import SelectConfiguration from "./configuration/SelectConfiguration/SelectConfiguration.jsx";
import HandleConfiguration from "./configuration/HandleConfiguration/HandleConfiguration.jsx";

// This is the route Manager component, it list all of the reat-router routes in the app
export default function RoutesManager() {
    const location = useLocation();

    // this local component purpose is when used in a nested routes, will check if the url matches the actual path paramter to prevent recursive layout
    const NestedRouteWrapper = ({path, Element}) => {
        // if the url match the path then we display the Element component or else an Outlet component instead for the nest nested component
        return location.pathname.split("/").slice(-1)[0] == path ? Element : <Outlet/>;
    };

    return (
        <Routes>
            <Route path="/" element={<Home/>}>
                <Route path="customers" element={<NestedRouteWrapper path={"customers"} Element={<SelectCustomer/>}/>}>
                    <Route path=":customerId">
                        <Route path="configurations" element={<NestedRouteWrapper path={"configurations"} Element={<SelectConfiguration/>}/>}>
                            <Route path=":configurationId">
                                <Route path="handle/*" element={<HandleConfiguration/>}/>
                            </Route>
                        </Route>
                    </Route>
                </Route>
                <Route path="manage-accounts" element={<ManageAccounts/>}/>
            </Route>
            <Route path="/login" element={<Login/>}/>
            <Route path="/forget-password" element={<ForgePwd/>}/>
            <Route path="/profile" element={<AccountInfo/>}>
                <Route path="/profile/information" element={<MainInformation/>}/>
                <Route path="/profile/password" element={<MainPassword/>}/>
            </Route>
        </Routes>
    );
}