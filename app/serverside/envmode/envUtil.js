const getEnvironment = () => { // get tthe environnement in which the programm is running
    return process.env.NODE_ENV;
};

const envIsProduction = () => { // verify if the environnement in which the app is running is on production
    return getEnvironment() === 'production';
};

const envIsDevelopment = () => { // verify if the environnement in which the app is running is on development
    return getEnvironment() === 'development';
};

const envPort = () => {
    return process.env.port;
};


export {
    getEnvironment,
    envIsProduction,
    envIsDevelopment,
    envPort
}