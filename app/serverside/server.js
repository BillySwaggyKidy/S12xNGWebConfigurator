import express from 'express';
import path from 'path';
import cors from 'cors';
import {envIsProduction, envIsDevelopment} from './envmode/envUtil.js';
import { enableHMR } from './reload/hotReload.js';
import { serverUrl } from './routers/routes.js';
import { disconnectMongoDB } from "./routers/services/url/urlDB.js"; // we call mongooseConnect var to connect only once into the mongoDB database
const PORT = process.env.PORT || 8080;

let server = express();

// if we have set the environnent on production then:
if (envIsProduction()) {
    console.log(" _______________________________________ ");
    console.log("|                                       |");
    console.log("|             ( PRODUCTION )            |");
    console.log("|_______________________________________|");
    console.log(" ");

    server.use(express.static(path.join(__dirname,'../client'))); // we serve static file like the bundle-app.js to the browser from the current directory where the server is executed and we move to the top root to access the file
}
else if (envIsDevelopment()) {
    console.log(" _______________________________________ ");
    console.log("|                                       |");
    console.log("|             ( DEVELOPMENT )           |");
    console.log("|_______________________________________|");
    console.log(" ");

    enableHMR(server); // we enable the Hot MPodule Reload on the frontend and the backend
}

server.use(cors());
server.use(express.urlencoded({extended:false}));
server.use(express.json());

//Hot reload!
//ALL server routes are in this module!
server.use((req, res, next) => {
    require("./routers/routers")(req, res, next);
});

// the server listen on the port set by node on localhost.
server.listen(PORT, () => {
    console.log(
        `Server listening on \x1b[42m\x1b[1m${serverUrl()}\x1b[0m in \x1b[41m${process.env.NODE_ENV}\x1b[0m`,
    );
});

// when when we shut down the app we execute a callback function before closing the server
process.on('exit', function() {
    disconnectMongoDB();
});