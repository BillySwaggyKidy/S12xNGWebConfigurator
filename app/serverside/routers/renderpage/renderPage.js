import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from "react-router-dom/server";
import path from "path";
import fs from 'fs';

import App from '../../../src/App.jsx';

export default function renderPage(req, res) { // This function is taking care for the initial request to load the page

    // We render the App component on the server
    const app = renderToString(
        <StaticRouter location={req.url}>
            <App/>
        </StaticRouter>
    );
    
    // we get the index.html file
    const indexFile = path.resolve(__dirname,'./index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        // if there was an error during the reading, we throw an error 500
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }
        // or else, we put the App content into the root div with an 200 status
        return res.status(200).send(
            data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        );
    });
}