import React, {useEffect} from "react";
import { useSelector } from 'react-redux';
import {Routes, Route, useNavigate} from "react-router-dom";
import GeneralInformations from "./general/informations/GeneralInformations.jsx";
import GeneralRelays from "./general/relays/GeneralRelays.jsx";
import GeneralCardsAndCompensations from "./general/cardsAndCompensations/GeneralCardsAndCompensations.jsx";
import ChannelsInformations from "./channels/informations/ChannelsInformations.jsx";
import ChannelsThresholds from "./channels/thresholds/ChannelsThresholds.jsx";
import ChannelsCalibrations from "./channels/calibrations/ChannelsCalibrations.jsx";
import ChannelsMaScales from "./channels/maScales/ChannelsMaScales.jsx";
import OthersAverages from "./others/averages/OthersAverages.jsx";
import OthersDeviations from "./others/deviations/OthersDeviations.jsx";
import OthersGradients from "./others/gradients/OthersGradients.jsx";

// this component is the nested page for handling a customer's configuration
export default function HandleConfiguration() {
    const { online } = useSelector((state) => state.authentification); // we get the online and userInfo var from the authentification reducer
    const { configurationData, snapshotData, handleMode } = useSelector((state) => state.configuration); // we get the userList var from the account reducer
    const navigate = useNavigate(); // useNavigate is a React Router Hooks to navigate programmatically trougth route

    useEffect(() => {
        // redirect user to the main page if is not logged or not an admin
        if (!online || !configurationData || !snapshotData || !handleMode) {
            navigate("/");
        }
    }, []);

    return(
        <div className="w-full h-full flex flex-col justify-center items-center bg-teal-100">
            <Routes>
                <Route path="general">
                    <Route path="informations" element={<GeneralInformations/>}/>
                    <Route path="relays" element={<GeneralRelays/>}/>
                    <Route path="cards&Compensations" element={<GeneralCardsAndCompensations/>}/>
                </Route>
                <Route path="channels">
                    <Route path="informations" element={<ChannelsInformations/>}/>
                    <Route path="thresholds" element={<ChannelsThresholds/>}/>
                    <Route path="calibrations" element={<ChannelsCalibrations/>}/>
                    <Route path="ma_scales" element={<ChannelsMaScales/>}/>
                </Route>
                <Route path="others">
                    <Route path="averages" element={<OthersAverages/>}/>
                    <Route path="deviations" element={<OthersDeviations/>}/>
                    <Route path="gradients" element={<OthersGradients/>}/>
                </Route>
            </Routes>
        </div>
    );
};