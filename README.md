# S12x NG Web Configurator

Web application for S12xNG product configuration

## About

### Technologies

* React
* React-router
* Redux
* Javascript
* Webpack
* Jest
* Tailwind
* Material-ui
* Express
* Mongoose

### Features

* Universal / Isomorphic rendering
* Hot Module Replacement support for the frontend and the backend
* Babel
* ES6 client and server side

## Getting Started

**1.** First, you need to have a MongoDB cluster available for the App's database. You don't need to add manually the collections, mongoose will create them for you

**2.**  Make sure you have a fresh version of Node.js and NPM installed. The current Long Term Support (LTS) release is an ideal starting point: https://nodejs.org/en

**3.**  Clone this repository to your computer:
```
git clone http://sdevhelp/R-D/products/serie-S/s12x-ng-web-configurator.git
```

**4.** From the project's root directory, install the required packages (dependencies):
```
npm install
```

**5.1** Go to the <ins>urlDB.js</ins> file and change the mongodb property of the urlObject with your mongodb url

**5.2** Go to the <ins>routes.js</ins> file in the serverUrl function and change the second IP address and port with yours (use the **ipconfig** command)

---

**6.1.** To start the application in development mode type the following commands:
```
npm run build:univ:dev
npm run start:univ:dev
```

**6.2.** To start the application in production mode type the following commands:
```
npm run build:univ:prod
npm run start:univ:prod
```

## More

You can find more in the package.json file, you will find in the **script** section the following scripts:
* `build:univ:dev`: build the project for the development
* `build:univ:prod`: build the project for the production
* `build:univ:all`: build the project for the development and for the production
* `start:univ:dev`: start the app in develpment mode
* `start:univ:prod`: start the app in production mode
* `test:dev`: start all of the unit tests
* `test:dev:watch`: start all of the unit tests in watch mode (restart the tests on change)
