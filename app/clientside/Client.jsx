// principal programme côté client, est capable de faire du rendue HTML, sera appelé une deuxième par le client.
import React from 'react';
import { createRoot } from 'react-dom/client'
import { envIsDevelopment } from '../serverside/envmode/envUtil';
import {BrowserRouter} from "react-router-dom";
import App from '../src/App.jsx';

if (envIsDevelopment()) // if the env is on developpement we import the css file
{
    require("./style.css");
    require('../src/components/home.css');
}

const root = createRoot(document.getElementById('root')); // we create the root with the "root" div
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
); // we render the App component to the root surrounded by Browser Router for the route


if (module.hot) {
    module.hot.accept();
}